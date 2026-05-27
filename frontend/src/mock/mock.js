// Mock data for Eventxpertz (frontend-only placeholder)
// Replace with backend integration later

export const BRAND = {
  name: "Eventxpertz",
  colors: {
    primary: "#1FA6A8", // Accent color (teal)
    hover: "#178F97",
    dark: "#162E4A", // Navy for nav, headings
    darkAlt: "#1F3D63", // Dark blue for body text
    light: "#FFFFFF",
    softGray: "#E0E0E0",
  },
};

export const HERO = {
  headline: "Eventxpertz",
  subheading: "Custom Exhibition Stalls. On-Time. Pan-India.",
  image: "/images/booth-design-1.png",
  youtubeUrl: "https://www.youtube.com/embed/z1oiEwS1OF4",
  videoMp4: "",
};

export const OVERVIEW = {
  title: "Overview",
  text:
    "Eventxpertz is a full-service exhibition and event support company providing complete stall setup, branding, and display solutions for trade fairs, expos, and corporate events across India.\nWe specialize in designing, fabricating, and managing customized exhibition spaces with end-to-end support — from structure to screens, lights to logistics.",
  image: "/images/event-work-1.png",
};

export const SERVICES = [
  { key: "fabrication", icon: "Hammer", title: "Stall Fabrication & Setup", text: "Octonorm & Wooden stalls, custom design, flooring, partitions, and storage." },
  { key: "printing", icon: "Printer", title: "Printing & Branding", text: "Flex, vinyl, sunboard, foam board, standees, backdrops, signage." },
  { key: "displays", icon: "Monitor", title: "Display & LED Screens", text: "LED TVs (32”, 43”, 55”, 65”) with stands, large LED walls (P3/P4), HDMI playback." },
  { key: "furniture", icon: "Lamp", title: "Furniture & Lighting", text: "Chairs, sofas, tables, counters, brochure stands, par lights, focus lights." },
  { key: "manpower", icon: "Users", title: "Manpower & Hospitality", text: "Hostesses, promoters, tea/coffee setup, cleaning staff." },
  { key: "others", icon: "Truck", title: "Others", text: "Generators, carpets, flower decor, logistics, and transport." },
];

export const CORE_SERVICES = [
  {
    title: "Stall Fabrication & Setup",
    icon: "Hammer",
    items: [
      "Octonorm & Wooden stall fabrication",
      "Customized design and on-site installation",
      "Flooring, partitions, and storage area setup",
    ],
  },
  {
    title: "Printing & Branding",
    icon: "Printer",
    items: [
      "Flex, vinyl, sunboard, foam board printing",
      "Standees, backdrops, directional signage",
      "On-site branding installation and dismantling",
    ],
  },
  {
    title: "Display & LED Screens",
    icon: "Monitor",
    items: [
      "LED TVs (32”, 43”, 55”, 65”) with stands",
      "Large LED walls (P3/P4 panels)",
      "Content playback support (USB/HDMI)",
    ],
  },
  {
    title: "Furniture & Lighting",
    icon: "Lamp",
    items: [
      "Chair, sofa, table, counter, brochure stand",
      "External and decorative lights, par lights, focus lights",
      "Extension cords and electrical setup",
    ],
  },
  {
    title: "Manpower & Hospitality",
    icon: "Users",
    items: [
      "Hostess / promoter staff",
      "Tea, coffee, and water setup",
      "Cleaning and daily maintenance staff",
    ],
  },{
    title: "Complete Event Management",
    icon: "CheckCircle2",
    items: [
      "Single-window execution from planning to wrap-up",
      "Budgeting, vendor coordination, and on-ground control",
      "Post-event dismantling and handover",
    ],
  },
  {
    title: "Others",
    icon: "Truck",
    items: [
      "Generator & power backup",
      "Flower decoration & carpet setup",
      "Logistics and transport arrangements",
    ],
  },
];

