const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '../build/index.html'), 'utf8');
const hasContent = html.includes('EventXpertz') && html.includes('Exhibition');
if (!hasContent) {
  console.error('❌ Pre-render FAILED — build/index.html has no real content');
  console.error('Falling back to static injection...');
  const injected = html.replace(
    '<div id="root"></div>',
    `<div id="root">
      <header style="background:#1F3D63;padding:1rem 2rem;display:flex;align-items:center;gap:1rem">
        <img src="/images/logo.jpeg" alt="EventXpertz logo" style="height:36px;width:36px;border-radius:6px"/>
        <span style="color:#fff;font-weight:700;font-size:1.1rem">EventXpertz</span>
      </header>
      <main style="font-family:sans-serif;max-width:900px;margin:0 auto;padding:2rem">
        <h1 style="color:#1F3D63;font-size:2rem">EventXpertz — Exhibition &amp; Corporate Event Management Company in India</h1>
        <p style="font-size:1.1rem;color:#444;margin-top:1rem">
          EventXpertz is a professional exhibition and event management company in India,
          specialising in custom booth design, stall fabrication, LED screens, branding,
          logistics, and end-to-end event solutions across Delhi NCR, Mumbai, Bengaluru,
          Hyderabad, Pune, Ahmedabad, Chennai, Kolkata, and all major Indian cities.
        </p>
        <h2 style="color:#1F3D63;margin-top:2rem">Our Services</h2>
        <ul style="color:#444;line-height:2">
          <li>Exhibition Stall Fabrication &amp; Setup (Octonorm &amp; Custom Wooden)</li>
          <li>Printing &amp; Branding — Flex, Vinyl, Standees, Backdrops</li>
          <li>LED Display &amp; Screen Rental (32" to 65", LED Walls P3/P4)</li>
          <li>Furniture &amp; Lighting Setup</li>
          <li>Manpower &amp; Hospitality Staff</li>
          <li>Complete Corporate Event Management</li>
        </ul>
        <h2 style="color:#1F3D63;margin-top:2rem">Contact EventXpertz</h2>
        <p>📞 <a href="tel:+919358767062">+91 9358767062</a></p>
        <p>✉️ <a href="mailto:contact@eventxpertz.in">contact@eventxpertz.in</a></p>
        <p>🌐 <a href="https://eventxpertz.in">https://eventxpertz.in</a></p>
      </main>
    </div>`
  );
  fs.writeFileSync(path.join(__dirname, '../build/index.html'), injected);
  console.log('✅ Static fallback injected into build/index.html');
} else {
  console.log('✅ Pre-render verified — real content found in build/index.html');
}
