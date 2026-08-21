const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\91932\\.gemini\\antigravity-ide\\brain\\fec4ff02-71ae-43a6-acc2-3e43ba236d01\\interview_deal_photo_1787305384676.jpg";
const dest = path.join(__dirname, '..', 'public', 'images', 'about_interview_video.jpg');

try {
  fs.copyFileSync(src, dest);
  console.log('SUCCESS: Copied interview thumbnail to public/images/about_interview_video.jpg');
} catch (err) {
  console.error('ERROR copying file:', err);
}