export const FEATURE_BAR = [
  { icon: "Clock",        title: "On-Time Delivery. Always.",  text: "Your stall is ready before the show floor opens. We've never missed a handover deadline." },
  { icon: "Users",        title: "Single Point of Contact",    text: "One coordinator manages design, fabrication, logistics, and on-site. No chasing vendors." },
  { icon: "CheckCircle2", title: "Satisfaction Guaranteed",    text: "Doesn't match the brief? We fix it. Our work speaks at every expo we've executed." },
];

export const STATS = [
  { num: "500+", label: "Exhibition Stalls\nDelivered" },
  { num: "15+",  label: "Cities &\nVenues Covered" },
  { num: "48h",  label: "Emergency\nSetup Time" },
  { num: "100%", label: "On-Time\nHandover Record" },
];

export const WHY = [
  { icon: "Layers",       title: "World-Class Creativity & Design",  text: "Custom stalls built to reflect your brand — not off-the-shelf templates. Every concept-to-execution by our in-house design team." },
  { icon: "Clock",        title: "On-Time Delivery. Always.",         text: "We've never missed a show handover. Tight deadlines, last-minute changes — we absorb the pressure so you don't." },
  { icon: "Users",        title: "One Team. Full Accountability.",    text: "Design, fabrication, branding, LED/AV, manpower, logistics — one team. No vendor juggling, no coordination gaps." },
  { icon: "Building2",    title: "Every Major Venue. Delivered.",     text: "Pragati Maidan, IEML, Bombay Exhibition Centre, BIEC Bengaluru, Hitex Hyderabad — we know every venue floor plan." },
  { icon: "CheckCircle2", title: "48-Hour Emergency Setup",           text: "Short notice? We mobilise within 48 hours. Same quality, faster execution — because exhibitions don't wait." },
];

export const GALLERY = [
  { id: 1, url: "/images/booth-design-1.png", alt: "EventXpertz custom exhibition stall design" },
  { id: 2, url: "/images/booth-design-2.png", alt: "EventXpertz Octonorm stall fabrication" },
  { id: 3, url: "/images/booth-design-3.png", alt: "EventXpertz branded exhibition booth" },
  { id: 4, url: "/images/event-work-1.png", alt: "EventXpertz trade fair setup" },
  { id: 5, url: "/images/event-work-2.png", alt: "EventXpertz on-site event execution" },
  { id: 6, url: "/images/event-work-3.png", alt: "EventXpertz LED display and branding" },
  { id: 7, url: "/images/event-work-4.png", alt: "EventXpertz complete stall with lighting" },
];

export const TESTIMONIALS = [
  { name: "T-Fit", company: "Exhibition Stall Setup", quote: "EventXpertz handled our stall end-to-end — design, fabrication, and on-site execution. Delivered on time with zero back-and-forth. Exactly what we needed." },
  { name: "BAIF", company: "Stall Design & On-Ground Execution", quote: "Professional setup, clean finish, and a team that understood our brief the first time. Our stall stood out at the exhibition." },
];

export const CONTACT = {
  email: "eventxpertz@gmail.com",
  website: "https://eventxpertz.in",
  phones: ["+91 9358767062"],
};

export const FAQS = [
  { q: "Which cities and venues do you operate in?", a: "We operate pan-India — Delhi NCR (Pragati Maidan, IEML), Mumbai (Bombay Exhibition Centre), Bengaluru (BIEC), Hyderabad (Hitex), Pune, Ahmedabad, Chennai, Kolkata, Jaipur, Noida, and Gurgaon." },
  { q: "What is the minimum booking lead time?", a: "2–3 weeks is ideal for a planned setup. For urgent requirements, we can mobilise within 48 hours subject to material availability." },
  { q: "Do you build both Octonorm and custom wooden stalls?", a: "Yes. We fabricate modular Octonorm stalls and fully custom wooden or PVC builds. The choice depends on your budget, show duration, and brand guidelines." },
  { q: "What does end-to-end management include?", a: "Design, fabrication, branding and print, AV and LED setup, furniture, manpower, on-site supervision during the show, and complete post-event dismantling." },
  { q: "Do you provide a quotation before booking?", a: "Yes. Share your stall size, city, show dates, and requirements — we provide a detailed quotation within 24 hours. No commitment needed to get a quote." },
];
