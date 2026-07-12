import { Film, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

/* Inline SVGs for social icons not available in this lucide-react version */
const LinkedinIcon  = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const YoutubeIcon   = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const XIcon         = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LINKS = {
  Company: [
    { label: 'About GLAREPOST', href: '#about'      },
    { label: 'Our Philosophy',  href: '#philosophy'  },
    { label: 'Leadership',      href: '#about'       },
    { label: 'Careers',         href: '#contact'     },
    { label: 'Press Kit',       href: '#contact'     },
  ],
  Content: [
    { label: 'Originals',     href: '#originals'     },
    { label: 'Documentaries', href: '#documentaries' },
    { label: 'Impact Films',  href: '#impact'        },
    { label: 'Learning',      href: '#learning'      },
    { label: 'FutureLab',     href: '#futurelab'     },
  ],
  Partner: [
    { label: 'Work With Us',       href: '#contact' },
    { label: 'Commissioning',      href: '#contact' },
    { label: 'CSR & NGOs',         href: '#contact' },
    { label: 'International Co-Prod', href: '#contact' },
    { label: 'Distribution',       href: '#contact' },
  ],
};

const SOCIALS = [
  { icon: <LinkedinIcon  />, label: 'LinkedIn',  href: '#' },
  { icon: <YoutubeIcon   />, label: 'YouTube',   href: '#' },
  { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
  { icon: <XIcon         />, label: 'X',         href: '#' },
];

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer({ theme }) {
  const isDark = theme === 'dark';

  return (
    <footer id="contact" className={`border-t ${isDark ? 'bg-gray-950 border-white/6' : 'bg-gray-50 border-gray-200'}`}>

      {/* CTA Band */}
      <div className={`border-b ${isDark ? 'border-white/6' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <h2 className={`font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Ready to tell a story
                <br className="hidden sm:block" />
                that <span className="gradient-text">changes the world?</span>
              </h2>
              <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Whether you're a broadcaster, a corporation, a government, or a visionary — we'd love to create something remarkable with you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
              <a
                href="mailto:hello@glarepost.com"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-display font-bold text-sm text-white gradient-bg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Mail size={16} />
                hello@glarepost.com
              </a>
              <a
                href="tel:+911234567890"
                className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-display font-semibold text-sm border transition-all duration-200 hover:-translate-y-0.5
                  ${isDark ? 'text-gray-300 border-white/12 hover:border-white/25' : 'text-gray-700 border-gray-200 hover:border-gray-300 bg-white'}`}
              >
                <Phone size={16} />
                +91 12345 67890
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center text-white">
                <Film size={16} />
              </div>
              <span className={`font-display font-extrabold text-lg tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>GLAREPOST</span>
            </a>
            <p className={`text-sm leading-relaxed mb-6 max-w-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              India's first cinematic storytelling studio dedicated to sustainability, technology, innovation, and the future.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200
                    ${isDark ? 'bg-white/4 border-white/8 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10' : 'bg-white border-gray-200 text-gray-500 hover:text-emerald-600 hover:border-emerald-300'}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Address */}
            <div className={`flex items-start gap-2.5 mt-6 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              <MapPin size={13} className="flex-shrink-0 mt-0.5" />
              <span>Mumbai · Delhi · Bengaluru · India</span>
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className={`font-display font-bold text-xs uppercase tracking-widest mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{heading}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                      className={`text-sm flex items-center gap-1 group transition-colors duration-150 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      {link.label}
                      <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            © 2025 GLAREPOST Studios Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map(t => (
              <a key={t} href="#" className={`text-xs transition-colors duration-150 ${isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
