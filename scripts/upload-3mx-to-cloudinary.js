/**
 * public/01_Hacimasli2250628_3MX klasörünü Cloudinary'de
 * Pusula/01_Hacimasli2250628_3MX altına yükler.
 * Kullanım: node scripts/upload-3mx-to-cloudinary.js
 * .env.local içinde CLOUDINARY_* değişkenleri tanımlı olmalı.
 */

const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const cloudinary = require('cloudinary').v2;

const CLOUDINARY_FOLDER = 'Pusula/01_Hacimasli2250628_3MX';
const LOCAL_DIR = path.join(process.cwd(), 'public', '01_Hacimasli2250628_3MX');

function getAllFiles(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    const rel = base ? `${base}/${ent.name}` : ent.name;
    if (ent.isDirectory()) {
      files.push(...getAllFiles(path.join(dir, ent.name), rel));
    } else {
      files.push({ fullPath: path.join(dir, ent.name), relativePath: rel });
    }
  }
  return files;
}

async function uploadFile(filePath, relativePath) {
  const dir = path.dirname(relativePath);
  const basename = path.basename(relativePath);
  const ext = path.extname(basename);
  const nameWithoutExt = basename.slice(0, -ext.length);
  const cloudFolder = dir ? `${CLOUDINARY_FOLDER}/${dir}` : CLOUDINARY_FOLDER;
  const publicId = nameWithoutExt;

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        folder: cloudFolder,
        public_id: publicId,
        resource_type: 'raw',
        overwrite: true,
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

async function main() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Hata: .env.local içinde CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET tanımlı olmalı.');
    process.exit(1);
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (!fs.existsSync(LOCAL_DIR)) {
    console.error('Hata: Klasör bulunamadı:', LOCAL_DIR);
    process.exit(1);
  }

  const files = getAllFiles(LOCAL_DIR);
  console.log(`${files.length} dosya bulundu. Cloudinary'ye yükleniyor (${CLOUDINARY_FOLDER})...\n`);

  let ok = 0;
  let skip = 0;
  let fail = 0;
  for (const { fullPath, relativePath } of files) {
    if (fs.statSync(fullPath).size === 0) {
      console.log('  ATLA (boş):', relativePath);
      skip++;
      continue;
    }
    try {
      await uploadFile(fullPath, relativePath);
      console.log('  OK:', relativePath);
      ok++;
    } catch (e) {
      console.error('  HATA:', relativePath, e.message);
      fail++;
    }
  }

  console.log(`\nBitti. Başarılı: ${ok}, Atlanan (boş): ${skip}, Hata: ${fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
