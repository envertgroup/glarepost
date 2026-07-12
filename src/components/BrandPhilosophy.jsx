import { useEffect, useRef } from 'react';
import { Eye, Target, Globe, Sparkles, Shield, Leaf, Users, Award } from 'lucide-react';

const VALUES = [
  { icon: <Eye        size={20} />, title: 'Truth Through Storytelling',   desc: 'We never sensationalise. Every frame is built on research, accuracy, and honest narrative.' },
  { icon: <Sparkles   size={20} />, title: 'Cinematic Excellence',         desc: 'We hold ourselves to the highest production standards — because great stories deserve great craft.' },
  { icon: <Shield     size={20} />, title: 'Scientific Accuracy',          desc: 'Our productions work closely with scientists, engineers, and domain experts at every step.' },
  { icon: <Users      size={20} />, title: 'Human-Centered Narratives',    desc: 'Technology and sustainability only matter when they improve real lives. People are at the heart of every story.' },
  { icon: <Target     size={20} />, title: 'Innovation with Integrity',    desc: 'We champion bold ideas while rigorously questioning hype and holding innovation accountable.' },
  { icon: <Leaf       size={20} />, title: 'Sustainability in Production', desc: 'We practise what we preach — green production methodologies across every shoot.' },
  { icon: <Globe      size={20} />, title: 'Global Collaboration',         desc: 'We partner with international studios, broadcasters, and institutions to amplify Indian stories worldwide.' },
  { icon: <Award      size={20} />, title: 'Social Impact',               desc: 'Every production aims to move the needle — on policy, investment, awareness, or behaviour.' },
];

function ValueCard({ v, theme, delay }) {
  const isDark = theme === 'dark';
  return (
    <div
      className={`reveal group flex gap-4 p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5
        ${isDark ? 'bg-gray-900/50 border-white/7 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10' : 'bg-white border-gray-100 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-500/10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`mt-0.5 w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-200
        ${isDark ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'}`}>
        {v.icon}
      </div>
      <div>
        <h4 className={`font-display font-bold text-sm sm:text-base mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{v.title}</h4>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{v.desc}</p>
      </div>
    </div>
  );
}

export default function BrandPhilosophy({ theme }) {
  const isDark = theme === 'dark';
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [theme]);

  return (
    <section id="philosophy" ref={ref} className={`pt-28 pb-20 sm:pt-36 sm:pb-28 transition-colors duration-500 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mission / Vision / Philosophy — top row */}
        <div className="reveal max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest rounded-full px-4 py-2 mb-6 border
            ${isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-emerald-600 bg-emerald-50 border-emerald-200'}`}>
            Philosophy
          </div>
          <h2 className={`font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Entertainment <span className="gradient-text">with Purpose</span>
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            At GLAREPOST, cinema is more than an art form — it's a catalyst for transformation. Powerful storytelling can influence public opinion, inspire innovation, shape policy conversations, attract investment, and encourage people to embrace a more sustainable future.
          </p>
        </div>

        {/* Mission + Vision cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {[
            {
              label: 'Mission',
              color: 'from-emerald-500 to-teal-600',
              text: "To become India's leading cinematic studio for stories that advance sustainability, science, technology, innovation, and human progress.",
            },
            {
              label: 'Vision',
              color: 'from-indigo-500 to-violet-600',
              text: 'To build a globally respected film studio that creates award-winning documentaries, feature films, web series, and digital content that inspire millions while contributing to a more sustainable and technologically advanced world.',
            },
          ].map((card, i) => (
            <div
              key={card.label}
              className={`reveal relative rounded-2xl overflow-hidden p-7 sm:p-8
                ${isDark ? 'bg-gray-900/60 border border-white/7' : 'bg-white border border-gray-100 shadow-sm'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`} />
              <span className={`inline-block font-display font-bold text-xs uppercase tracking-widest mb-4
                ${card.label === 'Mission' ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-indigo-400' : 'text-indigo-600')}`}>
                {card.label}
              </span>
              <p className={`text-base sm:text-lg leading-relaxed font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{card.text}</p>
            </div>
          ))}
        </div>

        {/* Brand Promise */}
        <div className={`reveal rounded-2xl p-7 sm:p-10 mb-16 sm:mb-20 border relative overflow-hidden
          ${isDark ? 'bg-gray-900/40 border-white/7' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(16,185,129,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(99,102,241,0.07) 0%, transparent 60%)'
          }} />
          <div className="relative">
            <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>We don't just produce films</p>
            <div className={`space-y-3 text-lg sm:text-xl font-display font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <p>We <span className="gradient-text">discover</span> stories that matter.</p>
              <p>We <span className="gradient-text">tell</span> stories that accelerate innovation.</p>
              <p>We <span className="gradient-text">preserve</span> stories that future generations should remember.</p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center">
          <h3 className={`reveal font-display font-extrabold text-2xl sm:text-3xl mb-8 sm:mb-10 inline-block ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Core Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} v={v} theme={theme} delay={i * 60} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
