import { NextRequest, NextResponse } from 'next/server';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'dnnelobda';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/Pusula/01_Hacimasli2250628_3MX`;

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.xml': 'application/xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.scss': 'text/x-scss',
  '.3mx': 'application/octet-stream',
  '.3mxb': 'application/octet-stream',
};

function getContentType(pathname: string): string {
  const ext = pathname.includes('.') ? pathname.slice(pathname.lastIndexOf('.')) : '';
  return MIME[ext.toLowerCase()] ?? 'application/octet-stream';
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path: pathSegments } = await params;
  const path = pathSegments?.length ? pathSegments.join('/') : 'App/index.html';
  const cloudinaryUrl = `${CLOUDINARY_BASE}/${path}`;

  const res = await fetch(cloudinaryUrl, { cache: 'no-store' });
  if (!res.ok) {
    return new NextResponse(null, { status: res.status });
  }

  const contentType = getContentType(path);
  const isIndex = path === 'App/index.html' || path.endsWith('/index.html');

  if (isIndex && contentType === 'text/html') {
    const html = await res.text();
    const origin = request.nextUrl.origin;
    const baseTag = `<base href="${origin}/realitymodel/haracci-proxy/App/">`;
    const injected = html.replace(/<head>/i, `<head>${baseTag}`);
    return new NextResponse(injected, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': 'inline',
      },
    });
  }

  const body = await res.arrayBuffer();
  let finalBody = body;
  let finalContentType = contentType;

  // Viewer config sahneyi Production_5.3mx bekliyor; bu projede 01_Hacimasli2250628_3MX.3mx var.
  if (path === 'App/config.json' && contentType === 'application/json') {
    try {
      const json = JSON.parse(Buffer.from(body).toString('utf-8')) as { URLs?: Array<{ alias?: string; scene?: string }> };
      if (json.URLs && Array.isArray(json.URLs)) {
        json.URLs = json.URLs.map((u: { alias?: string; scene?: string }) => ({
          ...u,
          scene: u.scene?.replace(/Production_5\.3mx$/i, '01_Hacimasli2250628_3MX.3mx') ?? u.scene,
        }));
        finalBody = Buffer.from(JSON.stringify(json), 'utf-8');
      }
    } catch (_) {}
  }

  return new NextResponse(finalBody, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': 'inline',
    },
  });
}
