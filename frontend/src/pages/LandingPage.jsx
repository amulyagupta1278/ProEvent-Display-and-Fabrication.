import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Hammer, Printer, Monitor, Lamp, Users, Truck, Quote, CheckCircle2 } from "lucide-react";
import { BRAND, HERO, WHY, GALLERY, TESTIMONIALS, CONTACT, CORE_SERVICES, FAQS } from "../mock/mock";
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel";
import { toast } from "sonner";

// Simple link
const NavLink = ({ href, children }) => (
  <a href={href} className="text-sm font-medium text-white hover:text-white/80 transition-colors px-3 py-2">
    {children}
  </a>
);
const handleWhatsAppOrder = () => {
    const phone = "+919358767062";
    const message = "Hello EventXpertz, I visited your website and would like to know more about your event services.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

const HeaderNav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled ? "backdrop-blur-xl bg-[#1F3D63]/95 border-b border-white/10" : "bg-[#1F3D63]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/images/logo.jpeg" alt="Eventxpertz logo" className="h-8 w-8 rounded-md object-contain" />
          <span className="text-white font-semibold tracking-wide">{BRAND.name}</span>
        </div>
        <nav className="hidden md:flex items-center">
          <NavLink href="#top">Home</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#why">Why Us</NavLink>
          <NavLink href="#portfolio">Portfolio</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
        <div className="hidden md:block">
          <Button onClick={() => handleWhatsAppOrder()} className="bg-[var(--brand)] hover:bg-[var(--hover)] text-white rounded-md">Get a Quote</Button>
        </div>
      </div>
    </header>
  );
};

const VideoEmbed = ({ youtubeUrl, mp4Url }) => {
  if (youtubeUrl) {
    return (
      <div className="relative w-full rounded-xl shadow-2xl ring-1 ring-black/10 overflow-hidden" style={{paddingBottom: "56.25%"}}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`${youtubeUrl}?rel=0&modestbranding=1&color=white`}
          title="EventXpertz showcase"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <img
      src={HERO.image}
      alt="EventXpertz exhibition stall setup"
      className="aspect-video w-full object-cover rounded-xl shadow-2xl ring-1 ring-black/10"
      loading="eager"
      fetchpriority="high"
    />
  );
};

