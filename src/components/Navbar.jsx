import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Film, ChevronDown } from 'lucide-react';

const navLinks = [
  {
    label: 'Content',
    children: [
      { label: 'Originals', href: '#originals', desc: 'Feature films & web series' },
      { label: 'Documentaries', href: '#documentaries', desc: 'Long-form non-fiction' },
      { label: 'Impact Films', href: '#impact', desc: 'Purpose-driven storytelling' },
      { label: 'Learning', href: '#learning', desc: 'Educational content' },
      { label: 'FutureLab', href: '#futurelab', desc: 'Experimental & immersive' },
    ],
  },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'About', href: '#about' },
];

const scrollTo = (href) => {
  if (!href) return;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleClick = (href) => {
    setMobileOpen(false);
    setActiveDropdown(null);
    scrollTo(href);
  };

  const isDark = theme === 'dark';

  const navBg = scrolled
    ? isDark
      ? 'bg-gray-950/90 border-b border-white/5 backdrop-blur-xl shadow-lg shadow-black/30'
      : 'bg-white/90 border-b border-black/5 backdrop-blur-xl shadow-sm'
    : 'bg-transparent';

  return (
    <>
      {/* ── Main Nav ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <a
            href="#"
            onClick={() => handleClick(null)}
            className="flex items-center gap-2.5 group"
          >
            <div className="flex items-center justify-center h-30 w-auto transition-all duration-300 group-hover:shadow-emerald-500/50">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <>
                    <button className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
                      {link.label}
                      <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl overflow-hidden transition-all duration-200 origin-top
                      ${activeDropdown === link.label ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
                      ${isDark ? 'bg-gray-900 border border-white/8 shadow-2xl shadow-black/50' : 'bg-white border border-black/6 shadow-xl'}`}>
                      <div className="p-1.5">
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={() => handleClick(child.href)}
                            className={`flex flex-col gap-0.5 px-3 py-2.5 rounded-lg transition-all duration-150 ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                          >
                            <span className={`font-display font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{child.label}</span>
                            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{child.desc}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => handleClick(link.href)}
                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200
                ${isDark ? 'bg-white/5 border border-white/8 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10' : 'bg-gray-100 border border-gray-200 text-gray-500 hover:text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50'}`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a
              href="#contact"
              onClick={() => handleClick('#contact')}
              className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold font-display text-white gradient-bg shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              Work With Us
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className={`lg:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${isDark ? 'bg-white/5 border border-white/8 text-gray-300' : 'bg-gray-100 border border-gray-200 text-gray-700'}`}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <div className={`fixed inset-0 z-40 transition-transform duration-400 lg:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
        ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="pt-24 px-6 pb-10 flex flex-col gap-2 overflow-y-auto h-full">
          {navLinks.map((link) => (
            <div key={link.label} className="mb-2">
              {link.children ? (
                <>
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 px-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{link.label}</p>
                  {link.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      onClick={() => handleClick(child.href)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                    >
                      {child.label}
                    </a>
                  ))}
                </>
              ) : (
                <a
                  href={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-150 ${isDark ? 'text-white hover:bg-white/5' : 'text-gray-900 hover:bg-gray-50'}`}
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}
          <a
            href="#contact"
            onClick={() => handleClick('#contact')}
            className="mt-4 py-3.5 rounded-full text-center text-sm font-bold font-display text-white gradient-bg shadow-lg shadow-emerald-500/30"
          >
            Work With Us
          </a>
        </div>
      </div>
    </>
  );
}
