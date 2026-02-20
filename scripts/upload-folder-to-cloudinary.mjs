#!/usr/bin/env node
/**
 * Yerel bir klasörü Cloudinary'ye yükler (alt klasör yapısı korunur).
 *
 * Kullanım:
 *   node scripts/upload-folder-to-cloudinary.mjs <klasör-yolu> [cloudinary-klasör-prefix]
 *
 * Örnek:
 *   node scripts/upload-folder-to-cloudinary.mjs ./public/01_Hacimasli2250628_3MX
 *   node scripts/upload-folder-to-cloudinary.mjs ./my-files pusula/projeler
 *
 * Gerekli: .env.local içinde CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 * Cloudinary Dashboard > Settings > API Keys
 */

import { readdir, readFile, stat } from 'fs/promises';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cloudinary from 'cloudinary';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function loadEnvLocal() {
  try {
    const { readFile: rf } = await import('fs/promises');
    const content = await rf(join(__dirname, '..', '.env.local'), 'utf-8').catch(() => '');
    for (const line of content.split('\n')) {
      const m = line.match(/^\s*(CLOUDINARY_CLOUD_NAME|CLOUDINARY_API_KEY|CLOUDINARY_API_SECRET)\s*=\s*(.+)/);
      if (m) {
        const val = m[2].replace(/^["']|["']\s*#.*$/g, '').trim();
        if (val) process.env[m[1]] = val;
      }
    }
  } catch (_) {}
}

function getAllFiles(dir, base = dir) {
  const results = [];
  async function walk(current) {
    const list = await readdir(current, { withFileTypes: true });
    for (const ent of list) {
      const full = join(current, ent.name);
      if (ent.isDirectory()) await walk(full);
      else results.push(relative(base, full));
    }
  }
  return walk(dir).then(() => results);
}

async function main() {
  const folderPath = process.argv[2];
  const folderPrefix = process.argv[3] || 'pusula';

  if (!folderPath) {
    console.error('Kullanım: node scripts/upload-folder-to-cloudinary.mjs <klasör-yolu> [cloudinary-klasör-prefix]');
    process.exit(1);
  }

  await loadEnvLocal();
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Hata: .env.local içinde CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET tanımlayın.');
    process.exit(1);
  }

  cloudinary.v2.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

  const { access } = await import('fs/promises');
  try {
    await access(folderPath);
  } catch {
    console.error('Hata: Klasör bulunamadı:', folderPath);
    process.exit(1);
  }

  const files = await getAllFiles(folderPath);
  if (files.length === 0) {
    console.log('Klasörde dosya yok.');
    return;
  }

  console.log(`${files.length} dosya Cloudinary'ye yüklenecek (prefix: ${folderPrefix})...`);
  let ok = 0;
  let err = 0;

  for (const rel of files) {
    const fullPath = join(folderPath, rel);
    const st = await stat(fullPath);
    if (st.size === 0) {
      console.log('  ATLA (boş dosya):', rel);
      continue;
    }
    const relNorm = rel.replace(/\\/g, '/');
    // Uzantıyı koru: Acute3D viewer gibi uygulamalar relative path (örn. script/acute3d.js) kullanır; uzantı yoksa 404 olur.
    const publicId = folderPrefix ? `${folderPrefix.replace(/\/$/, '')}/${relNorm}` : relNorm;
    try {
      const result = await cloudinary.v2.uploader.upload(fullPath, {
        public_id: publicId,
        resource_type: 'auto',
        overwrite: true,
      });
      console.log('  OK:', result.secure_url);
      ok++;
    } catch (e) {
      console.error('  HATA:', rel, e.message);
      err++;
    }
  }

  console.log(`\nBitti: ${ok} başarılı, ${err} hata.`);
  if (err) process.exit(1);
}

main();
