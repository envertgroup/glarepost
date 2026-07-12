import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Content', href: '#content' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'About', href: '#about' },
];

export default function Navbar({ theme, toggleTheme, activeHash }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleClick = (href) => {
    setMobileOpen(false);
    if (href) {
      window.location.hash = href;
    }
  };

  const isDark = theme === 'dark';

  const isActive = (href) => {
    if (href === '#home') {
      return activeHash === '#home' || activeHash === '' || activeHash === '#';
    }
    return activeHash?.startsWith(href);
  };

  const navBg = scrolled
    ? isDark
      ? 'bg-gray-950/80 border-b border-white/5 backdrop-blur-xl shadow-lg shadow-black/40'
      : 'bg-white/80 border-b border-black/5 backdrop-blur-xl shadow-md shadow-gray-100/30'
    : 'bg-transparent';

  return (
    <>
      {/* ── Main Nav ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleClick('#home'); }}
            className="flex items-center group"
          >
            <img
              src="/logo.jpeg"
              alt="GLAREPOST"
              className="h-10 w-auto rounded-none transition-all duration-300 group-hover:scale-105 shadow-md shadow-black/10"
            />
          </a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  className={`block px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 relative group
                    ${isActive(link.href)
                      ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10'
                      : isDark
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  {link.label}
                  <span className={`absolute bottom-1.5 left-5 right-5 h-0.5 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 ${isActive(link.href) ? 'scale-x-100' : ''}`} />
                </a>
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border
                ${isDark 
                  ? 'bg-white/5 border-white/8 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/5' 
                  : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-sm'}`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a
              href="mailto:hello@glarepost.com"
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-display text-white gradient-bg shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Work With Us
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border
                ${isDark 
                  ? 'bg-white/5 border-white/8 text-gray-300 hover:bg-white/10' 
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div className={`fixed inset-0 z-40 transition-all duration-400 lg:hidden flex flex-col justify-between
        ${mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
        ${isDark ? 'bg-gray-950/98 backdrop-blur-2xl' : 'bg-white/98 backdrop-blur-2xl'}`}>
        
        {/* Mobile menu content container */}
        <div className="pt-24 px-6 pb-8 flex flex-col gap-3 overflow-y-auto">
          <div className={`text-[10px] font-bold uppercase tracking-widest px-4 mb-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            Navigation
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
              className={`block px-5 py-3.5 rounded-2xl text-base font-semibold tracking-wide transition-all duration-200
                ${isActive(link.href)
                  ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 border-l-2 border-emerald-500'
                  : isDark
                    ? 'text-white hover:bg-white/5'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile CTA at bottom */}
        <div className="p-6 border-t dark:border-white/5 border-gray-100 bg-transparent">
          <a
            href="mailto:hello@glarepost.com"
            className="block py-4 rounded-full text-center text-sm font-bold font-display text-white gradient-bg shadow-lg shadow-emerald-500/30 transition-transform duration-300 active:scale-98"
          >
            Work With Us
          </a>
        </div>
      </div>
    </>
  );
}
