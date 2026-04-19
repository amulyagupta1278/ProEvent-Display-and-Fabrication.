const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const canvas = createCanvas(1200, 630);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#1F3D63';
ctx.fillRect(0, 0, 1200, 630);

// Accent bar
ctx.fillStyle = '#1FA6A8';
ctx.fillRect(0, 580, 1200, 50);

// Company name
ctx.fillStyle = '#FFFFFF';
ctx.font = 'bold 80px sans-serif';
ctx.fillText('EventXpertz', 80, 200);

// Tagline
ctx.font = '36px sans-serif';
ctx.fillStyle = 'rgba(255,255,255,0.85)';
ctx.fillText('Exhibition & Corporate Event', 80, 280);
ctx.fillText('Management Company in India', 80, 330);

// Contact
ctx.font = '28px sans-serif';
ctx.fillStyle = '#1FA6A8';
ctx.fillText('+91 9358767062  |  eventxpertz.in', 80, 430);

const out = fs.createWriteStream(
  path.join(__dirname, '../public/og-image.jpg')
);
const stream = canvas.createJPEGStream({ quality: 0.9 });
stream.pipe(out);
out.on('finish', () => console.log('✅ OG image generated: public/og-image.jpg'));
