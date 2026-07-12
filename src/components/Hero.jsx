import { useEffect, useRef, useState } from 'react';
import { Play, Leaf, Award, Globe, Video, ArrowRight, Shield, Target, HelpCircle, Activity, Heart, Sparkles, Cpu, Waves, Zap } from 'lucide-react';
import { CONTENT_CATEGORIES } from '../utils/contentData';
import sustainabilityHero from '../assets/sustainability_hero.png';

/* ── Particle Canvas Background ── */
function ParticleCanvas({ theme }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const mouse     = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const isDark = theme === 'dark';
    const pColor = isDark ? 'rgba(16,185,129,' : 'rgba(5,150,105,';
    const lColor = isDark ? 'rgba(99,102,241,' : 'rgba(79,70,229,';

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const makeParticles = () => {
      particles = [];
      const n = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 80);
      for (let i = 0; i < n; i++) {
        particles.push({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r:  Math.random() * 2 + 1,
          o:  Math.random() * 0.35 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouse.current;

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        if (mx && my) {
          const dx = mx - p.x, dy = my - p.y;
          const d  = Math.hypot(dx, dy);
          if (d < 120) { p.x -= dx * 0.008; p.y -= dy * 0.008; }
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${pColor}${p.o})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `${lColor}${(1 - d / 130) * 0.15})`;
            ctx.lineWidth   = 0.7;
            ctx.stroke();
          }
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: null, y: null }; };

    resize(); makeParticles(); draw();
    const ro = new ResizeObserver(() => { resize(); makeParticles(); });
    ro.observe(canvas);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
    />
  );
}

/* ── Rotating Subject Text ── */
const PHRASES = [
  'Electric Mobility', 'Renewable Energy', 'Artificial Intelligence',
  'Space Exploration', 'Climate Resilience', 'Biotechnology',
  'Ocean Conservation', 'Human Ingenuity'
];

