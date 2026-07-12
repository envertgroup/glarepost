import { useEffect, useRef } from 'react';
import {
  Aperture, Compass, FlaskConical, GraduationCap, Zap,
  ChevronRight,
} from 'lucide-react';

const VERTICALS = [
  {
    id: 'originals',
    icon: <Aperture size={22} />,
    tag: 'Originals',
    title: 'Feature Films & Web Series',
    desc: 'Bold, cinematic storytelling for streaming platforms and theatrical release. We develop original IP that blends entertainment with purpose — showing how innovation and sustainability are reshaping Indian life.',
    color: 'from-violet-500 to-indigo-600',
    glow: 'shadow-indigo-500/25',
    accent: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    examples: ['Electric India (Series)', 'The Inventor (Feature)', 'Deep Blue (Docuseries)'],
  },
  {
    id: 'documentaries',
    icon: <Compass size={22} />,
    tag: 'Documentaries',
    title: 'Long-Form Non-Fiction',
    desc: 'Rigorous, visually stunning documentaries on electric mobility, renewable energy, climate, deep tech, and manufacturing — told with the craft of a feature film and the depth of journalism.',
    color: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/25',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    examples: ['Solar Surge', 'Zero Mile', 'The Battery Race'],
  },
  {
    id: 'impact',
    icon: <Zap size={22} />,
    tag: 'Impact',
    title: 'Films for Change',
    desc: 'Purpose-driven productions for governments, PSEs, NGOs, and CSR initiatives. We combine cinematic quality with social impact goals — films that drive awareness, shift behaviour, and inspire action.',
    color: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/25',
    accent: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    examples: ['Clean Air Delhi', 'Mission Green', 'Water Stories'],
  },
  {
    id: 'learning',
    icon: <GraduationCap size={22} />,
    tag: 'Learning',
    title: 'Education & Knowledge',
    desc: 'High-quality educational films and institutional content for universities, research institutions, and corporate training programmes. We make complex science compelling and accessible.',
    color: 'from-sky-500 to-blue-600',
    glow: 'shadow-sky-500/25',
    accent: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    examples: ['ISRO Science Series', 'EV Tech 101', 'IIT Research Profiles'],
  },
  {
    id: 'futurelab',
    icon: <FlaskConical size={22} />,
    tag: 'FutureLab',
    title: 'Experimental & Immersive',
    desc: 'Our R&D wing. AI-generated storytelling, virtual production, immersive 360° experiences, and interactive narratives. We push the boundaries of what cinema can be.',
    color: 'from-pink-500 to-rose-600',
    glow: 'shadow-pink-500/25',
    accent: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    examples: ['VR: Inside the Sun', 'AI Shorts Lab', 'Holo-Docs'],
  },
];

function VerticalCard({ v, theme, delay }) {
  const isDark = theme === 'dark';
  return (
    <div
      className={`reveal group relative rounded-2xl border p-6 sm:p-7 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-default
        ${isDark ? `bg-gray-900/60 ${v.border} hover:shadow-2xl ${v.glow} backdrop-blur-sm` : `bg-white ${v.border} border shadow-sm hover:shadow-xl ${v.glow}`}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Gradient top bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${v.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Icon */}
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${v.bg} ${v.accent} border ${v.border}`}>
        {v.icon}
      </div>

      {/* Tag + Title */}
      <div>
        <span className={`inline-block text-[10px] font-bold uppercase tracking-widest mb-2 ${v.accent}`}>{v.tag}</span>
        <h3 className={`font-display font-bold text-lg leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>{v.title}</h3>
      </div>

      {/* Desc */}
      <p className={`text-sm leading-relaxed flex-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{v.desc}</p>

      {/* Examples */}
      <div className="flex flex-wrap gap-2 pt-1">
        {v.examples.map(ex => (
          <span key={ex} className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${v.bg} ${v.accent} border ${v.border}`}>
            {ex}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={`#${v.id}`}
        className={`flex items-center gap-1 text-sm font-semibold font-display mt-1 group/link w-fit ${v.accent} transition-all duration-200`}
      >
        Explore
        <ChevronRight size={15} className="group-hover/link:translate-x-1 transition-transform duration-200" />
      </a>
    </div>
  );
}

export default function Verticals({ theme }) {
  const isDark = theme === 'dark';
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="originals" ref={ref} className={`py-20 sm:py-28 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest rounded-full px-4 py-2 mb-5 border
            ${isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-emerald-600 bg-emerald-50 border-emerald-200'}`}>
            Content Verticals
          </div>
          <h2 className={`font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4
            ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Five Ways We Tell
            <br />
            <span className="gradient-text">the Story of Tomorrow</span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            From award-winning documentaries to experimental AI-driven experiences, every GLAREPOST production pushes the boundaries of what cinema can achieve.
          </p>
        </div>

        {/* Grid: 1 col mobile → 2 col tablet → 3 col desktop (last row: 2 centered) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {VERTICALS.slice(0, 3).map((v, i) => (
            <VerticalCard key={v.id} v={v} theme={theme} delay={i * 80} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-5 sm:mt-6 lg:grid-cols-2 lg:w-2/3 lg:mx-auto">
          {VERTICALS.slice(3).map((v, i) => (
            <VerticalCard key={v.id} v={v} theme={theme} delay={(i + 3) * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
