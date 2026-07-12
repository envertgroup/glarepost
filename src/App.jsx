import { useState, useEffect } from 'react';
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import Verticals      from './components/Verticals';
import Showcase       from './components/Showcase';
import BrandPhilosophy from './components/BrandPhilosophy';
import ShowreelModal  from './components/ShowreelModal';
import Footer         from './components/Footer';

export default function App() {
  const [theme,     setTheme    ] = useState('dark');
  const [showreel,  setShowreel ] = useState(false);

  // Persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem('glarepost-theme');
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);

  const toggleTheme = () => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark';
      localStorage.setItem('glarepost-theme', next);
      return next;
    });
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'}`}
      data-theme={theme}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero onShowreel={() => setShowreel(true)} theme={theme} />
        <Verticals      theme={theme} />
        <Showcase       theme={theme} />
        <BrandPhilosophy theme={theme} />
      </main>

      <Footer theme={theme} />

      <ShowreelModal
        open={showreel}
        onClose={() => setShowreel(false)}
        theme={theme}
      />
    </div>
  );
}
