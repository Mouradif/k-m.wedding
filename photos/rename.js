const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const resizeImage = async (inputPath, outputPath) => {
  try {
    const image = sharp(inputPath);
    await image
      .resize(500)
      .toFile(outputPath);
  } catch (error) {
    console.error('Error resizing image:', error);
  }
};


async function main() {
  const dirs = (await fs.readdir(__dirname)).filter(d => /^\d\d_/.test(d));
  for (const dir of dirs) {
    const images = (await fs.readdir(path.join(__dirname, dir))).filter(n => n.endsWith('.jpg'));
    let i = 0;
    for (const image of images) {
      const id = i.toString().padStart(3, '0');
      const inputFile = path.join(__dirname, dir, image);
      const outputFile = path.join(__dirname, dir, `${id}.jpg`);
      const resizedFile = path.join(__dirname, dir, `${id}_thumb.jpg`);
      await resizeImage(inputFile, resizedFile);
      await fs.rename(inputFile, outputFile);
      i++;
    }
  }
}

main();
