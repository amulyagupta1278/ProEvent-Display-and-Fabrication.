import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Hammer, Printer, Monitor, Lamp, Users, Truck, Quote, CheckCircle2, Clock, Layers, Building2, ChevronDown } from "lucide-react";
import { BRAND, HERO, WHY, GALLERY, TESTIMONIALS, CONTACT, CORE_SERVICES, FAQS, FEATURE_BAR, STATS } from "../mock/mock";
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
  const [playing, setPlaying] = useState(false);

  if (youtubeUrl) {
    // Extract video ID from embed URL (e.g. https://www.youtube.com/embed/z1oiEwS1OF4)
    const videoId = youtubeUrl.split("/embed/")[1]?.split("?")[0];
    const thumbSrc = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
      <div
        className="relative w-full rounded-xl shadow-2xl ring-1 ring-black/10 overflow-hidden"
        style={{ paddingBottom: "56.25%", background: "#000", cursor: playing ? "default" : "pointer" }}
        onClick={() => !playing && setPlaying(true)}
      >
        {/* Thumbnail + play UI — hidden once playing */}
        {!playing && (
          <>
            <img
              src={thumbSrc}
              alt="EventXpertz showreel thumbnail"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.75)", transition: "filter 0.3s" }}
              onError={e => { e.target.src = "/images/booth-design-1.png"; }}
              loading="eager"
              fetchpriority="high"
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(22,46,74,0.55) 0%, transparent 50%)" }} />
            {/* play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
              <div style={{ width: 76, height: 76, background: "#1FA6A8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 8px rgba(31,166,168,0.25)" }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: 3 }}>
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <span style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>Watch Our Showreel</span>
            </div>
            {/* footer badges */}
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em" }}>▶ Click to play</span>
              <span style={{ background: "rgba(0,0,0,0.65)", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "3px 9px", borderRadius: 4 }}>2:14</span>
            </div>
          </>
        )}
        {/* iframe — injected on click so YT branding never shows on load */}
        {playing && (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`${youtubeUrl}?autoplay=1&rel=0&modestbranding=1&color=white`}
            title="EventXpertz exhibition showreel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
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
  const [referenceFile, setReferenceFile] = useState(null);

  // Netlify Forms submit — multipart/form-data so file uploads work
  const onSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    const data = new FormData(formEl);
    // ensure current Select value is included
    data.set("service", service);
    if (referenceFile) data.set("reference-design", referenceFile);

    if (!data.get("name") || !data.get("email")) {
      toast.error("Please enter name and email");
      return;
    }

    const phone = data.get("phone");
    if (phone && !/^[+\d\s\-()]{7,15}$/.test(phone)) {
      toast.error("Please enter a valid contact number");
      return;
    }

    setSaving(true);
    try {
      await fetch("/", {
        method: "POST",
        body: data,
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
                encType="multipart/form-data"
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

                <div>
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
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

                <div>
                  <Label htmlFor="reference-design">
                    Reference Design{" "}
                    <span className="text-white/50 font-normal text-xs">(optional — image or PDF)</span>
                  </Label>
                  <label
                    htmlFor="reference-design"
                    className="mt-1 flex flex-col items-center justify-center gap-2 w-full rounded-md border border-dashed border-white/30 bg-white/5 hover:bg-white/10 cursor-pointer px-4 py-5 text-center transition-colors"
                  >
                    {referenceFile ? (
                      <span className="text-white/90 text-sm font-medium truncate max-w-full">{referenceFile.name}</span>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <span className="text-white/60 text-sm">Click to upload or drag &amp; drop</span>
                        <span className="text-white/40 text-xs">PNG, JPG, PDF up to 10 MB</span>
                      </>
                    )}
                    <input
                      id="reference-design"
                      name="reference-design"
                      type="file"
                      accept="image/*,.pdf"
                      className="sr-only"
                      onChange={(e) => setReferenceFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                  {referenceFile && (
                    <button
                      type="button"
                      onClick={() => { setReferenceFile(null); document.getElementById("reference-design").value = ""; }}
                      className="mt-1 text-xs text-white/50 hover:text-white/80 underline"
                    >
                      Remove file
                    </button>
                  )}
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
        <p className="text-base text-neutral-600 mt-2">Everything needed to deliver a premium booth — end to end.</p>
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

const FeatureBar = () => {
  const iconMap = { Clock, Users, CheckCircle2 };
  return (
    <section className="bg-white border-b border-gray-200 py-14">
      <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {FEATURE_BAR.map((item, i) => {
          const Icon = iconMap[item.icon] || CheckCircle2;
          return (
            <div key={i} className="flex flex-col items-center text-center px-8 py-8 sm:py-0">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "#EDF8F8" }}>
                <Icon className="h-7 w-7 text-[#1FA6A8]" />
              </div>
              <p className="mt-4 font-bold text-[#1F3D63] text-base leading-snug">{item.title}</p>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const iconMap = { Layers, Clock, Users, Building2, CheckCircle2 };
  return (
    <section id="why" className="py-20 bg-[#F8FAFC]">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-xs font-bold tracking-[0.15em] uppercase text-[#1FA6A8]">
          Super-Specialists of the Exhibition Industry
        </p>
        <h2 className="mt-2 text-center text-3xl md:text-4xl font-extrabold text-[#1F3D63]">
          5 Reasons People Choose EventXpertz
        </h2>
        <p className="mt-3 text-center text-gray-500 text-base">
          From design to dismantling — here's why exhibitors trust us event after event.
        </p>

        {/* Stats strip */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 border border-gray-200 rounded-xl bg-white overflow-hidden divide-x divide-y sm:divide-y-0 divide-gray-200">
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center py-6 px-4">
              <span className="text-3xl font-extrabold text-[#1FA6A8]">{s.num}</span>
              <span className="mt-1.5 text-xs font-semibold text-[#1F3D63] leading-snug whitespace-pre-line">{s.label}</span>
            </div>
          ))}
        </div>

        {/* 5 cards — 3-col 6-unit grid, last 2 centred */}
        <div className="mt-8 grid grid-cols-6 gap-5">
          {WHY.map((w, i) => {
            const Icon = iconMap[w.icon] || CheckCircle2;
            const colStyle =
              i === 3 ? { gridColumn: "2 / 4" } :
              i === 4 ? { gridColumn: "4 / 6" } :
              { gridColumn: "span 2" };
            return (
              <div
                key={i}
                style={colStyle}
                className="bg-white rounded-xl p-7 border border-gray-200 hover:shadow-lg hover:border-[#1FA6A8] transition-all duration-200"
              >
                <span className="inline-block text-xs font-extrabold tracking-wider px-3 py-1 rounded-full mb-4 text-[#1FA6A8]" style={{ background: "#EDF8F8" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: "#EDF8F8" }}>
                  <Icon className="h-5 w-5 text-[#1FA6A8]" />
                </div>
                <h3 className="font-bold text-[#1F3D63] text-base mb-2">{w.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CTABanner = () => (
  <section className="py-20 px-6 text-center" style={{ background: "linear-gradient(135deg, #1FA6A8 0%, #1F3D63 100%)" }}>
    <p className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
      Exhibition Stall Partner — Pan India
    </p>
    <p className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
      Ready to Start Your Project?
    </p>
    <p className="text-base max-w-lg mx-auto mb-9" style={{ color: "rgba(255,255,255,0.75)" }}>
      Our team is standing by to help you create an unforgettable exhibition experience. Response within 24 hours.
    </p>
    <div className="flex flex-wrap gap-4 justify-center">
      <a
        href="#top"
        className="inline-flex items-center gap-2 bg-white font-bold px-9 py-4 rounded-full text-sm shadow-lg hover:-translate-y-0.5 transition-transform text-[#1FA6A8]"
      >
        Get Free Quote →
      </a>
      <a
        href="https://wa.me/919358767062"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-semibold px-9 py-4 rounded-full text-sm text-white transition-colors"
        style={{ border: "2px solid rgba(255,255,255,0.5)" }}
        onMouseOver={e => e.currentTarget.style.borderColor = "#fff"}
        onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.536 5.856L.057 23.882l6.187-1.622C7.85 23.389 9.887 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.959 0-3.799-.537-5.375-1.471l-.386-.229-3.995 1.047 1.066-3.888-.252-.401A9.942 9.942 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
        </svg>
        Chat on WhatsApp
      </a>
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
        <p className="text-base text-neutral-600 mt-2">A snapshot of our recent work.</p>
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
      <p className="text-base text-white/70 mt-2">Trusted by brands across industries — delivered consistently.</p>
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

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="font-semibold text-[#1F3D63] text-base group-hover:text-[#1FA6A8] transition-colors">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-[#1FA6A8] flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? "max-h-48 pb-4" : "max-h-0"}`}>
        <p className="text-neutral-600 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

const SOCIAL_SVGS = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.225 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.856.601 3.698 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.856-.085 3.698-.601 5.038-1.942 1.341-1.34 1.857-3.182 1.942-5.038C23.986 15.668 24 15.259 24 12s-.014-3.667-.072-4.947c-.085-1.856-.601-3.698-1.942-5.038C20.646.673 18.804.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  ),
};

const Footer = () => (
  <footer id="contact" className="bg-[#162E4A] text-white">
    <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2">
          <img src="/images/logo.jpeg" alt="Eventxpertz logo" className="h-8 w-8 rounded-md object-contain" />
          <span className="font-semibold text-white">{BRAND.name}</span>
        </div>
        <p className="mt-3 text-white/70 text-sm">EventXpertz is an India-based exhibition and corporate event management company delivering custom stall fabrication, printing &amp; branding, LED display rental, furniture, hospitality manpower, and complete event logistics across Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune, Ahmedabad, Chennai, Kolkata, Jaipur, Noida, and Gurgaon. Contact us for a free quote.</p>
        <div className="mt-5 flex items-center gap-3">
          {CONTACT.social.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 hover:bg-[#1FA6A8] text-white/70 hover:text-white transition-colors"
            >
              {SOCIAL_SVGS[icon]}
            </a>
          ))}
        </div>
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
          <li className="pt-1">
            <address className="not-italic text-white/60 text-xs leading-relaxed">
              New Delhi, Delhi NCR, India – 110001<br />
              Operating pan-India
            </address>
          </li>
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
      <FeatureBar />
      <CTABanner />
      <Portfolio />
      <Testimonials />
      <section className="py-12 bg-white" aria-label="About EventXpertz">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold text-[#1F3D63]">About EventXpertz</h2>
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
            <h2 className="text-3xl font-bold text-[#1F3D63]">Frequently Asked Questions</h2>
            <div className="mt-4 divide-y divide-neutral-200 border-t border-neutral-200">
              {FAQS.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

