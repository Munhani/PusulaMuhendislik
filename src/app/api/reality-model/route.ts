import { NextRequest, NextResponse } from 'next/server';

const CLOUDINARY_RAW = 'res.cloudinary.com';
const MAX_BODY = 15 * 1024 * 1024; // 15 MB

function isAllowedUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && u.hostname === CLOUDINARY_RAW && u.pathname.includes('/raw/upload/');
  } catch {
    return false;
  }
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str, 'utf-8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function base64UrlDecode(str: string): string {
  const pad = str.length % 4;
  const base64 = (str + (pad ? '===='.slice(pad) : '')).replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(base64, 'base64').toString('utf-8');
}

/** index.html: fetch Cloudinary, inject <base> so script/worker/scene tümü proxy üzerinden gider (same-origin) */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url || !isAllowedUrl(url)) {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { 'Accept': 'text/html,application/xhtml+xml,*/*' },
      redirect: 'follow',
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Upstream error' }, { status: res.status });
    }

    const contentType = res.headers.get('content-type') || 'text/html; charset=utf-8';
    let body = await res.text();
    if (body.length > MAX_BODY) {
      return NextResponse.json({ error: 'Response too large' }, { status: 413 });
    }

    const cloudinaryBase = url.replace(/\/[^/]*$/, '/');
    const encodedBase = base64UrlEncode(cloudinaryBase);
    const origin = request.nextUrl.origin;
    const proxyBase = `${origin}/api/reality-model/p/${encodedBase}/`;

    const baseTag = `<base href="${proxyBase.replace(/"/g, '&quot;')}">`;
    if (body.includes('<head>')) {
      body = body.replace('<head>', `<head>${baseTag}`);
    } else if (body.includes('<HEAD>')) {
      body = body.replace('<HEAD>', `<HEAD>${baseTag}`);
    } else if (/<html/i.test(body)) {
      body = body.replace(/(<html[^>]*>)/i, `$1<head>${baseTag}</head>`);
    }

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline',
        'X-Frame-Options': 'SAMEORIGIN',
      },
    });
  } catch (e) {
    console.error('Reality model proxy error:', e);
    return NextResponse.json({ error: 'Proxy error' }, { status: 502 });
  }
}
