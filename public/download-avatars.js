const fs = require('fs');
const https = require('https');
const path = require('path');

const CATEGORY = 'adventurer-neutral'; 
const TOTAL_AVATARS = 10;
const OUTPUT_DIR = path.join(__dirname, 'avatars', CATEGORY);


if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}


const seeds = Array.from({ length: TOTAL_AVATARS }, (_, i) =>
  `avatar-${String(i + 1).padStart(3, '0')}`
);

// Función para descargar un avatar
function downloadAvatar(seed) {
  const url = `https://api.dicebear.com/7.x/${CATEGORY}/svg?seed=${seed}`;
  const filePath = path.join(OUTPUT_DIR, `${seed}.svg`);

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✅ Descargado: ${seed}.svg`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`❌ Error con ${seed}: ${err.message}`);
      reject(err);
    });
  });
}

// Descargar todos
async function run() {
  for (const seed of seeds) {
    await downloadAvatar(seed);
  }
}

run();
