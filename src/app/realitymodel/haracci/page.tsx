'use client';

import { useEffect, useState } from 'react';

export default function HaracciViewerPage() {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    fetch(`${base}/realitymodel/haracci-proxy/App/index.html`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.text();
      })
      .then((text) => setHtml(text))
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <p className="text-red-600">Yüklenemedi: {error}</p>
      </div>
    );
  }

  if (!html) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <iframe
      title="Haracci Kayaşehir 3D Viewer"
      srcDoc={html}
      className="fixed inset-0 w-full h-full border-0"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
