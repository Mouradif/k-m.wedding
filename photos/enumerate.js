const fs = require('fs').promises;
const path = require('path');

const template = '<img src="%s">';

async function main() {
  const dirs = (await fs.readdir(__dirname)).filter(d => /^[0-9]{2}_/.test(d));
  const out = [];

  for (const d of dirs) {
    const imgs = (await fs.readdir(path.join(__dirname, d))).filter(f => /_thumb\.jpg$/.test(f));
    for (const img of imgs) {
      out.push([
        '<div class="gallery-item">',
        template.replace('%s', `/photos/${d}/${img}`),
        '</div>'
      ].join('\n'));
    }
  }

  console.log(out.join('\n'));
}

main();
