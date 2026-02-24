import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { Link } from "wouter";

/*
 * ═══════════════════════════════════════════════════════════════
 * MAÎTRE ÉBÉNISTE — PORTFOLIO PAGE
 * Same design system as Home: DM Sans + Cormorant Garamond
 * Updated: 6 new commercial photos, removed escalier/bureau/rangement/chevet1
 * Added vanite1/vanite2
 * ═══════════════════════════════════════════════════════════════
 */

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

const IMG = {
  // Commercial — 6 NEW photos (no name/address)
  comm1: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/AXJIyTfTDcDdTVsB.png",
  comm2: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/VTywzyQWiAJtgMMc.png",
  comm3: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/OfbsrRcEExFNGlsq.png",
  comm4: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/vHtMNCQSMMRkUEGQ.png",
  comm5: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/zrlVVgccneNsfCgB.png",
  comm6: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/UMAYnIrxXfpQURtm.png",

  // Résidentiel — same as Home.tsx reference layout
  biblio: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/LgnhrYmfoGBJBhIt.png",
  armoire: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/BSEotDKyUDJdBYiF.png",
  cuisineBlanche: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/OEhHtwZDFEwyfZpU.png",
  gardeRobe1: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/CAEJzrpFyTlgyfZi.png",
  walkIn: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/HREAtdpAePAJMQOz.png",
  dressing: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/drGstnnAQbqLhkrl.png",
  salon: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/fPsHmkFJGxdGXMqM.png",
  meubleTV: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/LIiYKaAqzgAuBpRV.png",
  chevet2: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/sSvMYZAaBuOycltU.png",
  new1: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/OScJMRZiorNhHIXY.png",
  new2: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/ygfqjObHGYAvZMBa.png",
  new3: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/ZdMCtMRVoXesACNv.png",
  vanite1: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/iDRmvThqREfRAmMu.png",
  vanite2: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/wCZHMvOgMsrJKYoo.png",
  escalierEtageres: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/bCdXtffbfHssIaCk.png",
  armoireBlanche: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/EnZzeMjXEZJKdfnC.png",
  gardeRobeMiroir: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/CiipnuUHTaBedPUN.png",
  armoireRangement: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/qhfYhHsBXrmKaOEM.png",
  sdbBoisPierre: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/mdDOtVqMMNYQKgLJ.jpg",
  sdbModerne: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/hLVxJfecdUdmuziu.jpg",
  res7898: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/xYKmofZFuBJCItTK.png",
  res8785: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/hEHeiigbWCnKLUSG.png",
  res3E55: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/ACouNRULXsdAhKAP.png",
  res7FC2: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/JwqDIItwUngpcEOc.png",
  res56F7: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/UDpvPLdLAZLZXreq.png",
  resEF48: "https://files.manuscdn.com/user_upload_by_module/session_file/104907534/WAeUELtrlTBHPlCV.png",
};

