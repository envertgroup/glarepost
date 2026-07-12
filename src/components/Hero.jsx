import { useEffect, useRef, useState } from 'react';
import { Play, ArrowDown, Zap, Globe, Leaf } from 'lucide-react';
import { smoothScrollTo } from '../utils/scroll';

/* ── Particle Canvas ── */
function ParticleCanvas({ theme }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const mouse     = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const isDark     = theme === 'dark';
    const pColor     = isDark ? 'rgba(16,185,129,' : 'rgba(5,150,105,';
    const lColor     = isDark ? 'rgba(99,102,241,' : 'rgba(79,70,229,';

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const makeParticles = () => {
      particles = [];
      const n = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 90);
      for (let i = 0; i < n; i++) {
        particles.push({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          r:  Math.random() * 2 + 1,
          o:  Math.random() * 0.5 + 0.2,
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
          if (d < 110) { p.x -= dx * 0.015; p.y -= dy * 0.015; }
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
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `${lColor}${(1 - d / 120) * 0.3})`;
            ctx.lineWidth   = 1;
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
      className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
    />
  );
}

/* ── Rotating Subject Text ── */
const PHRASES = [
  'Electric Mobility', 'Renewable Energy', 'Artificial Intelligence',
  'Space Exploration', 'Climate Resilience', 'Biotechnology',
  'Smart Cities', 'Ocean Science', 'Human Achievement',
];

function RotatingText() {
  const [idx, setIdx]   = useState(0);
  const [out, setOut]   = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setOut(true);
      setTimeout(() => { setIdx(i => (i + 1) % PHRASES.length); setOut(false); }, 600);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      className="inline-block text-indigo-400 font-bold min-w-[220px] sm:min-w-[290px] transition-all duration-500"
      style={{ opacity: out ? 0 : 1, transform: out ? 'translateY(8px)' : 'translateY(0)' }}
    >
      {PHRASES[idx]}
    </span>
  );
}

/* ── Stat Item ── */
function StatItem({ value, label }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-display font-extrabold text-2xl sm:text-3xl gradient-text leading-none">{value}</span>
      <span className="text-[11px] font-medium uppercase tracking-widest text-gray-500">{label}</span>
    </div>
  );
}

/* ── Hero ── */
export default function Hero({ onShowreel, theme }) {
  const isDark = theme === 'dark';

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16">

      {/* BG Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero_bg.png')" }}
      />

      {/* Overlay */}
      <div className={`absolute inset-0 z-0 ${
        isDark
          ? 'bg-gradient-to-br from-gray-950/90 via-gray-950/78 to-gray-950/90'
          : 'bg-gradient-to-br from-white/88 via-white/72 to-white/88'
      }`} />

      {/* Canvas */}
      <ParticleCanvas theme={theme} />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-28 sm:pb-32">

        {/* Badge */}
        <div className={`inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-2 mb-6 sm:mb-8 border
          ${isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-emerald-600 bg-emerald-50 border-emerald-200'}`}
          style={{ animation: 'fadeInUp 0.8s ease both' }}
        >
          <Leaf size={11} />
          India's First Cinematic Sustainability Studio
        </div>

        {/* Title */}
        <h1
          className={`font-display font-extrabold leading-[1.07] mb-5 sm:mb-7 max-w-3xl
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
            ${isDark ? 'text-white' : 'text-gray-900'}`}
          style={{ animation: 'fadeInUp 0.9s 0.1s ease both' }}
        >
          Stories That<br />
          <span className="gradient-text">Shape the Future</span>
        </h1>

        {/* Tagline */}
        <p
          className={`font-display text-lg sm:text-xl md:text-2xl font-medium mb-4 sm:mb-5
            ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
          style={{ animation: 'fadeInUp 1s 0.2s ease both' }}
        >
          We tell the stories of&nbsp;<RotatingText />
        </p>

        {/* Description */}
        <p
          className={`text-sm sm:text-base leading-relaxed max-w-xl mb-8 sm:mb-10
            ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          style={{ animation: 'fadeInUp 1s 0.3s ease both' }}
        >
          GLAREPOST creates documentaries, feature films, and original content
          that inform, inspire, and entertain audiences around the world.
        </p>

        {/* Stats */}
        <div
          className="flex flex-wrap items-center gap-6 sm:gap-10 mb-8 sm:mb-10"
          style={{ animation: 'fadeInUp 1s 0.4s ease both' }}
        >
          <StatItem value="50+" label="Productions" />
          <div className={`hidden sm:block w-px h-8 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
          <StatItem value="12+" label="Countries" />
          <div className={`hidden sm:block w-px h-8 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
          <StatItem value="5"   label="Verticals"  />
        </div>

        {/* CTA row */}
        <div
          className="flex flex-wrap items-center gap-3 sm:gap-4"
          style={{ animation: 'fadeInUp 1s 0.5s ease both' }}
        >
          {/* Play button */}
          <button
            id="showreel-btn"
            onClick={onShowreel}
            className={`flex items-center gap-3.5 rounded-full pr-5 pl-2 py-2 border transition-all duration-300 hover:-translate-y-0.5 group
              ${isDark
                ? 'bg-white/5 border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20'
                : 'bg-white border-gray-200 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/15'}`}
          >
            <div className="w-11 h-11 rounded-full gradient-bg flex items-center justify-center text-white shadow-lg shadow-emerald-500/30"
              style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
              <Play size={18} fill="white" />
            </div>
            <div className="flex flex-col items-start">
              <span className={`font-display font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Watch Showreel</span>
              <span className="text-[11px] text-gray-500 tracking-wide">2 min · 4K</span>
            </div>
          </button>

          <button
            onClick={() => smoothScrollTo('#showcase')}
            className={`px-6 py-3 rounded-full text-sm font-semibold font-display border transition-all duration-200 hover:-translate-y-0.5
              ${isDark ? 'text-gray-300 border-white/12 hover:text-white hover:border-white/25' : 'text-gray-700 border-gray-200 hover:text-gray-900 hover:border-gray-300'}`}
          >
            Explore Work
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => smoothScrollTo('#showcase')}
        aria-label="Scroll down"
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 hover:text-emerald-400 hover:border-emerald-500/50
          ${isDark ? 'bg-white/5 border-white/10 text-gray-400 backdrop-blur-sm' : 'bg-white/70 border-gray-200 text-gray-500 backdrop-blur-sm'}`}
        style={{ animation: 'float 2.5s ease-in-out infinite' }}
      >
        <ArrowDown size={17} />
      </button>
    </section>
  );
}
