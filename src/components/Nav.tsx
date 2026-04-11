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
        className={`fixed top-0 left-0 right-0 z-[100] h-16 px-[5%] flex items-center justify-between transition-all duration-300 ease-in-out ${
          scrolled
            ? 'bg-white/97 backdrop-blur-lg border-b border-[#E5E5E5]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#" aria-label="CLEAR – go to top" className="flex flex-col leading-none">
          <span className="font-['Fraunces',_Georgia,_serif] font-bold text-[22px] tracking-tight text-[#0A0A0A]">
            <img src='/logo.png' width={140} alt="CLEAR Logo" />
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-[#555] transition-colors duration-150 ease-in-out hover:text-[#0A0A0A]"
            >
              {label}
            </a>
          ))}
          <a
            href="#prototype"
            className="bg-[#0A0A0A] text-white px-[22px] py-[9px] rounded-md text-[13px] font-semibold tracking-wide transition-colors duration-150 ease-in-out hover:bg-[#333]"
          >
            Try CLEAR
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden bg-transparent border-none text-[#0A0A0A] text-[22px] leading-none p-1 cursor-pointer"
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
          className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center gap-9"
        >
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="absolute top-5 right-6 bg-transparent border-none text-[#888] text-[28px] cursor-pointer"
          >
            ✕
          </button>

          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="font-['Fraunces',_Georgia,_serif] text-3xl font-semibold text-[#0A0A0A]"
            >
              {label}
            </a>
          ))}

          <a
            href="#prototype"
            onClick={closeMenu}
            className="bg-[#0A0A0A] text-white px-10 py-3.5 rounded-lg text-base font-semibold"
          >
            Try CLEAR
          </a>
        </div>
      )}
    </>
  );
}
