import { useState, useCallback } from 'react';
import { useScrolled } from '../hooks/useScrolled';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
] as const;

export function Nav(): React.ReactElement {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 64,
          padding: '0 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid #E5E5E5' : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        {/* Logo */}
        <a href="#" aria-label="CLEAR – go to top" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: '-0.01em',
              color: '#0A0A0A',
            }}
          >
           <img src='/logo.png' width={140}/>
          </span>
          {/* <span style={{ fontSize: 10, color: '#888', fontWeight: 400, letterSpacing: '0.06em' }}>
            by BHSS
          </span> */}
        </a>

        {/* Desktop links */}
        <div
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: 32 }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: '#555',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#0A0A0A')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#555')}
            >
              {label}
            </a>
          ))}
          <a
            href="#prototype"
            style={{
              background: '#0A0A0A',
              color: '#fff',
              padding: '9px 22px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.02em',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = '#333')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = '#0A0A0A')}
          >
            Try CLEAR
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-nav-toggle"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#0A0A0A',
            fontSize: 22,
            lineHeight: 1,
            padding: 4,
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: 'fixed',
            inset: 0,
            background: '#fff',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
          }}
        >
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            style={{
              position: 'absolute',
              top: 20,
              right: 24,
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: 28,
            }}
          >
            ✕
          </button>

          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 30,
                fontWeight: 600,
                color: '#0A0A0A',
              }}
            >
              {label}
            </a>
          ))}

          <a
            href="#prototype"
            onClick={closeMenu}
            style={{
              background: '#0A0A0A',
              color: '#fff',
              padding: '14px 40px',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Try CLEAR
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}
