import { useState, useEffect, useRef } from "react";

/* ─── Google Fonts injected at runtime ─── */
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ─── Inline global styles ─── */
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg:        #ffffff;
      --surface:   #f5f5f5;
      --surface2:  #ebebeb;
      --border:    #d0d0d0;
      --gold:      #111111;
      --gold-light:#333333;
      --text:      #111111;
      --muted:     #666666;
      --accent:    #444444;
    }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-weight: 400;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    .serif { font-family: 'Playfair Display', Georgia, serif; }

    /* fade-up animation */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { opacity: 0; animation: fadeUp 0.7s ease forwards; }
    .delay-1 { animation-delay: 0.15s; }
    .delay-2 { animation-delay: 0.30s; }
    .delay-3 { animation-delay: 0.45s; }
    .delay-4 { animation-delay: 0.60s; }
    .delay-5 { animation-delay: 0.75s; }

    /* scroll-reveal handled via IntersectionObserver */
    .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    a { color: inherit; text-decoration: none; }
    button { cursor: pointer; }
  `}</style>
);

/* ─── Scroll reveal hook ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ══════════════════════════════════════
   NAV
══════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "What It Does", "How It Works", "Use Cases"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 5%",
      background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.3s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, background: "#111111",
          borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 14, color: "#ffffff" }}>C</span>
        </div>
        <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 18, letterSpacing: "0.04em" }}>CLEAR</span>
      </div>

      {/* Desktop links */}
      <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
            style={{ fontSize: 14, color: "var(--muted)", fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "var(--text)"}
            onMouseLeave={e => e.target.style.color = "var(--muted)"}
          >{l}</a>
        ))}
        <a href="#prototype" style={{
          background: "#111111", color: "#ffffff",
          padding: "8px 20px", borderRadius: 6, fontSize: 13, fontWeight: 600,
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.target.style.background = "#333333"}
          onMouseLeave={e => e.target.style.background = "#111111"}
        >Try Prototype</a>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setOpen(!open)} style={{
        display: "none", background: "none", border: "none",
        color: "var(--text)", fontSize: 22, lineHeight: 1,
      }} className="hamburger">☰</button>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, background: "var(--bg)",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 32, zIndex: 200,
        }}>
          <button onClick={() => setOpen(false)} style={{
            position: "absolute", top: 20, right: 24,
            background: "none", border: "none", color: "var(--muted)", fontSize: 28,
          }}>✕</button>
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setOpen(false)}
              style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700 }}
            >{l}</a>
          ))}
          <a href="#prototype" onClick={() => setOpen(false)} style={{
            background: "#111111", color: "#ffffff",
            padding: "12px 32px", borderRadius: 8, fontSize: 16, fontWeight: 600,
          }}>Try Prototype</a>
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
function Hero() {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "120px 5% 80px",
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Background texture */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,0,0,0.04) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 80% 80%, rgba(0,0,0,0.03) 0%, transparent 60%)
        `,
      }} />

      {/* Decorative line */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 1, height: 120, background: "linear-gradient(to bottom, transparent, #111111)",
        zIndex: 1,
      }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto" }}>
        {/* Badge */}
        <div className="fade-up" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          border: "1px solid var(--border)", borderRadius: 100,
          padding: "6px 16px", marginBottom: 36, fontSize: 12,
          color: "#111111", fontWeight: 500, letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#111111", display: "inline-block" }} />
          An AI Advocacy Companion by BHSS
        </div>

        {/* Headline */}
        <h1 className="fade-up delay-1 serif" style={{
          fontSize: "clamp(52px, 9vw, 96px)",
          fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.02em",
          marginBottom: 28,
        }}>
          <span style={{ display: "block" }}>CLEAR</span>
          <span style={{ display: "block", fontStyle: "italic", color: "#444444", fontSize: "0.55em", fontWeight: 700, marginTop: 4 }}>
            Navigate. Understand. Act.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="fade-up delay-2" style={{
          fontSize: "clamp(15px, 2vw, 18px)", color: "var(--muted)",
          maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.7,
        }}>
          A simple prototype designed to help you find the right words, understand your rights, and take action — especially in moments where you feel unheard.
        </p>

        {/* CTAs */}
        <div className="fade-up delay-3" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#prototype" style={{
            background: "#111111", color: "#ffffff",
            padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 700,
            display: "inline-flex", alignItems: "center", gap: 8,
            transition: "all 0.2s", boxShadow: "0 0 0 0 rgba(0,0,0,0.15)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#333333"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#111111"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 0 0 rgba(0,0,0,0.15)"; }}
          >
            Try the Prototype <span>→</span>
          </a>
          <a href="#prototype" style={{
            border: "1px solid var(--border)", color: "var(--muted)",
            padding: "14px 32px", borderRadius: 8, fontSize: 15, fontWeight: 500,
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#111111"; e.currentTarget.style.color = "#111111"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
          >
            Join Waitlist
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="fade-up delay-5" style={{ marginTop: 72, color: "var(--muted)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <div style={{ width: 1, height: 40, background: "var(--border)", margin: "0 auto 12px" }} />
          Scroll
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   CORE MESSAGE / QUOTE BANNER
══════════════════════════════════════ */
function QuoteBanner() {
  return (
    <section style={{
      padding: "72px 5%",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      background: "#111111",
    }}>
      <div className="reveal" style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        <p style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(22px, 4vw, 38px)",
          fontWeight: 700, fontStyle: "italic",
          lineHeight: 1.3, color: "#ffffff",
          marginBottom: 20,
        }}>
          "Nuh let people tek yuh fi eddiat!"
        </p>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>
          Know your rights · Understand your options · Take action
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   ABOUT / WHY THIS EXISTS
══════════════════════════════════════ */
function About() {
  return (
    <section id="about" style={{ padding: "100px 5%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        {/* Left: text */}
        <div className="reveal">
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#111111", fontWeight: 600 }}>About BHSS</span>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.15, margin: "16px 0 24px" }}>
            Built for communities that have been overlooked
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 }}>
            BHSS is a community-led organisation focused on addressing health and public service inequalities affecting Black communities.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.8 }}>
            We combine research, advocacy, and practical tools to help people navigate systems that are often complex, inconsistent, or unresponsive.
          </p>
        </div>

        {/* Right: problem statement */}
        <div className="reveal" style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 16, padding: "40px 36px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: "linear-gradient(to right, #111111, #666666)",
          }} />
          <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, lineHeight: 1.3 }}>
            Why CLEAR exists
          </h3>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 }}>
            Too many people leave appointments, meetings, and services unheard — not because they don't know what's wrong, but because they don't always have the language, structure, or confidence to explain it clearly.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.8 }}>
            Systems respond to hidden processes and inside rules. People are often overlooked. CLEAR changes that.
          </p>
        </div>

        <style>{`
          @media (max-width: 768px) {
            #about > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   WHAT CLEAR DOES
══════════════════════════════════════ */
function WhatItDoes() {
  const features = [
    { icon: "⚖️", title: "Understand your rights", desc: "Get plain-language explanations of your rights in any situation — health, housing, work, or public services." },
    { icon: "🔍", title: "Break down complexity", desc: "Complex situations become clear, structured, and manageable steps you can actually act on." },
    { icon: "💬", title: "Find the right words", desc: "Get suggested language tailored to your real conversations — what to say, how to say it, when to say it." },
    { icon: "🚀", title: "Take practical next steps", desc: "Move from confusion to action. CLEAR gives you the questions to ask and the steps to take." },
  ];

  return (
    <section id="what-it-does" style={{ padding: "100px 5%", background: "var(--surface)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 64, maxWidth: 540 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#111111", fontWeight: 600 }}>What CLEAR Does</span>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.15, margin: "16px 0 16px" }}>
            Designed for everyday moments, not theory
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            CLEAR is built to support you when you need it most — in real situations, with real stakes.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} className="reveal" style={{
              background: "#ffffff", border: "1px solid var(--border)",
              borderRadius: 12, padding: "32px 28px",
              transition: "all 0.25s ease",
              cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#111111"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════ */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Ask", desc: "Describe your situation in your own words — no formal language needed. Just tell CLEAR what's happening." },
    { num: "02", title: "Understand", desc: "Receive clear, structured guidance that breaks down your situation and explains what you're dealing with." },
    { num: "03", title: "Act", desc: "Use suggested language, key questions, or next steps to move forward with confidence." },
  ];

  return (
    <section id="how-it-works" style={{ padding: "100px 5%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 64, textAlign: "center" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#111111", fontWeight: 600 }}>How It Works</span>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.15, margin: "16px 0 0" }}>
            Three steps to clarity
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, position: "relative" }}>
          {steps.map((s, i) => (
            <div key={i} className="reveal" style={{ position: "relative", padding: "0 40px 0 0" }}>
              {/* Connector line */}
              {i < 2 && (
                <div style={{
                  position: "absolute", top: 28, right: 0, width: "100%",
                  height: 1, background: "linear-gradient(to right, var(--border), transparent)",
                  zIndex: 0,
                }} />
              )}
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                border: "2px solid #111111",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 28, position: "relative", zIndex: 1,
                background: "#ffffff",
              }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 15, color: "#111111" }}>{s.num}</span>
              </div>
              <h3 className="serif" style={{ fontSize: 26, fontWeight: 700, marginBottom: 14 }}>{s.title}</h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: 15 }}>{s.desc}</p>
            </div>
          ))}

          <style>{`
            @media (max-width: 768px) {
              #how-it-works > div > div:last-child { 
                grid-template-columns: 1fr !important;
                gap: 48px !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   USE CASES
══════════════════════════════════════ */
function UseCases() {
  const [active, setActive] = useState(0);

  const cases = [
    {
      tag: "Healthcare",
      icon: "🏥",
      scenario: '"I\'ve been to the GP multiple times and feel like I\'m not being taken seriously."',
      helps: [
        "Structure what to say in the next appointment",
        "Suggest key questions to ask your doctor",
        "Help explain symptoms more clearly",
        "Prepare you for if you need to escalate",
      ],
    },
    {
      tag: "Workplace",
      icon: "💼",
      scenario: '"I\'ve raised concerns about racist comments at work, but my manager keeps dismissing or downplaying the situation."',
      helps: [
        "Break down what's happening and identify the issue clearly",
        "Explain your rights and your employer's responsibilities",
        "Suggest how to respond in a clear, structured way",
        "Provide language for a follow-up email or formal complaint",
        "Help you prepare for the next conversation or escalation",
      ],
    },
    {
      tag: "Housing",
      icon: "🏠",
      scenario: '"My landlord hasn\'t responded to maintenance requests for months and I don\'t know what to do."',
      helps: [
        "Clarify what your landlord is legally required to do",
        "Draft a formal written request for repairs",
        "Outline escalation routes if they remain unresponsive",
        "Help you document the situation properly",
      ],
    },
  ];

  const c = cases[active];

  return (
    <section id="use-cases" style={{ padding: "100px 5%", background: "var(--surface)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 52 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#111111", fontWeight: 600 }}>Use Cases</span>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.15, margin: "16px 0 0" }}>
            Anywhere you need to be heard
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="reveal" style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
          {cases.map((c, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              padding: "10px 22px", borderRadius: 100, fontSize: 13, fontWeight: 600,
              border: "1px solid",
              borderColor: active === i ? "#111111" : "var(--border)",
              background: active === i ? "#111111" : "transparent",
              color: active === i ? "#ffffff" : "var(--muted)",
              transition: "all 0.2s",
            }}>
              {c.icon} {c.tag}
            </button>
          ))}
        </div>

        {/* Case card */}
        <div className="reveal" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32,
          background: "#ffffff", border: "1px solid var(--border)",
          borderRadius: 16, padding: "40px 36px", overflow: "hidden",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
            background: "linear-gradient(to bottom, #111111, #666666)",
          }} />

          <div>
            <p style={{ fontSize: 11, color: "#111111", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
              The situation
            </p>
            <p className="serif" style={{ fontSize: "clamp(16px, 2.2vw, 22px)", fontStyle: "italic", lineHeight: 1.55, color: "var(--text)" }}>
              {c.scenario}
            </p>
          </div>

          <div>
            <p style={{ fontSize: 11, color: "#111111", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
              CLEAR helps you
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {c.helps.map((h, i) => (
                <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
                  <span style={{ color: "#111111", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <style>{`
            @media (max-width: 640px) {
              #use-cases .reveal > div { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   PROTOTYPE / CTA SECTION
══════════════════════════════════════ */
function PrototypeSection() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (email || feedback) setSent(true);
  };

  return (
    <section id="prototype" style={{ padding: "100px 5%" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <div className="reveal" style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 20, padding: "56px 48px", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 0,
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,0,0,0.03) 0%, transparent 70%)",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Early access badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.15)",
              borderRadius: 100, padding: "4px 14px", marginBottom: 28,
              fontSize: 11, color: "#111111", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#111111", display: "inline-block", animation: "pulse 2s infinite" }} />
              Early-Stage Prototype
            </div>

            <h2 className="serif" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
              Shape what CLEAR becomes
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 36, fontSize: 15 }}>
              This is an early prototype — currently in design. It exists to explore what's useful, what's missing, and how it should develop. We are actively seeking feedback from the community.
            </p>

            {!sent ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <input
                  type="email" placeholder="Your email address"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={{
                    background: "#ffffff", border: "1px solid var(--border)",
                    borderRadius: 8, padding: "14px 18px", color: "var(--text)",
                    fontSize: 14, outline: "none", width: "100%",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#111111"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"}
                />
                <textarea
                  placeholder="What would you like CLEAR to help you with?"
                  value={feedback} onChange={e => setFeedback(e.target.value)}
                  rows={3}
                  style={{
                    background: "#ffffff", border: "1px solid var(--border)",
                    borderRadius: 8, padding: "14px 18px", color: "var(--text)",
                    fontSize: 14, outline: "none", width: "100%", resize: "vertical",
                    fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#111111"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"}
                />
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button onClick={handleSubmit} style={{
                    flex: 1, background: "#111111", color: "#ffffff",
                    padding: "14px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                    border: "none", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => e.target.style.background = "#333333"}
                    onMouseLeave={e => e.target.style.background = "#111111"}
                  >
                    Join Waitlist & Give Feedback
                  </button>
                  <button onClick={handleSubmit} style={{
                    flex: 1, background: "transparent", color: "var(--muted)",
                    padding: "14px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                    border: "1px solid var(--border)", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = "#111111"; e.target.style.color = "#111111"; }}
                    onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--muted)"; }}
                  >
                    Try Prototype →
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.15)",
                borderRadius: 12, padding: "28px 24px",
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>🎉</div>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Thank you!</h3>
                <p style={{ color: "var(--muted)", fontSize: 14 }}>Your feedback helps shape CLEAR. We'll be in touch soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "48px 5%",
      background: "#111111",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 32, flexWrap: "wrap", marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, background: "#ffffff",
                borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: 14, color: "#111111" }}>C</span>
              </div>
              <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 18, color: "#ffffff" }}>CLEAR</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, maxWidth: 280, lineHeight: 1.7 }}>
              An AI advocacy companion by BHSS — helping communities navigate systems with clarity and confidence.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              { head: "Product", links: ["About BHSS", "What It Does", "How It Works", "Use Cases"] },
              { head: "Get Involved", links: ["Try Prototype", "Join Waitlist", "Give Feedback"] },
            ].map((col) => (
              <div key={col.head}>
                <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontWeight: 600, marginBottom: 16 }}>{col.head}</p>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 10, transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#ffffff"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                  >{l}</a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
            © 2025 BHSS. Created for the Caribbean Health Exhibition.
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, maxWidth: 460, lineHeight: 1.6, textAlign: "right" }}>
            CLEAR is a prototype guidance tool and does not replace legal or medical advice. If your situation is urgent, seek appropriate professional support.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════
   APP
══════════════════════════════════════ */
export default function App() {
  useReveal();

  return (
    <>
      <FontLoader />
      <GlobalStyles />
      <Nav />
      <main>
        <Hero />
        <QuoteBanner />
        <About />
        <WhatItDoes />
        <HowItWorks />
        <UseCases />
        <PrototypeSection />
      </main>
      <Footer />
    </>
  );
}
