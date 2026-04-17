import { useState, useEffect } from "react";

/*
 * ═══════════════════════════════════════════════════════════════
 * LOI 25 — COOKIE CONSENT BANNER
 * Québec privacy law compliance
 * Design: Matches Maître Ébéniste luxury editorial style
 * ═══════════════════════════════════════════════════════════════
 */

const sans = "'DM Sans', system-ui, sans-serif";

const C = {
  ivory: "#F5F3EE",
  white: "#FFFFFF",
  charcoal: "#1C1C1C",
  dark: "#2A2825",
  text: "#3D3A36",
  mid: "#7A756D",
  light: "#A8A29E",
  line: "#E5E1DA",
};

type CookiePreferences = {
  essential: boolean; // always true
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "me_cookie_consent";

function getStoredConsent(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function storeConsent(prefs: CookiePreferences) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      // Small delay so page loads first
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = (prefs: CookiePreferences) => {
    storeConsent(prefs);
    setVisible(false);
  };

  const handleAcceptAll = () => {
    accept({ essential: true, analytics: true, marketing: true });
  };

  const handleEssentialOnly = () => {
    accept({ essential: true, analytics: false, marketing: false });
  };

  const handleSavePrefs = () => {
    accept({ essential: true, analytics, marketing });
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(28,28,28,0.4)",
          zIndex: 9998,
          backdropFilter: "blur(2px)",
          animation: "cookieFadeIn 0.4s ease",
        }}
      />

      {/* Banner */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          fontFamily: sans,
          animation: "cookieSlideUp 0.5s ease",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto 24px",
            background: C.white,
            borderRadius: 12,
            boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            padding: "32px 32px 28px",
            border: `1px solid ${C.line}`,
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.charcoal} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              <circle cx="8.5" cy="8.5" r="1" fill={C.charcoal} />
              <circle cx="12" cy="14" r="1" fill={C.charcoal} />
              <circle cx="16" cy="10" r="1" fill={C.charcoal} />
            </svg>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: C.charcoal,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Respect de votre vie privée
            </h3>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: C.mid,
              margin: "0 0 24px",
            }}
          >
            Conformément à la <strong style={{ color: C.text }}>Loi 25 du Québec</strong>, nous utilisons
            des témoins (cookies) pour améliorer votre expérience de navigation et analyser le trafic de
            notre site. Vous pouvez accepter tous les témoins, personnaliser vos préférences ou n'accepter
            que les témoins essentiels.
          </p>

          {/* Preferences panel */}
          {showPrefs && (
            <div
              style={{
                background: C.ivory,
                borderRadius: 8,
                padding: "20px 24px",
                marginBottom: 24,
                border: `1px solid ${C.line}`,
              }}
            >
              {/* Essential */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>
                    Essentiels
                  </div>
                  <div style={{ fontSize: 12, color: C.light, marginTop: 2 }}>
                    Nécessaires au fonctionnement du site
                  </div>
                </div>
                <Toggle checked={true} disabled />
              </div>

              <div style={{ height: 1, background: C.line, marginBottom: 16 }} />

              {/* Analytics */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>
                    Analytiques
                  </div>
                  <div style={{ fontSize: 12, color: C.light, marginTop: 2 }}>
                    Nous aident à comprendre comment vous utilisez le site
                  </div>
                </div>
                <Toggle checked={analytics} onChange={setAnalytics} />
              </div>

              <div style={{ height: 1, background: C.line, marginBottom: 16 }} />

              {/* Marketing */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>
                    Marketing
                  </div>
                  <div style={{ fontSize: 12, color: C.light, marginTop: 2 }}>
                    Permettent d'afficher des publicités pertinentes
                  </div>
                </div>
                <Toggle checked={marketing} onChange={setMarketing} />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {!showPrefs ? (
              <>
                <button onClick={handleAcceptAll} style={btnPrimary}>
                  Tout accepter
                </button>
                <button onClick={() => setShowPrefs(true)} style={btnSecondary}>
                  Personnaliser
                </button>
                <button onClick={handleEssentialOnly} style={btnTertiary}>
                  Essentiels seulement
                </button>
              </>
            ) : (
              <>
                <button onClick={handleSavePrefs} style={btnPrimary}>
                  Sauvegarder mes préférences
                </button>
                <button onClick={handleAcceptAll} style={btnSecondary}>
                  Tout accepter
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes cookieFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

/* ── Toggle Switch ── */
function Toggle({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        border: "none",
        background: checked ? C.charcoal : C.line,
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 0.2s ease",
        opacity: disabled ? 0.6 : 1,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: C.white,
          position: "absolute",
          top: 3,
          left: checked ? 23 : 3,
          transition: "left 0.2s ease",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        }}
      />
    </button>
  );
}

/* ── Button Styles ── */
const btnBase: React.CSSProperties = {
  fontFamily: sans,
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  padding: "12px 24px",
  transition: "all 0.2s ease",
};

const btnPrimary: React.CSSProperties = {
  ...btnBase,
  background: C.charcoal,
  color: C.white,
};

const btnSecondary: React.CSSProperties = {
  ...btnBase,
  background: "transparent",
  color: C.charcoal,
  border: `1.5px solid ${C.charcoal}`,
};

const btnTertiary: React.CSSProperties = {
  ...btnBase,
  background: "transparent",
  color: C.mid,
  border: `1.5px solid ${C.line}`,
};