function RotatingText({ theme }) {
  const [idx, setIdx]   = useState(0);
  const [out, setOut]   = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const t = setInterval(() => {
      setOut(true);
      setTimeout(() => { setIdx(i => (i + 1) % PHRASES.length); setOut(false); }, 500);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      className={`inline-block font-bold min-w-[210px] sm:min-w-[280px] transition-all duration-500
        ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}
      style={{ opacity: out ? 0 : 1, transform: out ? 'translateY(6px)' : 'translateY(0)' }}
    >
      {PHRASES[idx]}
    </span>
  );
}

/* ── Stats Card ── */
function StatsCard({ icon, value, label, theme }) {
  const isDark = theme === 'dark';
  return (
    <div className={`flex items-center gap-3.5 p-4.5 rounded-2xl border flex-grow sm:flex-grow-0
      ${isDark 
        ? 'bg-white/3 border-white/5 hover:border-emerald-500/20 hover:bg-emerald-500/5' 
        : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100 hover:border-emerald-300 hover:shadow-md'} transition-all duration-300`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center
        ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
        {icon}
      </div>
      <div>
        <div className={`font-display font-extrabold text-lg sm:text-xl leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {value}
        </div>
        <div className={`text-[10px] font-bold uppercase tracking-wider mt-1.5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
          {label}
        </div>
      </div>
    </div>
  );
}

/* ── Interactive Vector Core (Hero Right Graphic) ── */
function InteractiveVectorCore({ theme }) {
  const [offsets, setOffsets] = useState({ x: 0, y: 0 });
  const isDark = theme === 'dark';

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20; // 3D tilt calculation
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setOffsets({ x, y });
  };

  const handleMouseLeave = () => {
    setOffsets({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative w-full max-w-[460px] aspect-square flex items-center justify-center cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background soft glow */}
      <div className={`absolute inset-6 rounded-full blur-3xl opacity-35 transition-all duration-500 group-hover:scale-110
        ${isDark ? 'bg-gradient-to-tr from-emerald-500 to-indigo-600' : 'bg-gradient-to-tr from-emerald-400 to-indigo-500'}`} />

      {/* Glassmorphic card frame with 3D Tilt */}
      <div 
        style={{ 
          transform: `perspective(1000px) rotateX(${-offsets.y}deg) rotateY(${offsets.x}deg) scale3d(1.02, 1.02, 1.02)`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d'
        }}
        className={`relative w-full h-full rounded-[2.5rem] overflow-hidden border p-4 backdrop-blur-md flex items-center justify-center
          ${isDark 
            ? 'bg-gray-900/60 border-white/10 hover:border-emerald-500/30' 
            : 'bg-white/60 border-slate-200 hover:border-emerald-400/40 shadow-2xl shadow-slate-200/50'}`}
      >
        <img 
          src={sustainabilityHero} 
          alt="Cinematic Sustainability" 
          className="w-full h-full object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-105"
        />

        {/* Dynamic overlay border */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none group-hover:border-emerald-500/20 transition-colors duration-300" />
      </div>
    </div>
  );
}

/* ── Focus Sector Component ── */
function FocusCard({ title, desc, iconSvg, accentClass, bgGradient, theme }) {
  const isDark = theme === 'dark';
  return (
    <div className={`relative p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden group
      ${isDark 
        ? 'bg-gray-900/40 border-white/6 hover:border-emerald-500/30 hover:shadow-emerald-500/5' 
        : 'bg-white border-slate-200/80 shadow-md shadow-slate-100 hover:border-emerald-400/40 hover:shadow-emerald-500/5'}`}>
      
      {/* Background colored ambient spot */}
      <div className={`absolute -right-20 -top-20 w-44 h-44 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 ${bgGradient}`} />

      {/* Interactive animated SVG Container */}
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-white/5 mb-8 group-hover:scale-110 transition-transform duration-500">
        {iconSvg}
      </div>

      <h3 className={`font-display font-extrabold text-xl sm:text-2xl mb-4 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h3>
      
      <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
        {desc}
      </p>

      {/* Bottom glowing line on hover */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${accentClass} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </div>
  );
}

/* ── Sustainability Dashboard Circular Metric Component ── */
function MetricGauge({ label, value, subtext, percentage, strokeGradId, color, theme }) {
  const [offset, setOffset] = useState(251.2); // Circumference for r=40 is 2*pi*40 = 251.2
  const isDark = theme === 'dark';
  const circleRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Calculate stroke offset
        const progress = percentage / 100;
        const strokeOffset = 251.2 - (progress * 251.2);
        setTimeout(() => setOffset(strokeOffset), 200);
      }
    }, { threshold: 0.1 });
    
    if (circleRef.current) obs.observe(circleRef.current);
    return () => obs.disconnect();
  }, [percentage]);

  return (
    <div className={`flex flex-col items-center p-6 rounded-3xl border text-center relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:shadow-lg
      ${isDark ? 'bg-white/3 border-white/5 hover:bg-white/5' : 'bg-white border-slate-200/80 hover:border-slate-300'}`}>
      
      {/* Circle Graph */}
      <div className="relative w-28 h-28 flex items-center justify-center mb-5" ref={circleRef}>
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="40" fill="transparent" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="6" />
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="transparent" 
            stroke={color} 
            strokeWidth="7" 
            strokeDasharray="251.2" 
            strokeDashoffset={offset} 
            strokeLinecap="round" 
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className={`absolute font-display font-extrabold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {percentage}%
        </div>
      </div>

      <div className={`font-display font-extrabold text-2xl sm:text-3xl leading-none mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {value}
      </div>
      <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
        {label}
      </div>
      <p className={`text-[11px] leading-normal ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
        {subtext}
      </p>
    </div>
  );
}

/* ── Hero Component ── */
export default function Hero({ onPlayVideo, theme }) {
  const isDark = theme === 'dark';
  const revealRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    revealRef.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [theme]);

  const triggerShowreel = () => {
    if (onPlayVideo) {
      onPlayVideo({
        youtubeId: 'scVjgI2p02M',
        title: 'GLAREPOST Showreel',
        tagline: 'Experience GLAREPOST in 4K',
        desc: 'Experience the visual language and cinematic quality of India’s first cinematic sustainability studio in this compiled 4K preview.',
        type: 'Showreel',
        year: '2026',
        duration: '2 min',
        category: 'Showreel'
      });
    }
  };

  // Pull top 4 featured products for Spotlight Carousel
  const spotlightItems = [
    { ...CONTENT_CATEGORIES.originals.items[0], color: 'from-violet-600 to-indigo-700' }, // Neural Nation
    { ...CONTENT_CATEGORIES.documentaries.items[1], color: 'from-emerald-500 to-teal-700' }, // Solar Surge
    { ...CONTENT_CATEGORIES.impact.items[0], color: 'from-amber-500 to-orange-700' }, // Carbon Zero
    { ...CONTENT_CATEGORIES.originals.items[4], color: 'from-indigo-600 to-blue-700' } // Deep Blue
  ];

  return (
    <div ref={revealRef} className="overflow-hidden">
      {/* ── Section 1: Redesigned Hero Section ── */}
      <section id="home" className="relative min-h-[calc(100vh-4rem)] lg:min-h-screen flex items-center justify-center overflow-hidden py-24 lg:py-32">
        {/* Ambient background grids/glowing spots */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{
          background: isDark
            ? 'radial-gradient(circle at 10% 20%, rgba(16,185,129,0.09) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(99,102,241,0.09) 0%, transparent 40%)'
            : 'radial-gradient(circle at 10% 20%, rgba(16,185,129,0.04) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(99,102,241,0.04) 0%, transparent 40%)'
        }} />
        <div className={`absolute inset-0 pointer-events-none z-0 opacity-[0.02] dark:opacity-[0.03]`} style={{
          backgroundImage: `radial-gradient(${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} />

        {/* Dynamic canvas particles */}
        <ParticleCanvas theme={theme} />

        {/* Content Layout Grid */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Typography & Actions (col-span-7) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Badge with live wave pulse */}
              <div 
                className={`inline-flex items-center gap-3.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest rounded-full px-5 py-2.5 border w-fit shadow-sm
                  ${isDark 
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                    : 'text-emerald-700 bg-emerald-50 border-emerald-200'}`}
                style={{ animation: 'fadeInUp 0.7s ease both' }}
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                India's First Cinematic Sustainability Studio
              </div>

              {/* Main Header */}
              <div className="space-y-4" style={{ animation: 'fadeInUp 0.8s 0.1s ease both' }}>
                <h1 className={`font-display font-extrabold leading-[1.08] text-4xl sm:text-5xl md:text-6xl xl:text-7xl tracking-tight
                  ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Stories That<br />
                  <span className="gradient-text animate-pulse" style={{ animationDuration: '6s' }}>Shape the Future</span>
                </h1>
                
                <p className={`font-display text-lg sm:text-xl md:text-2xl font-medium tracking-wide
                  ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  We tell the stories of&nbsp;<RotatingText theme={theme} />
                </p>
              </div>

              {/* Description */}
              <p className={`text-sm sm:text-base leading-relaxed max-w-xl
                ${isDark ? 'text-gray-400' : 'text-slate-600'}`}
                style={{ animation: 'fadeInUp 0.9s 0.2s ease both' }}
              >
                GLAREPOST combines state-of-the-art cinematic technology with environmental science to create award-winning documentaries, feature films, and impact series that move audiences worldwide.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4" style={{ animation: 'fadeInUp 1s 0.3s ease both' }}>
                <button
                  id="showreel-btn"
                  onClick={triggerShowreel}
                  className={`flex items-center gap-3.5 rounded-full pr-7 pl-2.5 py-2.5 border transition-all duration-300 hover:-translate-y-0.5 group
                    ${isDark
                      ? 'bg-white/5 border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-500/10'}`}
                >
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-105">
                    <Play size={16} fill="white" className="ml-0.5" />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className={`font-display font-bold text-xs sm:text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Watch Showreel</span>
                    <span className={`text-[10px] mt-0.5 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>2 min · 4K HDR</span>
                  </div>
                </button>

                <a
                  href="#spotlight"
                  className={`px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold font-display border transition-all duration-300 hover:-translate-y-0.5
                    ${isDark 
                      ? 'text-gray-300 border-white/12 hover:text-white hover:border-white/25 hover:bg-white/5' 
                      : 'text-slate-700 border-slate-200 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  Explore Catalog
                </a>
              </div>

              {/* Glass Stats Grid */}
              <div className="flex flex-wrap items-center gap-4 pt-4" style={{ animation: 'fadeInUp 1.1s 0.4s ease both' }}>
                <StatsCard icon={<Video size={18} />} value="50+" label="Productions" theme={theme} />
                <StatsCard icon={<Globe size={18} />} value="12+" label="Countries" theme={theme} />
                <StatsCard icon={<Award size={18} />} value="100%" label="Green Set Certified" theme={theme} />
              </div>
            </div>

            {/* Right Column: Custom Interactive Vector Core (col-span-5) */}
            <div 
              className="lg:col-span-5 flex justify-center lg:justify-end" 
              style={{ animation: 'fadeInUp 1.1s 0.2s ease both' }}
            >
              <InteractiveVectorCore theme={theme} />
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 z-20 pointer-events-none">
          <span className="text-[9px] uppercase tracking-widest font-extrabold">Scroll Down</span>
          <div className={`w-5 h-8.5 rounded-full border-2 flex justify-center py-1.5 ${isDark ? 'border-white/15' : 'border-slate-300'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Section 2: Interactive Focus Sectors ── */}
      <section className={`py-20 lg:py-28 border-y ${isDark ? 'bg-gray-900/10 border-white/5' : 'bg-slate-50/50 border-slate-200/60'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          
          <div className="reveal text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
              Impact Areas
            </span>
            <h2 className={`font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mt-4 mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Cinematic Focus Sectors
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              We merge high-definition visual storytelling with deep subject expertise to explain, educate, and drive change across three primary fields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FocusCard 
              title="Clean Tech & Energy"
              desc="Profiling the innovators building smart grids, EV gigafactories, coastal wind power networks, and advanced solar infrastructures shaping a carbon-neutral future."
              iconSvg={
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-emerald-500 dark:text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" className="animate-pulse" />
                </svg>
              }
              accentClass="from-emerald-400 to-emerald-600"
              bgGradient="bg-emerald-500"
              theme={theme}
            />

            <FocusCard 
              title="AI & Deep Technology"
              desc="Exploring the physical realities of data centers, command centers, and automation that power neural networks, smart cities, and next-generation space exploration."
              iconSvg={
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-indigo-500 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="4" />
                  <path d="M7 12h10" />
                  <path d="M12 7v10" />
                  <circle cx="12" cy="12" r="2" className="animate-ping" style={{ animationDuration: '3s' }} />
                </svg>
              }
              accentClass="from-indigo-400 to-indigo-600"
              bgGradient="bg-indigo-500"
              theme={theme}
            />

            <FocusCard 
              title="Ocean Ecology & Science"
              desc="Documenting the oceanic ecosystems, marine biology conservation efforts, water resource management, and climate adaptations along the coastal belts of India."
              iconSvg={
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3M18 12h3M12 3v3M12 18v3" />
                  <path d="M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
                  <path d="M12 8a4 4 0 0 1 4 4" className="animate-spin" style={{ animationDuration: '6s', transformOrigin: '12px 12px' }} />
                </svg>
              }
              accentClass="from-blue-400 to-blue-600"
              bgGradient="bg-blue-500"
              theme={theme}
            />
          </div>

        </div>
      </section>

      {/* ── Section 3: Green Set Production Dashboard ── */}
      <section className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: isDark
            ? 'radial-gradient(circle at 80% 50%, rgba(16,185,129,0.06) 0%, transparent 50%)'
            : 'radial-gradient(circle at 80% 50%, rgba(16,185,129,0.03) 0%, transparent 50%)'
        }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Dashboard Text description (col-span-5) */}
            <div className="reveal lg:col-span-5 space-y-6 text-left">
              <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-700'}`}>
                Studio Analytics
              </span>
              <h2 className={`font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                The Green Set Standard
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                We practice what we showcase. Every single production set we operate adheres strictly to eco-filming guidelines—balancing high-fidelity creativity with responsible resource allocations.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                    <Zap size={18} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Zero Fossil Fuels</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Operating sets on reusable solar generator arrays.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                    <Cpu size={18} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Circular Offsets</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Planting verified native saplings to cover crew transport footprints.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Gauges Grid (col-span-7) */}
            <div className="reveal lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <MetricGauge 
                label="Solar Powered" 
                value="9.8 KWh" 
                subtext="Average solar power runtime per shooting session." 
                percentage={88}
                color="#10b981"
                theme={theme}
              />
              <MetricGauge 
                label="Carbon Offset" 
                value="24.8 T" 
                subtext="Verified carbon offset via community afforestation." 
                percentage={100}
                color="#6366f1"
                theme={theme}
              />
              <MetricGauge 
                label="Waste Reclaimed" 
                value="0 Single-use" 
                subtext="Complete exclusion of non-compostable plastics." 
                percentage={94}
                color="#3b82f6"
                theme={theme}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 4: Production Spotlight Carousel ── */}
      <section id="spotlight" className={`py-20 lg:py-28 border-t ${isDark ? 'bg-gray-950 border-white/5' : 'bg-slate-50 border-slate-200/60'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <div className="max-w-xl text-left space-y-3">
              <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-700'}`}>
                Spotlight
              </span>
              <h2 className={`font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Featured Productions
              </h2>
            </div>
            
            <a 
              href="#content"
              className={`inline-flex items-center gap-2 text-sm font-bold mt-4 md:mt-0 group transition-all duration-300
                ${isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-700 hover:text-emerald-800'}`}
            >
              Explore Full Catalog
              <ArrowRight size={16} className="transform group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>

          {/* Cards Grid */}
          <div className="reveal grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {spotlightItems.map((item, idx) => (
              <div 
                key={item.title}
                onClick={() => onPlayVideo(item)}
                className={`relative group rounded-3xl overflow-hidden cursor-pointer aspect-[3/4] border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-end p-6 text-left
                  ${isDark 
                    ? 'bg-gray-900/40 border-white/8 hover:border-emerald-500/35 hover:shadow-emerald-500/5' 
                    : 'bg-white border-slate-200 hover:border-emerald-400/40 hover:shadow-emerald-500/5'}`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {/* Background YouTube thumbnail */}
                <img 
                  src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

                {/* Corner Sparkle indicator */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play size={10} fill="white" className="text-white ml-0.5" />
                </div>

                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/15 text-white backdrop-blur-md">
                      {item.type}
                    </span>
                    <span className="text-[10px] text-gray-300 font-bold">{item.year}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-gray-300 leading-normal line-clamp-2">
                    {item.tagline}
                  </p>

                  <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px] font-bold">
                      {item.director[0]}
                    </div>
                    <span className="text-[10px] text-gray-300 font-medium">Dir: {item.director}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
