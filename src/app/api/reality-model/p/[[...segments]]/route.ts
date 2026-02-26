import { NextRequest, NextResponse } from 'next/server';

const MAX_BODY = 100 * 1024 * 1024; // 100 MB (scene .3mx dosyaları büyük olabilir)

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

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? 'dnnelobda';
const DEFAULT_CLOUDINARY_APP_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/Pusula/01_Hacimasli2250628_3MX/App/`;
const DEFAULT_CLOUDINARY_SCENE_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/Pusula/01_Hacimasli2250628_3MX/`;
const TURKKOSE_SCENE_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/Pusula/01_20251124_TurkkoseYol_3MXWeb/`;

/** /api/reality-model/p/BASE64/script/acute3d.js veya /api/reality-model/p/Scene/... (base64 yoksa varsayılan base) */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ segments?: string[] }> }
) {
  const { segments } = await params;
  if (!segments || segments.length < 1) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  let baseUrl: string;
  let pathParts: string[];

  const decoded = base64UrlDecode(segments[0]);
  if (decoded && isAllowedBaseUrl(decoded)) {
    baseUrl = decoded;
    pathParts = segments.slice(1);
  } else {
    baseUrl = DEFAULT_CLOUDINARY_APP_BASE;
    pathParts = segments;
  }

  if (pathParts.length === 0) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  let subPath = pathParts.join('/');
  if (subPath === 'Scene/Production_5.3mx') {
    subPath = 'Scene/01_Hacimasli2250628_3MX.3mx';
  }
  if (subPath.startsWith('Scene/')) {
    if (decoded && isAllowedBaseUrl(decoded)) {
      baseUrl = baseUrl.replace(/\/App\/?$/, '/');
    } else {
      baseUrl = TURKKOSE_SCENE_BASE;
    }
  }
  let targetUrl = `${baseUrl.replace(/\/$/, '')}/${subPath}`;

  try {
    let res = await fetch(targetUrl, {
      headers: { 'Accept': '*/*' },
      redirect: 'follow',
    });

    if (!res.ok && subPath.startsWith('Scene/') && !decoded) {
      const otherBase = baseUrl === TURKKOSE_SCENE_BASE ? DEFAULT_CLOUDINARY_SCENE_BASE : TURKKOSE_SCENE_BASE;
      const otherUrl = `${otherBase.replace(/\/$/, '')}/${subPath}`;
      const resOther = await fetch(otherUrl, { headers: { 'Accept': '*/*' }, redirect: 'follow' });
      if (resOther.ok) {
        res = resOther;
      }
    }
    if (!res.ok && subPath.startsWith('Scene/') && baseUrl === DEFAULT_CLOUDINARY_SCENE_BASE) {
      const appSceneUrl = `${DEFAULT_CLOUDINARY_APP_BASE.replace(/\/$/, '')}/${subPath}`;
      const resApp = await fetch(appSceneUrl, { headers: { 'Accept': '*/*' }, redirect: 'follow' });
      if (resApp.ok) {
        res = resApp;
      }
    }

    if (!res.ok && subPath === 'Scene/placeholder.jpg') {
      const tinyPng = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
        'base64'
      );
      return new NextResponse(tinyPng, {
        status: 200,
        headers: { 'Content-Type': 'image/png', 'Content-Disposition': 'inline' },
      });
    }
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