const HeroTop = () => {
  const formRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("Booth Design");

  // Netlify Forms submit (URL-encoded POST to "/")
  const onSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    const data = new FormData(formEl);
    // ensure current Select value is included
    data.set("service", service);

    if (!data.get("name") || !data.get("email")) {
      toast.error("Please enter name and email");
      return;
    }

    setSaving(true);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      setSubmitted(true);
      toast.success("Thanks! We'll get back within 24 hours.");
      formEl.reset();
    } catch (err) {
      console.error(err);
      toast.error("Submit failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="top" className="relative pt-28 pb-14 bg-gradient-to-b from-[#1F3D63] to-[#1C3D5C] text-white">
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div className="absolute -inset-24 bg-[radial-gradient(500px_200px_at_20%_0%,rgba(31,166,168,0.15),transparent)]" />
      </div>
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1">
          <VideoEmbed youtubeUrl={HERO.youtubeUrl} mp4Url={HERO.videoMp4} />
        </div>
        <div className="order-1 lg:order-2">
          <div className="rounded-2xl md:backdrop-blur-2xl bg-white/10 border border-white/20 p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Exhibition & Event Management Company in India</h1>
            <p className="mt-3 text-white/90 text-lg font-medium">Custom stalls. Professional branding. Pan-India delivery.</p>
            <p className="mt-2 text-white/80 text-sm">
              Trusted by T-Fit, BAIF, and brands across industries — from Pragati Maidan to BIEC.
            </p>

            {!submitted ? (
              <form
                ref={formRef}
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="botField"
                onSubmit={onSubmit}
                className="mt-6 grid grid-cols-1 gap-4"
              >
                {/* Netlify detection fields */}
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="botField" />
                  </label>
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      Name<span className="text-red-400"> *</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      autoComplete="name"
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      Email<span className="text-red-400"> *</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Company name"
                      autoComplete="organization"
                      className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div>
                    <Label>Service</Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Booth Design", "Full Build + Logistics", "Equipment Rental", "Hybrid Events"].map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* include service for Netlify scan even if JS fails */}
                    <input type="hidden" name="service" value={service} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Booth size, city, dates, and requirements"
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button disabled={saving} className="bg-[var(--brand)] hover:bg-[var(--hover)] text-white rounded-md px-6">
                    {saving ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="mt-6 rounded-lg bg-white/10 border border-white/20 p-6">
                <h3 className="text-xl font-semibold">Thanks! We'll get back within 24 hours.</h3>
                <p className="text-white/90 mt-2">
                  Your details were received. We'll follow up shortly.
                </p>
                <Button onClick={handleWhatsAppOrder} className="mt-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-md px-6">Chat on WhatsApp for Faster Response</Button>

              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const CoreServices = () => {
  const iconMap = { Hammer, Printer, Monitor, Lamp, Users, Truck, CheckCircle2 };
  return (
    <section id="services" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1F3D63]">Our Core Services</h2>
        <p className="text-neutral-600 mt-2">Everything needed to deliver a premium booth—end to end.</p>
        <p className="text-neutral-600 mt-4 max-w-2xl">
          From Octonorm modular stalls to fully custom wooden builds, EventXpertz handles
          every aspect of your exhibition presence — design, fabrication, branding,
          furniture, AV equipment, manpower, and post-event dismantling. We operate
          across all major Indian trade fair venues including India Expo Centre (Greater
          Noida), Bombay Exhibition Centre, Bengaluru International Exhibition Centre,
          Hitex Exhibition Centre (Hyderabad), and more.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((svc, idx) => {
            const Icon = iconMap[svc.icon] || CheckCircle2;
            const isLast = idx === CORE_SERVICES.length - 1;
            return (
              <Card key={idx} className={`group hover:shadow-xl transition-all ${isLast ? 'lg:col-start-2' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-lg bg-[#1F3D63] text-white flex items-center justify-center ring-1 ring-black/10 group-hover:ring-[var(--brand)] transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-[#1F3D63]">{svc.title}</h3>
                      <ul className="mt-2 space-y-1 text-neutral-600 list-disc pl-5">
                        {svc.items.map((it, i) => (
                          <li key={i}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => (
  <section id="why" className="py-20 bg-[#1F3D63] text-white">
    <div className="mx-auto max-w-7xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Us</h2>
      <p className="text-white/70 mt-2">Premium exhibition booths with dependable execution.</p>
      <p className="text-white/70 mt-4 max-w-2xl">
        EventXpertz has delivered exhibition stalls and corporate event setups across
        hundreds of events pan-India. Our team manages everything — from the first
        design sketch to the last bolt on dismantling day — so you can focus entirely
        on your business goals at the event.
      </p>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY.map((w, i) => (
          <Card key={i} className="hover:shadow-xl transition-all bg-white/5 border-white/10">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-white">{w.title}</h3>
              <p className="text-white/80 mt-2">{w.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Portfolio = () => {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <section id="portfolio" className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1F3D63]">Portfolio</h2>
        <p className="text-neutral-600 mt-2">A snapshot of our recent work.</p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY.map((img, index) => {
            const isFeatured = index === 0;
            const isLast = index === GALLERY.length - 1;
            const isOrphan = isLast && (GALLERY.length - 1) % 3 === 0;
            return (
              <button
                key={img.id}
                onClick={() => { setActive(img); setOpen(true); }}
                aria-label={`View portfolio image: ${img.alt}`}
                className={`group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1FA6A8] aspect-[4/3] ${
                  isFeatured ? 'col-span-2 md:col-span-2 md:row-span-2 md:aspect-auto' : ''
                } ${isOrphan ? 'md:col-start-2' : ''}`}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-4">
                  <p className="text-white text-xs md:text-sm font-medium leading-tight line-clamp-2">{img.alt}</p>
                </div>
              </button>
            );
          })}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <span className="hidden" />
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 bg-[#162E4A]/90 border-white/10 overflow-hidden rounded-xl">
            {active && (
              <img
                src={active.url}
                alt={active.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section id="testimonials" className="py-20 bg-[#1F3D63] text-white">
    <div className="mx-auto max-w-7xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold">What Clients Say</h2>
      <p className="text-white/70 mt-2">Trusted by brands across industries — delivered consistently.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
            <div className="text-yellow-400 text-lg tracking-wide">★★★★★</div>
            <Quote className="h-5 w-5 text-[var(--brand)] mt-3" />
            <p className="mt-3 text-white/90 leading-relaxed">"{t.quote}"</p>
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-white font-semibold text-sm">{t.name}</p>
              <p className="text-white/60 text-xs mt-0.5">{t.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="bg-[#162E4A] text-white">
    <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2">
          <img src="/images/logo.jpeg" alt="Eventxpertz logo" className="h-8 w-8 rounded-md object-contain" />
          <span className="font-semibold text-white">{BRAND.name}</span>
        </div>
        <p className="mt-3 text-white/70 text-sm">EventXpertz is an India-based exhibition and corporate event management company delivering custom stall fabrication, printing &amp; branding, LED display rental, furniture, hospitality manpower, and complete event logistics across Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune, Ahmedabad, Chennai, Kolkata, Jaipur, Noida, and Gurgaon. Contact us for a free quote.</p>
      </div>
      <div>
        <h3 className="font-semibold text-white">Quick Links</h3>
        <ul className="mt-3 space-y-2 text-sm text-white/70">
          <li>
            <a className="hover:text-white" href="#services">
              Services
            </a>
          </li>
          <li>
            <a className="hover:text-white" href="#why">
              Why Us
            </a>
          </li>
          <li>
            <a className="hover:text-white" href="#portfolio">
              Portfolio
            </a>
          </li>
          <li>
            <a className="hover:text-white" href="#testimonials">
              Testimonials
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-white">Contact</h3>
        <ul className="mt-3 space-y-2 text-sm text-white/70">
          <li>Email: {CONTACT.email}</li>
          <li>Website: {CONTACT.website}</li>
          <li>Phone: {CONTACT.phones.join(" | ")}</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
      © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      {" · "}
      <a href="mailto:eventxpertz@gmail.com" className="hover:text-white/80 underline">Privacy &amp; Contact</a>
    </div>
  </footer>
);

export default function LandingPage() {
  useEffect(() => {
    document.documentElement.style.setProperty("--brand", BRAND.colors.primary);
    document.documentElement.style.setProperty("--hover", BRAND.colors.hover);
  }, []);
  return (
    <main className="bg-white text-[#162E4A]">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-[#1F3D63] focus:px-4 focus:py-2 focus:rounded focus:font-bold"
      >
        Skip to main content
      </a>
      <HeaderNav />
      <HeroTop />
      <CoreServices />
      <WhyChooseUs />
      <Portfolio />
      <Testimonials />
      <section className="py-12 bg-white" aria-label="About EventXpertz">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold text-[#1F3D63]">About EventXpertz</h2>
            <p className="mt-3 text-neutral-600">
              EventXpertz is an India-based exhibition and corporate event management company. We design, fabricate, and execute customised exhibition stalls for trade fairs, expos, and corporate events.
            </p>
            <p className="mt-3 text-neutral-600">
              Our work spans Octonorm and wooden stall builds, flex and vinyl printing, LED TV and wall rentals, furniture and lighting setup, hospitality manpower, and complete logistics — all under one roof.
            </p>
            <p className="mt-3 text-neutral-600">
              We have executed stalls at Pragati Maidan (Delhi), IEML (Greater Noida), Bombay Exhibition Centre (Mumbai), BIEC (Bengaluru), and Hitex (Hyderabad). Clients include T-Fit and BAIF, among others.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1F3D63]">Frequently Asked Questions</h2>
            <div className="mt-4 space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="border-b border-neutral-200 pb-4">
                  <p className="font-semibold text-[#1F3D63]">{faq.q}</p>
                  <p className="mt-1 text-neutral-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

