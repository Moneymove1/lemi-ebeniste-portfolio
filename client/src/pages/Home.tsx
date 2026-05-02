import { useEffect, useRef, useState, useCallback, type ReactNode, type FormEvent, type ChangeEvent } from "react";
import { Link } from "wouter";

/*
 * ═══════════════════════════════════════════════════════════════
 * MAÎTRE ÉBÉNISTE — LUXURY PORTFOLIO
 * Design: Editorial luxury — DM Sans (geometric) + Cormorant Garamond (serif accents)
 * Every proportion calculated. Every spacing intentional.
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Design Tokens ─────────────────────────────────────────────
const sans = "'DM Sans', system-ui, sans-serif";
const serif = "'Cormorant Garamond', 'Georgia', serif";

const C = {
  ivory: "#F5F3EE",
  white: "#FFFFFF",
  charcoal: "#1C1C1C",
  dark: "#2A2825",
  text: "#3D3A36",
  mid: "#7A756D",
  light: "#A8A29E",
  faint: "#C8C3BB",
  line: "#E5E1DA",
  lineLight: "#EDEBE6",
};

// ─── Local Images ────────────────────────────────────────────────
const IMG = {
  // Hero
  cuisineGrise: "/portfolio/hero_main.webp",

  // ── COMMERCIAL ──
  comm1: "/portfolio/c1.webp",
  comm2: "/portfolio/c2.webp",
  comm3: "/portfolio/c3.webp",
  comm4: "/portfolio/c4.webp",
  comm5: "/portfolio/c5.webp",
  comm6: "/portfolio/c6.webp",

  // ── RESIDENTIAL ──
  res7: "/portfolio/7.webp",
  res8: "/portfolio/8.webp",
  res9: "/portfolio/9.webp",
  res10: "/portfolio/10.webp",
  res11: "/portfolio/11.webp",
  res12: "/portfolio/12.webp",
  res13: "/portfolio/13.webp",
  res14: "/portfolio/14.webp",
  res15: "/portfolio/15.webp",
  res16: "/portfolio/16.webp",
  res17: "/portfolio/17.webp",
  res18jpg: "/portfolio/18jpg.webp",
  res18png: "/portfolio/18png.webp",
  res19: "/portfolio/19.webp",
  res20: "/portfolio/20.webp",
  res21: "/portfolio/21.webp",
  res22: "/portfolio/22.webp",
  res23: "/portfolio/23.webp",
};

/* ── Reveal on scroll with stagger ── */
function Reveal({ children, className = "", delay = 0, y = 30, style }: { children: ReactNode; className?: string; delay?: number; y?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.08, rootMargin: "20px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Image with zoom on hover + lazy load ── */
function GalleryImage({ src, alt, aspect = "4/3", mobileAspect, className = "", objectPosition = "center" }: { src: string; alt: string; aspect?: string; mobileAspect?: string; className?: string; objectPosition?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [src]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const currentAspect = (isMobile && mobileAspect) ? mobileAspect : aspect;

  return (
    <div
      className={`overflow-hidden group ${className}`}
      style={{ aspectRatio: currentAspect, backgroundColor: C.lineLight }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-[1.04]"
        style={{ opacity: loaded ? 1 : 0, objectPosition }}
      />
    </div>
  );
}

/* ── Lightbox ── */
function Lightbox({ images, index, onClose, onNav }: { images: string[]; index: number; onClose: () => void; onNav: (i: number) => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(Math.min(index + 1, images.length - 1));
      if (e.key === "ArrowLeft") onNav(Math.max(index - 1, 0));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [index, images.length, onClose, onNav]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "rgba(28,28,28,0.92)", backdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-12 h-12 flex items-center justify-center"
        style={{ color: "#fff" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(index - 1); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
          style={{ color: "#fff" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {index < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(index + 1); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
          style={{ color: "#fff" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <img
        src={images[index]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-w-[95vw] md:max-w-[90vw] max-h-[80vh] md:max-h-[85vh] object-contain"
        style={{ animation: "fadeIn 0.3s ease" }}
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2" style={{ fontFamily: sans, fontSize: "0.8rem", fontWeight: 400, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>
        {index + 1} / {images.length}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   NAVBAR — Refined, minimal, perfectly spaced
   ══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Projets", href: "#projets" },
    { label: "Commercial", href: "#commercial" },
    { label: "Résidentiel", href: "#residentiel" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(245,243,238,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.lineLight}` : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex items-center justify-between" style={{ maxWidth: "1440px", padding: "0 clamp(24px, 4vw, 64px)", height: "80px" }}>
        <Link href="/" style={{
          fontFamily: sans,
          fontSize: "0.82rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: C.charcoal,
          textDecoration: "none",
        }}>
          Maître Ébéniste
        </Link>

        <div className="hidden md:flex items-center" style={{ gap: "clamp(1.5rem, 3vw, 3rem)" }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: sans,
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                color: C.mid,
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.charcoal)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.mid)}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 -mr-2" aria-label="Menu">
          <div className="flex flex-col items-end" style={{ gap: "5px" }}>
            <span className="block h-[1.5px] transition-all duration-400" style={{
              backgroundColor: C.charcoal,
              width: menuOpen ? "20px" : "24px",
              transform: menuOpen ? "rotate(45deg) translateY(3.25px)" : "none",
            }} />
            <span className="block h-[1.5px] transition-all duration-400" style={{
              backgroundColor: C.charcoal,
              width: menuOpen ? "20px" : "18px",
              transform: menuOpen ? "rotate(-45deg) translateY(-3.25px)" : "none",
              opacity: menuOpen ? 1 : 0.7,
            }} />
          </div>
        </button>
      </div>

      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          backgroundColor: C.ivory,
          borderTop: menuOpen ? `1px solid ${C.lineLight}` : "none",
        }}
      >
        <div className="flex flex-col py-8" style={{ padding: "2rem clamp(24px, 4vw, 64px)" }}>
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: sans,
                fontSize: "1rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: C.charcoal,
                textDecoration: "none",
                padding: "1rem 0",
                borderBottom: i < links.length - 1 ? `1px solid ${C.lineLight}` : "none",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO — Cinematic, title overlaid on image with white border
   ══════════════════════════════════════════════════════════════ */
function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fn = () => setOffset(window.scrollY * 0.15);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section style={{ backgroundColor: C.ivory, paddingTop: "80px" }}>
      <div className="mx-auto" style={{ maxWidth: "1440px", padding: "clamp(12px, 3vw, 40px) clamp(16px, 4vw, 64px)" }}>
        <div className="relative overflow-hidden" style={{ backgroundColor: C.lineLight }}>
          <div className="overflow-hidden" style={{ height: "clamp(250px, 40vh, 550px)" }}>
            <img
              src={IMG.cuisineGrise}
              alt="Cuisine sur mesure — Maître Ébéniste"
              fetchPriority="high"
              decoding="sync"
              className="w-full h-full object-cover"
              style={{ transform: `translateY(${offset}px) scale(1.05)`, transition: "transform 0.1s linear" }}
            />
          </div>
          <div className="absolute inset-0" style={{
            background: "linear-gradient(180deg, rgba(28,28,28,0.08) 0%, rgba(28,28,28,0.25) 50%, rgba(28,28,28,0.4) 100%)",
          }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 style={{
              fontFamily: serif,
              fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#FFFFFF",
              letterSpacing: "0.04em",
              lineHeight: 1,
              textShadow: "0 2px 60px rgba(0,0,0,0.2)",
            }}>
              Maître Ébéniste
            </h1>
            <p style={{
              fontFamily: sans,
              fontSize: "clamp(0.65rem, 1.2vw, 0.8rem)",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.75)",
              marginTop: "clamp(12px, 2vw, 24px)",
            }}>
              Ébénisterie sur mesure — Montréal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION DIVIDER — Thin line with label
   ══════════════════════════════════════════════════════════════ */
function SectionDivider({ label, id }: { label: string; id: string }) {
  return (
    <Reveal>
      <div id={id} className="mx-auto" style={{ maxWidth: "1440px", padding: "0 clamp(24px, 4vw, 64px)" }}>
        <div className="flex items-center" style={{ gap: "1.5rem", paddingBottom: "2.5rem" }}>
          <span style={{
            fontFamily: sans,
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: C.light,
          }}>
            {label}
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: C.line }} />
        </div>
      </div>
    </Reveal>
  );
}

/* ══════════════════════════════════════════════════════════════
   COMMERCIAL — 6 photos. Canva reference layout.
   Row 1: comm1 (large left ~65%) + comm2/comm3 stacked right (~35%)
   Row 2: comm4 + comm5 + comm6 — 3 PORTRAIT photos, equal width
   ══════════════════════════════════════════════════════════════ */
function SectionCommercial() {
  const allImages = [IMG.comm1, IMG.comm2, IMG.comm3, IMG.comm4, IMG.comm5, IMG.comm6];
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const gap = "clamp(8px, 1vw, 16px)";

  return (
    <section id="commercial" style={{ backgroundColor: C.ivory, paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
      <SectionDivider label="Commercial" id="commercial-top" />

      <div className="mx-auto" style={{ maxWidth: "1440px", padding: "0 clamp(24px, 4vw, 64px)" }}>

        {/* ── Row 1: 3 Portraits Verticaux (1/3 chacun) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 mb-3 md:mb-4" style={{ gap }}>
          <Reveal>
            <div onClick={() => setLightboxIdx(0)} className="cursor-pointer h-full">
              <GalleryImage src={IMG.comm1} alt="Projet commercial" aspect="3/4" mobileAspect="4/5" className="h-full" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div onClick={() => setLightboxIdx(1)} className="cursor-pointer h-full">
              <GalleryImage src={IMG.comm2} alt="Projet commercial" aspect="3/4" mobileAspect="4/5" className="h-full" />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div onClick={() => setLightboxIdx(2)} className="cursor-pointer h-full">
              <GalleryImage src={IMG.comm3} alt="Projet commercial" aspect="3/4" mobileAspect="4/5" className="h-full" />
            </div>
          </Reveal>
        </div>

        {/* ── Row 2: Portrait (25%) + Paysage (50%) + Portrait (25%) ── */}
        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap }}>
          <Reveal delay={100}>
            <div onClick={() => setLightboxIdx(3)} className="cursor-pointer h-full">
              <GalleryImage src={IMG.comm4} alt="Projet commercial" aspect="3/4" mobileAspect="4/5" className="h-full" />
            </div>
          </Reveal>
          <Reveal delay={200} className="md:col-span-2">
            <div onClick={() => setLightboxIdx(4)} className="cursor-pointer h-full">
              <GalleryImage src={IMG.comm5} alt="Projet commercial" aspect="3/2" mobileAspect="4/3" className="h-full" />
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div onClick={() => setLightboxIdx(5)} className="cursor-pointer h-full">
              <GalleryImage src={IMG.comm6} alt="Projet commercial" aspect="3/4" mobileAspect="4/5" className="h-full" />
            </div>
          </Reveal>
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox images={allImages} index={lightboxIdx} onClose={() => setLightboxIdx(null)} onNav={setLightboxIdx} />
      )}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   RÉSIDENTIEL — EXACT Canva layout reproduction
   Row 1: res1Biblio (~40%) + res2Chevet (~30%) + res3MeubleTV (~30%) — same height
   Row 2: res4ArmoireBlanche + res5GardeRobe + res6ArmoireLuminaire — 3 equal portraits
   Row 3: cuisineBouleau + armoireBouleau1 + armoireBouleau2 — 3 equal
   Row 4: escalierEtageres + meubleTV — 2 equal (50/50)
   Row 5: res7898 + res8785 + res56F7 — 3 equal
   Row 6: biblio (~40%) + salon (~60%) — 2 cols
   Row 7: res3E55 (~60%) + res7FC2 (~40%) — 2 cols
   ══════════════════════════════════════════════════════════════ */
function SectionResidentiel() {
  const allImages = [
    IMG.res7, IMG.res8, IMG.res9,
    IMG.res10, IMG.res11, IMG.res12,
    IMG.res13, IMG.res14, IMG.res15,
    IMG.res16, IMG.res17,
    IMG.res18jpg, IMG.res18png, IMG.res19,
    IMG.res21,
    IMG.res22, IMG.res23,
  ];
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const open = useCallback((i: number) => setLightboxIdx(i), []);

  const gap = "clamp(8px, 1vw, 16px)";

  return (
    <section id="residentiel" style={{ backgroundColor: C.ivory, paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
      <SectionDivider label="Résidentiel" id="residentiel-top" />

      <div className="mx-auto" style={{ maxWidth: "1440px", padding: "0 clamp(24px, 4vw, 64px)" }}>

        {/* ── Row 1: 3 images (Biblio, Chevet, Meuble TV) ── */}
        <div className="grid grid-cols-1 md:grid-cols-[5fr_3fr_3fr] mb-3 md:mb-4" style={{ gap }}>
          <Reveal>
            <div onClick={() => open(0)} className="cursor-pointer">
              <GalleryImage src={IMG.res7} alt="Projet résidentiel" aspect="3/2" mobileAspect="3/2" objectPosition="center" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div onClick={() => open(1)} className="cursor-pointer">
              <GalleryImage src={IMG.res8} alt="Projet résidentiel" aspect="9/10" mobileAspect="3/4" />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div onClick={() => open(2)} className="cursor-pointer">
              <GalleryImage src={IMG.res9} alt="Projet résidentiel" aspect="9/10" mobileAspect="3/4" />
            </div>
          </Reveal>
        </div>

        {/* ── Row 2: 3 portraits égaux ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 mb-3 md:mb-4" style={{ gap }}>
          <Reveal>
            <div onClick={() => open(3)} className="cursor-pointer">
              <GalleryImage src={IMG.res10} alt="Projet résidentiel" aspect="3/4" mobileAspect="4/5" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div onClick={() => open(4)} className="cursor-pointer">
              <GalleryImage src={IMG.res11} alt="Projet résidentiel" aspect="3/4" mobileAspect="4/5" />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div onClick={() => open(5)} className="cursor-pointer">
              <GalleryImage src={IMG.res12} alt="Projet résidentiel" aspect="3/4" mobileAspect="4/5" />
            </div>
          </Reveal>
        </div>

        {/* ── Row 3: 3 photos égales verticales ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 mb-3 md:mb-4" style={{ gap }}>
          <Reveal>
            <div onClick={() => open(6)} className="cursor-pointer">
              <GalleryImage src={IMG.res13} alt="Projet résidentiel" aspect="3/4" mobileAspect="4/3" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div onClick={() => open(7)} className="cursor-pointer">
              <GalleryImage src={IMG.res14} alt="Projet résidentiel" aspect="3/4" mobileAspect="4/3" />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div onClick={() => open(8)} className="cursor-pointer">
              <GalleryImage src={IMG.res15} alt="Projet résidentiel" aspect="3/4" mobileAspect="4/3" />
            </div>
          </Reveal>
        </div>

        {/* ── Row 4: 2 photos 50/50 horizontales ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 mb-3 md:mb-4" style={{ gap }}>
          <Reveal>
            <div onClick={() => open(9)} className="cursor-pointer">
              <GalleryImage src={IMG.res16} alt="Projet résidentiel" aspect="3/2" mobileAspect="4/3" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div onClick={() => open(10)} className="cursor-pointer">
              <GalleryImage src={IMG.res17} alt="Projet résidentiel" aspect="3/2" mobileAspect="4/3" />
            </div>
          </Reveal>
        </div>

        {/* ── Row 5: 3 photos: Étroit - Panoramique - Étroit ── */}
        <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr_3fr] mb-3 md:mb-4" style={{ gap }}>
          <Reveal>
            <div onClick={() => open(11)} className="cursor-pointer">
              <GalleryImage src={IMG.res18jpg} alt="Projet résidentiel" aspect="3/4" mobileAspect="4/3" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div onClick={() => open(12)} className="cursor-pointer">
              <GalleryImage src={IMG.res18png} alt="Projet résidentiel" aspect="1/1" mobileAspect="4/3" />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div onClick={() => open(13)} className="cursor-pointer">
              <GalleryImage src={IMG.res19} alt="Projet résidentiel" aspect="3/4" mobileAspect="4/3" />
            </div>
          </Reveal>
        </div>

        {/* ── Row 6: 1 photo pleine largeur ── */}
        <div className="mb-3 md:mb-4">
          <Reveal>
            <div onClick={() => open(14)} className="cursor-pointer">
              <GalleryImage src={IMG.res21} alt="Projet résidentiel" aspect="21/9" mobileAspect="16/9" />
            </div>
          </Reveal>
        </div>

        {/* ── Row 7: 2 photos: Carré large - Portrait étroit ── */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]" style={{ gap }}>
          <Reveal>
            <div onClick={() => open(15)} className="cursor-pointer">
              <GalleryImage src={IMG.res22} alt="Projet résidentiel" aspect="4/3" mobileAspect="4/3" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div onClick={() => open(16)} className="cursor-pointer">
              <GalleryImage src={IMG.res23} alt="Projet résidentiel" aspect="2/3" mobileAspect="4/3" />
            </div>
          </Reveal>
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox images={allImages} index={lightboxIdx} onClose={() => setLightboxIdx(null)} onNav={setLightboxIdx} />
      )}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   NOS FORCES — Gros chiffres, aligné gauche, accordion
   No section title. Editorial numbered list.
   ══════════════════════════════════════════════════════════════ */
const forces = [
  {
    num: "01",
    title: "HAUT DE GAMME ?",
    text: "De notre point de vue, “haut de gamme” ne rime pas forcément avec prix élevés.\n\nNous accordons la même importance à chaque projet, peu importe sa taille ou sa complexité.\n\nTout est réalisé avec soin !",
  },
  {
    num: "02",
    title: "QUALITÉ ?",
    text: "Aucun compromis n’est fait sur la qualité des matériaux, du travail et des détails de finitions.\n\nDe plus, nos finitions à la laque ou à l’acrylique sont non jaunissantes, solides et durables.\n\nLa qualité existe encore !",
  },
  {
    num: "03",
    title: "TRAVAIL DE PRÉCISION ?",
    text: "Tout est mis en œuvre pour garantir un travail de précision, soutenu par la dextérité acquise par les années d’expériences.\n\nLa prise de mesures est d’une importance capitale pour obtenir le résultat spécifique souhaité.\n\nPas de demi-mesure !",
  },
  {
    num: "04",
    title: "BIEN PENSÉ ?",
    text: "Rien n’est laissé au hasard : chaque détail est réfléchi, chaque étape est maîtrisée.\n\nLe résultat est beau, fonctionnel et conçu pour durer.\n\nVos désirs se concrétisent !",
  },
  {
    num: "05",
    title: "QUEL STYLE ?",
    text: "• Pour les particuliers : votre projet prend vie à travers vos inspirations, vos besoins, vos goûts et votre budget\n\n• Pour les designers et les architectes : nous concrétisons vos idées et votre créativité, tout en respectant votre mandat budgétaire.\n\nTout devient un investissement rentable !",
  },
  {
    num: "06",
    title: "INTERMÉDIAIRES ?",
    text: "Sans intermédiaires ni grossistes, nos réalisations sont vendues directement aux designers aux architectes et aux particuliers.\n\nTout est coordonné et structuré !",
  },
];

function ForceItem({ item, isOpen, onToggle }: { item: typeof forces[0]; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      onClick={onToggle}
      className="cursor-pointer group"
      style={{ borderBottom: `1px solid ${C.line}` }}
    >
      <div className="flex items-center py-6 md:py-10" style={{ gap: "clamp(1rem, 3vw, 3.5rem)" }}>
        <span style={{
          fontFamily: serif,
          fontSize: "clamp(2.5rem, 7vw, 6rem)",
          fontWeight: 300,
          fontStyle: "italic",
          color: C.lineLight,
          minWidth: "clamp(3rem, 9vw, 8rem)",
          transition: "color 0.5s ease",
          lineHeight: 1,
          flexShrink: 0,
        }} className="group-hover:!text-[#C8C3BB]">
          {item.num}
        </span>

        <h3 style={{
          fontFamily: sans,
          fontSize: "clamp(1.1rem, 2.8vw, 2rem)",
          fontWeight: 500,
          color: C.charcoal,
          letterSpacing: "-0.01em",
          flex: 1,
          transition: "letter-spacing 0.4s ease",
        }}>
          {item.title}
        </h3>

        <span style={{
          fontFamily: sans,
          fontSize: "1.6rem",
          fontWeight: 300,
          color: C.faint,
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), color 0.4s ease",
          transform: isOpen ? "rotate(45deg)" : "none",
          lineHeight: 1,
          flexShrink: 0,
        }} className="group-hover:!text-[#7A756D]">
          +
        </span>
      </div>

      <div style={{
        height: `${height}px`,
        overflow: "hidden",
        transition: "height 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
      }}>
        <div ref={contentRef} style={{
          paddingLeft: "clamp(4rem, 12vw, 11.5rem)",
          paddingBottom: "2rem",
          paddingRight: "clamp(1rem, 3vw, 3rem)",
        }}>
          <p style={{
            fontFamily: sans,
            fontSize: "1rem",
            fontWeight: 400,
            color: C.mid,
            lineHeight: 1.8,
            maxWidth: "560px",
            whiteSpace: "pre-line",
          }}>
            {item.text}
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionForces() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section style={{ backgroundColor: C.ivory, padding: "clamp(4rem, 8vw, 8rem) 0" }}>
      <div className="mx-auto" style={{ maxWidth: "1100px", padding: "0 clamp(24px, 4vw, 64px)" }}>
        <div style={{ borderTop: `1px solid ${C.line}` }}>
          {forces.map((f, i) => (
            <Reveal key={f.num} delay={i * 50}>
              <ForceItem
                item={f}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT FORM — Submission form component
   ══════════════════════════════════════════════════════════════ */
const PROJECT_TYPES = [
  "Cuisine sur mesure",
  "Garde-robe / Walk-in",
  "Salle de bain",
  "Mobilier sur mesure",
  "Aménagement commercial",
  "Rénovation complète",
  "Autre",
];

const BUDGET_RANGES = [
  "Moins de 10 000 $",
  "10 000 $ — 25 000 $",
  "25 000 $ — 50 000 $",
  "50 000 $ — 100 000 $",
  "100 000 $ +",
  "À déterminer",
];

const inputStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "0.9rem",
  fontWeight: 400,
  color: "#1C1C1C",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E5E1DA",
  borderRadius: "4px",
  padding: "12px 14px",
  width: "100%",
  outline: "none",
  transition: "border-color 0.3s ease",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#7A756D",
  marginBottom: "8px",
  display: "block",
};

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    budget: "",
    comments: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...newFiles].slice(0, 5)); // max 5 photos
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      // Convert photos to base64 data URLs for sending
      const photoPromises = photos.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      );
      const photoDataUrls = await Promise.all(photoPromises);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          photos: photoDataUrls,
        }),
      });

      if (response.ok) {
        // Meta Pixel: Track Lead event on successful form submission
        try {
          if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
            (window as any).fbq('track', 'Lead', {
              content_name: 'Demande de soumission',
              content_category: formData.projectType || 'Non spécifié',
              value: 0,
              currency: 'CAD'
            });
            console.log('[Meta Pixel] Lead event fired successfully');
          } else {
            console.warn('[Meta Pixel] fbq not available');
          }
        } catch (err) {
          console.error('[Meta Pixel] Error firing Lead event:', err);
        }
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", projectType: "", budget: "", comments: "" });
        setPhotos([]);
      } else {
        const data = await response.json();
        setErrorMsg(data.error || "Erreur lors de l'envoi.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erreur de connexion. Veuillez réessayer.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "2rem 0" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>&#10003;</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 300, fontStyle: "italic", color: "#1C1C1C", marginBottom: "0.8rem" }}>
          Merci pour votre demande!
        </h3>
        <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.9rem", color: "#7A756D", lineHeight: 1.6 }}>
          Nous avons bien reçu votre soumission et vous contacterons dans les plus brefs délais.
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "1.5rem",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#7A756D",
            background: "none",
            border: `1px solid #E5E1DA`,
            borderRadius: "4px",
            padding: "10px 24px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1C1C1C"; e.currentTarget.style.color = "#1C1C1C"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E5E1DA"; e.currentTarget.style.color = "#7A756D"; }}
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      {/* Name */}
      <div>
        <label style={labelStyle}>Nom complet *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Votre nom complet"
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#1C1C1C")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E1DA")}
        />
      </div>

      {/* Phone + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.2rem" }}>
        <div>
          <label style={labelStyle}>Téléphone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="514-000-0000"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#1C1C1C")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E1DA")}
          />
        </div>
        <div>
          <label style={labelStyle}>Courriel *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="votre@courriel.com"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#1C1C1C")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E1DA")}
          />
        </div>
      </div>

      {/* Project Type + Budget row */}
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.2rem" }}>
        <div>
          <label style={labelStyle}>Type de projet</label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            style={{ ...inputStyle, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A756D' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "36px" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#1C1C1C")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E1DA")}
          >
            <option value="">Sélectionnez...</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Budget estimé</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            style={{ ...inputStyle, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A756D' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "36px" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#1C1C1C")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E1DA")}
          >
            <option value="">Sélectionnez...</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Photos */}
      <div>
        <label style={labelStyle}>Photos (optionnel, max 5)</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${C.line}`,
            borderRadius: "4px",
            padding: "1.2rem",
            textAlign: "center",
            cursor: "pointer",
            transition: "border-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.mid)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.line)}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.light} strokeWidth="1.5" style={{ margin: "0 auto 8px" }}>
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          <p style={{ fontFamily: sans, fontSize: "0.85rem", color: C.mid }}>
            Cliquez pour ajouter des photos
          </p>
          <p style={{ fontFamily: sans, fontSize: "0.72rem", color: C.light, marginTop: "4px" }}>
            JPG, PNG, WEBP — max 5 fichiers
          </p>
        </div>
        {photos.length > 0 && (
          <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
            {photos.map((file, i) => (
              <div key={i} style={{ position: "relative", width: "64px", height: "64px", borderRadius: "4px", overflow: "hidden", border: `1px solid ${C.line}` }}>
                <img src={URL.createObjectURL(file)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(28,28,28,0.7)",
                    color: "#fff",
                    border: "none",
                    fontSize: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comments */}
      <div>
        <label style={labelStyle}>Commentaires</label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows={4}
          placeholder="Décrivez votre projet, vos besoins, dimensions, etc."
          style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#1C1C1C")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E1DA")}
        />
      </div>

      {/* Error message */}
      {status === "error" && (
        <p style={{ fontFamily: sans, fontSize: "0.85rem", color: "#c0392b", margin: 0 }}>
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          fontFamily: sans,
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#FFFFFF",
          backgroundColor: C.charcoal,
          border: "none",
          borderRadius: "4px",
          padding: "14px 32px",
          cursor: status === "sending" ? "wait" : "pointer",
          transition: "background-color 0.3s ease, opacity 0.3s ease",
          opacity: status === "sending" ? 0.7 : 1,
          width: "100%",
        }}
        onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.backgroundColor = "#2A2825"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#1C1C1C"; }}
      >
        {status === "sending" ? "Envoi en cours..." : "Envoyer la demande"}
      </button>
    </form>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT — Elegant CTA + Submission Form — Address: 36-999 rue du Collège
   ══════════════════════════════════════════════════════════════ */
function SectionContact() {
  return (
    <section id="contact" style={{ backgroundColor: C.ivory, padding: "clamp(3rem, 6vw, 5rem) 0 clamp(4rem, 8vw, 7rem)" }}>
      <div className="mx-auto" style={{ maxWidth: "1200px", padding: "0 clamp(24px, 4vw, 64px)" }}>
        
        {/* Two-column layout: Left = CTA info, Right = Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "clamp(3rem, 6vw, 5rem)", alignItems: "start" }}>
          
          {/* ── LEFT COLUMN: Existing contact info ── */}
          <div>
            <Reveal>
              <p style={{
                fontFamily: sans,
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: C.light,
                marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
              }}>
                Contact
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h2 style={{
                fontFamily: serif,
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: C.charcoal,
                lineHeight: 1.15,
                marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
              }}>
                Vous avez un projet<br />en tête?
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <a
                href="tel:5148673492"
                className="inline-block group"
                style={{ textDecoration: "none", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                <span style={{
                  fontFamily: sans,
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  fontWeight: 600,
                  color: C.charcoal,
                  borderBottom: `2px solid ${C.charcoal}`,
                  paddingBottom: "6px",
                  transition: "border-color 0.3s ease, color 0.3s ease",
                }}>
                  514-867-3492
                </span>
              </a>
            </Reveal>

            <Reveal delay={250}>
              <a
                href="mailto:michel@maitre-ebeniste.com"
                className="inline-block"
                style={{
                  display: "block",
                  fontFamily: sans,
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  color: C.mid,
                  textDecoration: "none",
                  marginBottom: "clamp(2rem, 4vw, 3rem)",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.charcoal)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.mid)}
              >
                michel@maitre-ebeniste.com
              </a>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vw, 2rem)", borderTop: `1px solid ${C.line}`, paddingTop: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                <div>
                  <p style={{ fontFamily: sans, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: C.light, marginBottom: "10px" }}>
                    Atelier
                  </p>
                  <p style={{ fontFamily: sans, fontSize: "0.92rem", fontWeight: 500, color: C.dark, lineHeight: 1.6 }}>
                    36-999 rue du Collège<br />Montréal
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: sans, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: C.light, marginBottom: "10px" }}>
                    Services
                  </p>
                  <p style={{ fontFamily: sans, fontSize: "0.92rem", fontWeight: 500, color: C.dark, lineHeight: 1.6 }}>
                    Résidentiel & Commercial<br />Particuliers, architectes & designers
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: sans, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: C.light, marginBottom: "10px" }}>
                    Note
                  </p>
                  <p style={{ fontFamily: sans, fontSize: "0.92rem", fontWeight: 500, color: C.dark, lineHeight: 1.6 }}>
                    Tarifs préférentiels<br />pour les membres de l'UDA
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT COLUMN: Contact Form ── */}
          <Reveal delay={200}>
            <div style={{
              backgroundColor: C.white,
              borderRadius: "8px",
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              border: `1px solid ${C.lineLight}`,
            }}>
              <h3 style={{
                fontFamily: serif,
                fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: C.charcoal,
                marginBottom: "0.5rem",
              }}>
                Demande de soumission
              </h3>
              <p style={{
                fontFamily: sans,
                fontSize: "0.82rem",
                color: C.mid,
                marginBottom: "1.5rem",
                lineHeight: 1.5,
              }}>
                Remplissez le formulaire et nous vous contacterons rapidement.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   FOOTER — Minimal, refined
   ══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ backgroundColor: C.ivory, borderTop: `1px solid ${C.lineLight}`, padding: "clamp(1.2rem, 2vw, 2rem) 0" }}>
      <div className="mx-auto flex flex-col sm:flex-row justify-between items-center" style={{ maxWidth: "1440px", padding: "0 clamp(24px, 4vw, 64px)", gap: "0.5rem" }}>
        <span style={{ fontFamily: sans, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: C.dark }}>
          Maître Ébéniste
        </span>
        <p style={{ fontFamily: sans, fontSize: "0.72rem", fontWeight: 400, color: C.light }}>
          © {new Date().getFullYear()} Tous droits réservés
        </p>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOME — Assembled
   Order: Hero → Commercial → Résidentiel → Forces → Contact → Footer
   ══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div style={{ backgroundColor: C.ivory, minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <div id="projets" style={{ height: 0 }} />
      <SectionCommercial />
      <SectionResidentiel />
      <SectionForces />
      <SectionContact />
      <Footer />
    </div>
  );
}
