#!/usr/bin/env node
/**
 * Yerel bir klasörü Vercel Blob Storage'a yükler (alt klasör yapısı korunur).
 *
 * Kullanım:
 *   node scripts/upload-folder-to-blob.mjs <klasör-yolu> [blob-prefix]
 *
 * Örnek:
 *   node scripts/upload-folder-to-blob.mjs ./public/01_Hacimasli2250628_3MX
 *   node scripts/upload-folder-to-blob.mjs ./my-files uploads/2025
 *
 * Gerekli: .env.local içinde BLOB_READ_WRITE_TOKEN (veya ortam değişkeni).
 * Vercel Dashboard > Storage > Blob Store oluşturup token'ı alın.
 */

import { readdir, readFile } from 'fs/promises';
import { join, relative } from 'path';
import { put } from '@vercel/blob';

// .env.local'dan BLOB_READ_WRITE_TOKEN yükle (basit parser)
async function loadEnvLocal() {
  try {
    const { readFile: rf } = await import('fs/promises');
    const content = await rf('.env.local', 'utf-8').catch(() => '');
    for (const line of content.split('\n')) {
      const m = line.match(/^\s*BLOB_READ_WRITE_TOKEN\s*=\s*(.+)/);
      if (m) {
        const val = m[1].replace(/^["']|["']\s*#.*$/g, '').trim();
        if (val) process.env.BLOB_READ_WRITE_TOKEN = val;
        break;
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
  const prefix = process.argv[3] || '';

  if (!folderPath) {
    console.error('Kullanım: node scripts/upload-folder-to-blob.mjs <klasör-yolu> [blob-prefix]');
    process.exit(1);
  }

  await loadEnvLocal();
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('Hata: BLOB_READ_WRITE_TOKEN bulunamadı. .env.local veya ortam değişkeni ayarlayın.');
    process.exit(1);
  }

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

  console.log(`${files.length} dosya yüklenecek...`);
  let ok = 0;
  let err = 0;

  for (const rel of files) {
    const fullPath = join(folderPath, rel);
    const pathname = prefix ? `${prefix.replace(/\/$/, '')}/${rel}` : rel;
    try {
      const buffer = await readFile(fullPath);
      await put(pathname, buffer, { access: 'public' });
      console.log('  OK:', pathname);
      ok++;
    } catch (e) {
      console.error('  HATA:', pathname, e.message);
      err++;
    }
  }

  console.log(`\nBitti: ${ok} başarılı, ${err} hata.`);
  if (err) process.exit(1);
}

main();
