const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\91932\\.gemini\\antigravity-ide\\brain\\fec4ff02-71ae-43a6-acc2-3e43ba236d01\\gold_feather_emblem_1787298250158.jpg";
const destImg = path.join(__dirname, '..', 'public', 'images', 'gold_feather_emblem.png');
const destTs = path.join(__dirname, '..', 'components', 'emblemBase64.ts');

try {
  const buf = fs.readFileSync(src);
  fs.writeFileSync(destImg, buf);
  console.log('Saved image to:', destImg);

  const b64 = buf.toString('base64');
  const tsContent = `export const EMBLEM_IMAGE_BASE64 = "data:image/jpeg;base64,${b64}";\n`;
  fs.writeFileSync(destTs, tsContent);
  console.log('Generated base64 ts file at:', destTs);
} catch (err) {
  console.error('Error:', err);
}
