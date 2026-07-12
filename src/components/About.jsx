import { useEffect, useRef } from 'react';
import { Film, Shield, Target, Award, CheckCircle2, ArrowRight } from 'lucide-react';

const TEAM = [
  {
    name: 'Paritosh Nandi',
    role: 'Co-Founder & Creative Director',
    bio: 'Award-winning documentarian with 12+ years of experience filming environmental struggles across the Global South.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    name: 'Ananya Roy',
    role: 'Head of Production & Green Officer',
    bio: 'Pioneer of sustainable production models in India, committed to carbon-neutral shooting sets.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    name: 'Dr. Alok Sen',
    role: 'Chief Scientific Advisor',
    bio: 'Climate scientist and researcher, ensuring absolute scientific accuracy and depth in all our technical documentaries.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

const PILLARS = [
  {
    icon: <Film className="w-6 h-6 text-emerald-400" />,
    title: 'Cinematic Precision',
    desc: 'We combine high-end cinema tools (4K/8K, anamorphic lenses, spatial audio) with journalistic rigor to create immersive masterworks.'
  },
  {
    icon: <Shield className="w-6 h-6 text-indigo-400" />,
    title: 'Scientific Rigor',
    desc: 'Every script is vetted by leading field scientists, researchers, and engineers. We demystify complex systems without losing accuracy.'
  },
  {
    icon: <Target className="w-6 h-6 text-emerald-400" />,
    title: 'Actionable Impact',
    desc: 'Our work doesn’t end with the credits. We partner with NGOs and policymakers to design active behavioral-change campaigns.'
  }
];

export default function About({ theme }) {
  const isDark = theme === 'dark';
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [theme]);

  return (
    <div ref={ref} className="pt-24 pb-16 overflow-hidden">
      {/* ── Hero Banner ── */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: isDark
            ? 'radial-gradient(circle at 80% 20%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(16,185,129,0.12) 0%, transparent 50%)'
            : 'radial-gradient(circle at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(16,185,129,0.05) 0%, transparent 50%)'
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="reveal flex justify-center items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Who We Are
            </span>
          </div>
          <h1 className={`reveal font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Bridging Science & <span className="gradient-text">Cinematic Art</span>
          </h1>
          <p className={`reveal text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            GLAREPOST is India's premier creative studio dedicated to documenting sustainability, deep-tech innovation, climate resilience, and human ingenuity through award-winning films.
          </p>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className={`py-16 sm:py-24 border-y ${isDark ? 'bg-gray-900/20 border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            
            {/* Left: Interactive Image Montage / Card */}
            <div className="reveal relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-indigo-500 rounded-3xl opacity-10 blur-2xl" />
              <div className={`relative rounded-3xl overflow-hidden border p-8 backdrop-blur-md
                ${isDark ? 'bg-gray-900/60 border-white/8' : 'bg-white border-gray-200 shadow-xl'}`}>
                
                <h3 className={`font-display font-extrabold text-2xl mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  The Origin of GLAREPOST
                </h3>
                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  <p>
                    Founded in Mumbai, GLAREPOST emerged from a simple realization: while humanity’s greatest challenges lie in environmental science and advanced technologies, standard media reporting often fails to engage the public imagination. 
                  </p>
                  <p>
                    We set out to create a studio that rejects doom-scrolling narrative structures in favor of beautiful, hopeful, and objective cinematography. We focus on solvers, innovators, and the actionable solutions driving India and the world toward a carbon-neutral future.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                    <Award size={24} />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Certified Green Studio</p>
                    <p className="text-xs text-gray-400">Adhering to eco-set shooting guidelines</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text content */}
            <div className="reveal space-y-8">
              <div className="space-y-3">
                <span className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  Our Purpose
                </span>
                <h2 className={`font-display font-extrabold text-3xl sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Why Stories Matter for Sustainability
                </h2>
              </div>
              <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                True sustainability cannot be achieved through academic journals and research briefs alone. It requires shifting public behaviors, inspiring student minds, driving capital allocation, and demonstrating to policymakers that green tech is viable. Cinema has the power to do all of these simultaneously.
              </p>

              <div className="space-y-3.5">
                {[
                  'Accelerating investment in green technologies.',
                  'Educating the next generation of engineers and scientists.',
                  'Fostering global collaborations with institutions and film academies.',
                  'Maintaining zero-carbon operations across all our sets.'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Three Pillars ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center max-w-2xl mx-auto mb-16">
            <h2 className={`font-display font-extrabold text-3xl sm:text-4xl mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Our Three Foundational Pillars
            </h2>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              How we approach every documentary, feature film, and short series we produce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {PILLARS.map((p, idx) => (
              <div
                key={p.title}
                className={`reveal p-7 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1
                  ${isDark ? 'bg-gray-900/50 border-white/6 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10' : 'bg-white border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6
                  ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
                  {p.icon}
                </div>
                <h3 className={`font-display font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership Team ── */}
      <section className={`py-20 sm:py-28 border-t ${isDark ? 'bg-gray-950 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Leadership
            </span>
            <h2 className={`font-display font-extrabold text-3xl sm:text-4xl mt-3 mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Behind the Camera
            </h2>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Meet the minds driving our creative vision and scientific accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <div
                key={member.name}
                className={`reveal group rounded-3xl overflow-hidden border transition-all duration-300
                  ${isDark ? 'bg-gray-900/40 border-white/6 hover:border-white/12' : 'bg-white border-gray-200/60 shadow-md hover:shadow-xl'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Profile Placeholder/Photo */}
                <div className="h-64 overflow-hidden relative bg-gray-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                </div>

                {/* Member Details */}
                <div className="p-6">
                  <h3 className={`font-display font-bold text-lg mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    {member.role}
                  </p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Banner CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className={`reveal rounded-3xl p-8 sm:p-12 relative overflow-hidden border text-center
          ${isDark ? 'bg-gray-900/30 border-white/6 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 60%)'
          }} />
          <h2 className={`font-display font-extrabold text-2xl sm:text-4xl mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to tell a story <span className="gradient-text">that changes the world?</span>
          </h2>
          <p className={`text-sm sm:text-base max-w-xl mx-auto mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Whether you're a broadcaster, a corporation, a government, or a visionary — we'd love to create something remarkable with you.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-sm text-white gradient-bg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Get In Touch
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
