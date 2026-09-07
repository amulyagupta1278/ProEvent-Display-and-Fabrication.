const fs = require('fs');
const path = require('path');
const http = require('http');

const BUILD_DIR = path.join(__dirname, '../build');

const FALLBACK_HTML = `
<header style="background:#1F3D63;padding:1rem 2rem;position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;gap:1rem">
  <img src="/images/logo.jpeg" alt="EventXpertz logo" style="height:36px;width:36px;border-radius:6px" width="36" height="36"/>
  <span style="color:#fff;font-weight:700;font-size:1.1rem">EventXpertz</span>
  <nav style="margin-left:auto;display:flex;gap:1rem">
    <a href="#services" style="color:#fff;text-decoration:none;font-size:.9rem">Services</a>
    <a href="#contact" style="color:#fff;text-decoration:none;font-size:.9rem">Contact</a>
  </nav>
</header>
<main style="font-family:sans-serif;max-width:960px;margin:0 auto;padding:5rem 1.5rem 2rem">
  <h1 style="color:#1F3D63;font-size:2.25rem;font-weight:800;line-height:1.2">
    EventXpertz — Exhibition &amp; Corporate Event Management Company in India
  </h1>
  <p style="font-size:1.1rem;color:#444;margin-top:1rem;line-height:1.7">
    EventXpertz is a professional exhibition and event management company in India,
    specialising in custom booth design, stall fabrication, LED screens, branding,
    logistics, and end-to-end event solutions. We serve clients across Delhi NCR,
    Mumbai, Bengaluru, Hyderabad, Pune, Ahmedabad, Chennai, Kolkata, Noida, and
    all major Indian cities and expo venues.
  </p>
  <h2 id="services" style="color:#1F3D63;margin-top:2.5rem;font-size:1.5rem">Our Services</h2>
  <ul style="color:#444;line-height:2.2;margin-top:.75rem">
    <li><strong>Stall Fabrication &amp; Setup</strong> — Octonorm &amp; custom wooden stalls, flooring, partitions</li>
    <li><strong>Printing &amp; Branding</strong> — Flex, vinyl, sunboard, standees, backdrops, signage</li>
    <li><strong>LED Display &amp; Screens</strong> — 32&quot; to 65&quot; TVs, P3/P4 LED walls, AV playback</li>
    <li><strong>Furniture &amp; Lighting</strong> — Chairs, sofas, tables, counters, par lights, focus lights</li>
    <li><strong>Manpower &amp; Hospitality</strong> — Hostess staff, tea/coffee setup, cleaning crew</li>
    <li><strong>Complete Event Management</strong> — End-to-end from planning to post-event dismantling</li>
  </ul>
  <h2 style="color:#1F3D63;margin-top:2.5rem;font-size:1.5rem">Why Choose EventXpertz</h2>
  <ul style="color:#444;line-height:2.2;margin-top:.75rem">
    <li>&#x2705; Pan-India reach — all major cities and expo venues</li>
    <li>&#x2705; On-time delivery — tight, dependable execution timelines</li>
    <li>&#x2705; End-to-end support — structure to screens, lights to logistics</li>
    <li>&#x2705; Transparent pricing — no hidden charges, clear quotes upfront</li>
    <li>&#x2705; Experienced team — designers, fabricators, on-ground coordinators</li>
  </ul>
  <h2 id="contact" style="color:#1F3D63;margin-top:2.5rem;font-size:1.5rem">Contact EventXpertz</h2>
  <p style="color:#444;line-height:2;margin-top:.75rem">
    &#128222; <a href="tel:+919358767062" style="color:#1F3D63;font-weight:600">+91 9358767062</a><br/>
    &#9993;&#65039; <a href="mailto:contact@eventxpertz.in" style="color:#1F3D63">contact@eventxpertz.in</a><br/>
    &#127760; <a href="https://eventxpertz.in" style="color:#1F3D63">https://eventxpertz.in</a>
  </p>
  <h2 style="color:#1F3D63;margin-top:2.5rem;font-size:1.5rem">Frequently Asked Questions</h2>
  <dl style="margin-top:.75rem">
    <dt style="font-weight:700;color:#1F3D63">Does EventXpertz operate pan-India?</dt>
    <dd style="color:#444;margin-bottom:1rem">Yes, we support trade fairs and events across Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune, Ahmedabad, Chennai, and Kolkata.</dd>
    <dt style="font-weight:700;color:#1F3D63">What types of stalls do you build?</dt>
    <dd style="color:#444;margin-bottom:1rem">We build Octonorm modular stalls, custom wooden stalls, and shell scheme setups from 3x3 to 10x10 metres and beyond.</dd>
    <dt style="font-weight:700;color:#1F3D63">Do you provide LED screens?</dt>
    <dd style="color:#444;margin-bottom:1rem">Yes — LED TVs (32" to 65"), P3/P4 LED walls, and full AV playback support.</dd>
  </dl>
</main>
<footer style="background:#162E4A;color:#fff;padding:2rem 1.5rem;margin-top:3rem">
  <p style="max-width:960px;margin:0 auto;font-size:.9rem;opacity:.8">
    &copy; ${new Date().getFullYear()} EventXpertz. Exhibition &amp; Corporate Event Management Company in India.
    Serving Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune, Ahmedabad, Chennai, Kolkata, Noida, Gurgaon.
  </p>
</footer>`;

function injectFallback() {
  const indexPath = path.join(BUILD_DIR, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf8');
  const injected = html.replace('<div id="root"></div>', `<div id="root">${FALLBACK_HTML}</div>`);
  fs.writeFileSync(indexPath, injected);
  console.log('✅ Static fallback injected into build/index.html');
}

async function prerender() {
  let server;
  let browser;

  try {
    // Lazy-require puppeteer so the script still works if it's not installed
    let puppeteer;
    try {
      puppeteer = require('puppeteer');
    } catch {
      console.warn('⚠️  puppeteer not found — using static fallback');
      injectFallback();
      return;
    }

    let handler;
    try {
      handler = require('serve-handler');
    } catch {
      console.warn('⚠️  serve-handler not found — using static fallback');
      injectFallback();
      return;
    }

    server = http.createServer((req, res) =>
      handler(req, res, { public: BUILD_DIR })
    );
    await new Promise(r => server.listen(5050, r));
    console.log('🚀 Local server started on :5050');

    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
      headless: 'new',
    });

    const page = await browser.newPage();
    await page.goto('http://localhost:5050/', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    const html = await page.content();

    if (!html.includes('EventXpertz') || !html.includes('Exhibition')) {
      console.error('❌ Pre-render produced no content — falling back to static injection');
      injectFallback();
    } else {
      fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), html);
      console.log('✅ Pre-render success — HTML saved');
    }
  } catch (err) {
    console.error('⚠️  Pre-render error:', err.message);
    console.log('↩️  Falling back to static injection...');
    injectFallback();
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (server) server.close();
  }
}

prerender();
