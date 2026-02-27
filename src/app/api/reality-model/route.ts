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

    body = body.replace(/<base\s[^>]*>/gi, '');
    const viewportMeta = /<meta[^>]+name=["']viewport["']/i.test(body) ? '' : '<meta name="viewport" content="width=device-width, initial-scale=1">';
    const embedStyle = '<style>html,body{height:100%;margin:0;overflow:hidden;-webkit-font-smoothing:antialiased}#content,#viewer,.qx-widget{height:100%!important;min-height:100%!important}canvas{image-rendering:auto;-webkit-backface-visibility:hidden;backface-visibility:hidden}</style>';
    const acute3dPatch = '<script>(function(){var px=function(v){return typeof v==="number"?v+"px":(v||"100%");};var E=Element.prototype;if(!E.setHeight){E.setHeight=function(h){this.style.height=px(h);};E.setWidth=function(w){this.style.width=px(w);};}var O=Object.prototype;if(!O.setHeight){var sh=function(h){var el=this.getContentElement?this.getContentElement():this.dom||(this.style?this:null);if(el&&el.style)el.style.height=px(h);};var sw=function(w){var el=this.getContentElement?this.getContentElement():this.dom||(this.style?this:null);if(el&&el.style)el.style.width=px(w);};Object.defineProperty(O,"setHeight",{value:sh,writable:true,configurable:true,enumerable:false});Object.defineProperty(O,"setWidth",{value:sw,writable:true,configurable:true,enumerable:false});}})();</script>';
    const resizeTrigger = '<script>(function(){function r(){window.dispatchEvent(new Event("resize"));}if(document.readyState==="complete")r();else window.addEventListener("load",r);setTimeout(r,100);setTimeout(r,500);})();</script>';
    const baseTag = `<base href="${proxyBase.replace(/"/g, '&quot;')}">`;
    const headInject = viewportMeta + baseTag + embedStyle + acute3dPatch + resizeTrigger;
    if (body.includes('<head>')) {
      body = body.replace('<head>', `<head>${headInject}`);
    } else if (body.includes('<HEAD>')) {
      body = body.replace('<HEAD>', `<HEAD>${headInject}`);
    } else if (/<html/i.test(body)) {
      body = body.replace(/(<html[^>]*>)/i, `$1<head>${headInject}</head>`);
    }

    const pixelRatioPatch = '<script>(function(){var dpr=typeof window!=="undefined"&&window.devicePixelRatio?Math.min(window.devicePixelRatio,3):1;function patch(){try{if(window.THREE&&window.THREE.WebGLRenderer&&!window.THREE.WebGLRenderer.prototype._dprPatched){var O=window.THREE.WebGLRenderer.prototype;var orig=O.setPixelRatio;if(orig){O.setPixelRatio=function(r){return orig.call(this,r!=null?Math.max(dpr,Number(r)):dpr);};O._dprPatched=true;}window.dispatchEvent(new Event("resize"));}}catch(e){}}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",patch);patch();window.addEventListener("load",function(){setTimeout(patch,0);setTimeout(patch,200);setTimeout(patch,800);});})();</script>';
    if (body.includes('</body>')) {
      body = body.replace('</body>', pixelRatioPatch + '</body>');
    } else if (body.includes('</BODY>')) {
      body = body.replace('</BODY>', pixelRatioPatch + '</BODY>');
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
