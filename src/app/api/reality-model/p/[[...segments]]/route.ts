import { NextRequest, NextResponse } from 'next/server';

const MAX_BODY = 15 * 1024 * 1024; // 15 MB

function base64UrlDecode(str: string): string {
  try {
    const pad = str.length % 4;
    const base64 = (str + (pad ? '===='.slice(pad) : '')).replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(base64, 'base64').toString('utf-8');
  } catch {
    return '';
  }
}

function isAllowedBaseUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && u.hostname === 'res.cloudinary.com' && u.pathname.includes('/raw/upload/');
  } catch {
    return false;
  }
}

/** /api/reality-model/p/BASE64/script/acute3d.js → Cloudinary base + path */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ segments?: string[] }> }
) {
  const { segments } = await params;
  if (!segments || segments.length < 2) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  const encodedBase = segments[0];
  const pathParts = segments.slice(1);
  const baseUrl = base64UrlDecode(encodedBase);
  if (!baseUrl || !isAllowedBaseUrl(baseUrl)) {
    return NextResponse.json({ error: 'Invalid base' }, { status: 400 });
  }

  let subPath = pathParts.join('/');
  if (subPath === 'Scene/Production_5.3mx') {
    subPath = 'Scene/01_Hacimasli2250628_3MX.3mx';
  }
  const targetUrl = `${baseUrl.replace(/\/$/, '')}/${subPath}`;

  try {
    const res = await fetch(targetUrl, {
      headers: { 'Accept': '*/*' },
      redirect: 'follow',
    });

    if (!res.ok) {
      return new NextResponse(null, { status: res.status });
    }

    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const body = await res.arrayBuffer();
    if (body.byteLength > MAX_BODY) {
      return NextResponse.json({ error: 'Too large' }, { status: 413 });
    }

    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Content-Disposition': 'inline',
    };
    if (contentType.startsWith('application/javascript') || contentType.startsWith('text/javascript')) {
      headers['Cross-Origin-Resource-Policy'] = 'same-origin';
    }

    return new NextResponse(body, { status: 200, headers });
  } catch (e) {
    console.error('Reality model proxy path error:', e);
    return NextResponse.json({ error: 'Proxy error' }, { status: 502 });
  }
}