/* ── Reveal ── */
function Reveal({ children, className = "", delay = 0, y = 24 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
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
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ── Gallery Image ── */
function GalleryImg({ src, alt = "", aspect = "4/3", mobileAspect, onClick, objectPosition = "center" }: { src: string; alt?: string; aspect?: string; mobileAspect?: string; onClick: () => void; objectPosition?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const currentAspect = (isMobile && mobileAspect) ? mobileAspect : aspect;
  return (
    <div className="relative overflow-hidden cursor-pointer group" style={{ aspectRatio: currentAspect, backgroundColor: C.lineLight }} onClick={onClick}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-[1.2s] ease-out group-hover:scale-[1.04]"
        style={{ opacity: loaded ? 1 : 0, objectPosition }}
      />
    </div>
  );
}

/* ── Lightbox ── */
type LightboxState = { images: string[]; index: number } | null;

function Lightbox({ state, onClose, onNext, onPrev }: { state: LightboxState; onClose: () => void; onNext: () => void; onPrev: () => void }) {
  useEffect(() => {
    if (!state) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", fn);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", fn); };
  }, [state, onClose, onNext, onPrev]);

  if (!state) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: "rgba(28,28,28,0.92)", backdropFilter: "blur(20px)" }} onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-12 h-12 flex items-center justify-center" style={{ color: "#fff" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
      {state.index > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center" style={{ color: "#fff" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      {state.index < state.images.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center" style={{ color: "#fff" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      )}
      <img src={state.images[state.index]} alt="" className="max-w-[95vw] md:max-w-[90vw] max-h-[80vh] md:max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} style={{ animation: "lbFade 0.3s ease" }} />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2" style={{ fontFamily: sans, fontSize: "0.8rem", fontWeight: 400, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>
        {state.index + 1} / {state.images.length}
      </div>
      <style>{`@keyframes lbFade { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   NAVBAR
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
    { label: "Accueil", href: "/" },
    { label: "Nos Forces", href: "/#forces" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{
      backgroundColor: "rgba(245,243,238,0.95)",
      backdropFilter: "blur(24px)",
      borderBottom: scrolled ? `1px solid ${C.lineLight}` : "1px solid transparent",
    }}>
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
            <a key={l.label} href={l.href} style={{
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
            <span className="block h-[1.5px] transition-all duration-400" style={{ backgroundColor: C.charcoal, width: menuOpen ? "20px" : "24px", transform: menuOpen ? "rotate(45deg) translateY(3.25px)" : "none" }} />
            <span className="block h-[1.5px] transition-all duration-400" style={{ backgroundColor: C.charcoal, width: menuOpen ? "20px" : "18px", transform: menuOpen ? "rotate(-45deg) translateY(-3.25px)" : "none" }} />
          </div>
        </button>
      </div>
      <div className="md:hidden overflow-hidden transition-all duration-500" style={{ maxHeight: menuOpen ? "400px" : "0", backgroundColor: C.ivory, borderTop: menuOpen ? `1px solid ${C.lineLight}` : "none" }}>
        <div className="flex flex-col" style={{ padding: "2rem clamp(24px, 4vw, 64px)" }}>
          {links.map((l, i) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: sans, fontSize: "1rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: C.charcoal, textDecoration: "none", padding: "1rem 0",
              borderBottom: i < links.length - 1 ? `1px solid ${C.lineLight}` : "none",
            }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ── Section Divider ── */
function SectionDivider({ label }: { label: string }) {
  return (
    <Reveal>
      <div className="flex items-center" style={{ gap: "1.5rem", marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
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
    </Reveal>
  );
}

/* ── Footer ── */
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
   PORTFOLIO PAGE — Full gallery with all projects
   ══════════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [lb, setLb] = useState<LightboxState>(null);

  // All images for lightbox navigation
  const commercialImages = [IMG.comm1, IMG.comm2, IMG.comm3, IMG.comm4, IMG.comm5, IMG.comm6];
  const residentialImages = [
    IMG.biblio, IMG.armoire, IMG.gardeRobe1,
    IMG.dressing, IMG.new1, IMG.new2,
    IMG.salon, IMG.cuisineBlanche, IMG.walkIn,
    IMG.meubleTV, IMG.chevet2, IMG.new3,
    IMG.vanite1, IMG.vanite2,
  ];
  const allImages = [...commercialImages, ...residentialImages];

  const openLb = useCallback((src: string) => {
    const idx = allImages.indexOf(src);
    setLb({ images: allImages, index: idx >= 0 ? idx : 0 });
  }, []);

  const nextLb = useCallback(() => {
    setLb((prev) => prev ? { ...prev, index: Math.min(prev.index + 1, prev.images.length - 1) } : null);
  }, []);

  const prevLb = useCallback(() => {
    setLb((prev) => prev ? { ...prev, index: Math.max(prev.index - 1, 0) } : null);
  }, []);

  const closeLb = useCallback(() => setLb(null), []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const gap = "clamp(8px, 1vw, 16px)";
  const mb = "mb-2 md:mb-3";

  return (
    <div style={{ backgroundColor: C.ivory, minHeight: "100vh" }}>
      <Navbar />
      <div style={{ height: "80px" }} />

      {/* Page header */}
      <div className="mx-auto" style={{ maxWidth: "1440px", padding: "clamp(2rem, 4vw, 4rem) clamp(24px, 4vw, 64px) clamp(3rem, 6vw, 5rem)" }}>
        <Reveal>
          <p style={{
            fontFamily: sans,
            fontSize: "0.68rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: C.light,
            marginBottom: "clamp(1rem, 2vw, 1.5rem)",
          }}>
            Portfolio
          </p>
          <h1 style={{
            fontFamily: serif,
            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: C.charcoal,
            lineHeight: 1.05,
          }}>
            Nos réalisations
          </h1>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════════════════════
         COMMERCIAL — 6 photos, EXACT reference layout
         ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto" style={{ maxWidth: "1440px", padding: "0 clamp(24px, 4vw, 64px)", marginBottom: "clamp(4rem, 8vw, 7rem)" }}>
        <SectionDivider label="Commercial" />

        {/* Row 1: comm1 (col-span-3, 4/3) + comm2/comm3 stacked (col-span-2, 16/9) */}
        <div className={`grid grid-cols-1 md:grid-cols-5 ${mb}`} style={{ gap }}>
          <Reveal className="md:col-span-3">
            <GalleryImg src={IMG.comm1} alt="Projet commercial" aspect="4/3" onClick={() => openLb(IMG.comm1)} />
          </Reveal>
          <div className="md:col-span-2 grid grid-rows-2" style={{ gap }}>
            <Reveal delay={120}>
              <GalleryImg src={IMG.comm2} alt="Projet commercial" aspect="16/9" onClick={() => openLb(IMG.comm2)} />
            </Reveal>
            <Reveal delay={200}>
              <GalleryImg src={IMG.comm3} alt="Projet commercial" aspect="16/9" onClick={() => openLb(IMG.comm3)} />
            </Reveal>
          </div>
        </div>

        {/* Row 2: comm4 + comm5 + comm6 — 3 columns, 3/2 landscape */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap }}>
          <Reveal delay={100}>
            <GalleryImg src={IMG.comm4} alt="Projet commercial" aspect="3/2" onClick={() => openLb(IMG.comm4)} />
          </Reveal>
          <Reveal delay={200}>
            <GalleryImg src={IMG.comm5} alt="Projet commercial" aspect="3/2" onClick={() => openLb(IMG.comm5)} />
          </Reveal>
          <Reveal delay={300}>
            <GalleryImg src={IMG.comm6} alt="Projet commercial" aspect="3/2" onClick={() => openLb(IMG.comm6)} />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         RÉSIDENTIEL — 7 photos, clean layout
         ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto" style={{ maxWidth: "1440px", padding: "0 clamp(24px, 4vw, 64px)", marginBottom: "clamp(4rem, 8vw, 7rem)" }}>
        <SectionDivider label="Résidentiel" />

        {/* Row 1: biblio (portrait) + salon (landscape) */}
        <div className={`grid grid-cols-1 md:grid-cols-5 ${mb}`} style={{ gap }}>
          <Reveal className="md:col-span-2">
            <GalleryImg src={IMG.biblio} alt="Bibliothèque" aspect="3/4" mobileAspect="4/3" onClick={() => openLb(IMG.biblio)} objectPosition="center top" />
          </Reveal>
          <Reveal delay={100} className="md:col-span-3">
            <GalleryImg src={IMG.salon} alt="Meuble TV salon" aspect="4/3" onClick={() => openLb(IMG.salon)} />
          </Reveal>
        </div>

        {/* Row 2: escalierEtageres — full width */}
        <div className={mb}>
          <Reveal>
            <GalleryImg src={IMG.escalierEtageres} alt="Escalier et étagères" aspect="21/9" mobileAspect="16/9" onClick={() => openLb(IMG.escalierEtageres)} />
          </Reveal>
        </div>

        {/* Row 3: 3 portraits */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 ${mb}`} style={{ gap }}>
          <Reveal>
            <GalleryImg src={IMG.armoireBlanche} alt="Armoire blanche" aspect="3/4" mobileAspect="4/5" onClick={() => openLb(IMG.armoireBlanche)} />
          </Reveal>
          <Reveal delay={100}>
            <GalleryImg src={IMG.gardeRobeMiroir} alt="Garde-robe miroir" aspect="3/4" mobileAspect="4/5" onClick={() => openLb(IMG.gardeRobeMiroir)} />
          </Reveal>
          <Reveal delay={200}>
            <GalleryImg src={IMG.armoireRangement} alt="Armoire rangement" aspect="3/4" mobileAspect="4/5" onClick={() => openLb(IMG.armoireRangement)} />
          </Reveal>
        </div>

        {/* Row 4: walkIn + vanite2 + vanite1 */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 ${mb}`} style={{ gap }}>
          <Reveal>
            <GalleryImg src={IMG.walkIn} alt="Walk-in" aspect="4/3" onClick={() => openLb(IMG.walkIn)} />
          </Reveal>
          <Reveal delay={100}>
            <GalleryImg src={IMG.vanite2} alt="Vanité" aspect="4/3" onClick={() => openLb(IMG.vanite2)} />
          </Reveal>
          <Reveal delay={200}>
            <GalleryImg src={IMG.vanite1} alt="Vanité" aspect="4/3" onClick={() => openLb(IMG.vanite1)} />
          </Reveal>
        </div>

        {/* Row 5: res7898 (portrait) + res8785 (landscape) */}
        <div className={`grid grid-cols-2 md:grid-cols-5 ${mb}`} style={{ gap }}>
          <Reveal className="col-span-1 md:col-span-2">
            <GalleryImg src={IMG.res7898} alt="Projet résidentiel" aspect="2/3" mobileAspect="4/5" onClick={() => openLb(IMG.res7898)} />
          </Reveal>
          <Reveal delay={100} className="col-span-1 md:col-span-3">
            <GalleryImg src={IMG.res8785} alt="Projet résidentiel" aspect="3/2" onClick={() => openLb(IMG.res8785)} />
          </Reveal>
        </div>

        {/* Row 6: res3E55 (portrait) + res7FC2 (landscape) */}
        <div className={`grid grid-cols-2 md:grid-cols-5 ${mb}`} style={{ gap }}>
          <Reveal className="col-span-1 md:col-span-2">
            <GalleryImg src={IMG.res3E55} alt="Projet résidentiel" aspect="2/3" mobileAspect="4/5" onClick={() => openLb(IMG.res3E55)} />
          </Reveal>
          <Reveal delay={100} className="col-span-1 md:col-span-3">
            <GalleryImg src={IMG.res7FC2} alt="Projet résidentiel" aspect="3/2" onClick={() => openLb(IMG.res7FC2)} />
          </Reveal>
        </div>

        {/* Row 7: sdbBoisPierre (portrait) + sdbModerne (landscape) */}
        <div className={`grid grid-cols-2 md:grid-cols-5 ${mb}`} style={{ gap }}>
          <Reveal className="col-span-1 md:col-span-2">
            <GalleryImg src={IMG.sdbBoisPierre} alt="Salle de bain" aspect="3/4" mobileAspect="4/5" onClick={() => openLb(IMG.sdbBoisPierre)} />
          </Reveal>
          <Reveal delay={100} className="col-span-1 md:col-span-3">
            <GalleryImg src={IMG.sdbModerne} alt="Salle de bain" aspect="4/3" onClick={() => openLb(IMG.sdbModerne)} />
          </Reveal>
        </div>

        {/* Row 8: res56F7 (portrait) + resEF48 (landscape) */}
        <div className="grid grid-cols-2 md:grid-cols-5" style={{ gap }}>
          <Reveal className="col-span-1 md:col-span-2">
            <GalleryImg src={IMG.res56F7} alt="Projet résidentiel" aspect="2/3" mobileAspect="4/5" onClick={() => openLb(IMG.res56F7)} />
          </Reveal>
          <Reveal delay={100} className="col-span-1 md:col-span-3">
            <GalleryImg src={IMG.resEF48} alt="Projet résidentiel" aspect="3/2" onClick={() => openLb(IMG.resEF48)} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto" style={{ maxWidth: "900px", padding: "clamp(2rem, 4vw, 4rem) clamp(24px, 4vw, 64px) clamp(4rem, 8vw, 7rem)" }}>
        <Reveal>
          <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: "clamp(2rem, 4vw, 3.5rem)" }}>
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
            <a
              href="tel:5148673492"
              className="inline-block"
              style={{
                fontFamily: sans,
                fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                fontWeight: 600,
                color: C.charcoal,
                textDecoration: "none",
                borderBottom: `2px solid ${C.charcoal}`,
                paddingBottom: "6px",
              }}
            >
              514-867-3492
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
      <Lightbox state={lb} onClose={closeLb} onNext={nextLb} onPrev={prevLb} />
    </div>
  );
}
