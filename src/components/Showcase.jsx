import { useEffect, useRef, useState } from 'react';

const FILTERS = ['All', 'Electric Mobility', 'Renewable Energy', 'Artificial Intelligence', 'Space', 'Climate', 'Biotechnology', 'Smart Cities'];

const ITEMS = [
  { title: 'Zero Mile',         category: 'Electric Mobility',  year: '2024', type: 'Documentary',  duration: '58 min',  tagline: 'The race to electrify India' },
  { title: 'Solar Surge',       category: 'Renewable Energy',   year: '2024', type: 'Documentary',  duration: '72 min',  tagline: 'How sunlight became power' },
  { title: 'Neural Nation',     category: 'Artificial Intelligence', year: '2025', type: 'Web Series', duration: '6 ep', tagline: 'AI reshaping every industry' },
  { title: 'Orbit India',       category: 'Space',              year: '2025', type: 'Documentary',  duration: '90 min',  tagline: "ISRO's next giant leap" },
  { title: 'Carbon Zero',       category: 'Climate',            year: '2024', type: 'Impact Film',  duration: '45 min',  tagline: 'Building a net-zero future' },
  { title: 'The Code of Life',  category: 'Biotechnology',      year: '2025', type: 'Documentary',  duration: '64 min',  tagline: 'Rewriting biology itself' },
  { title: 'City Brain',        category: 'Smart Cities',       year: '2025', type: 'Docuseries',   duration: '4 ep',    tagline: 'When cities start thinking' },
  { title: 'The Battery Race',  category: 'Electric Mobility',  year: '2024', type: 'Documentary',  duration: '52 min',  tagline: 'Inside the EV supply chain' },
  { title: 'Wind Harvest',      category: 'Renewable Energy',   year: '2024', type: 'Impact Film',  duration: '38 min',  tagline: 'Coastal wind power pioneers' },
];

const GRADIENTS = [
  'from-violet-600/80 to-indigo-700/80',
  'from-emerald-600/80 to-teal-700/80',
  'from-sky-600/80 to-blue-700/80',
  'from-amber-600/80 to-orange-700/80',
  'from-pink-600/80 to-rose-700/80',
  'from-purple-600/80 to-fuchsia-700/80',
  'from-cyan-600/80 to-teal-700/80',
  'from-lime-600/80 to-green-700/80',
  'from-red-600/80 to-rose-700/80',
];

const TYPE_COLOR = {
  'Documentary':  'bg-emerald-500/20 text-emerald-400 border-emerald-500/25',
  'Web Series':   'bg-indigo-500/20  text-indigo-400  border-indigo-500/25',
  'Impact Film':  'bg-amber-500/20   text-amber-400   border-amber-500/25',
  'Docuseries':   'bg-sky-500/20     text-sky-400     border-sky-500/25',
};

function ShowCard({ item, idx, theme }) {
  const isDark = theme === 'dark';
  return (
    <div className="reveal group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ transitionDelay: `${(idx % 3) * 80}ms` }}>

      {/* Poster area */}
      <div className={`relative h-52 sm:h-60 bg-gradient-to-br ${GRADIENTS[idx % GRADIENTS.length]} flex items-end p-5 overflow-hidden`}>
        {/* Abstract decorative circles */}
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10 blur-sm" />
        <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-full bg-black/20 blur-md" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/15" />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300" />

        {/* Type + Year badges */}
        <div className="relative flex items-center gap-2 flex-wrap z-10">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${TYPE_COLOR[item.type] ?? 'bg-white/15 text-white border-white/20'}`}>
            {item.type}
          </span>
          <span className="text-[10px] font-semibold text-white/70 bg-black/30 border border-white/10 px-2.5 py-1 rounded-full">
            {item.year}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className={`p-5 border-x border-b rounded-b-2xl transition-colors duration-300
        ${isDark ? 'bg-gray-900/80 border-white/7' : 'bg-white border-gray-100'}`}>
        <h3 className={`font-display font-bold text-base mb-1 group-hover:text-emerald-400 transition-colors duration-200 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {item.title}
        </h3>
        <p className={`text-xs mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.tagline}</p>
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-medium ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{item.category}</span>
          <span className={`text-[11px] font-medium ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{item.duration}</span>
        </div>
      </div>
    </div>
  );
}

export default function Showcase({ theme }) {
  const [active, setActive] = useState('All');
  const isDark = theme === 'dark';
  const ref = useRef(null);

  const filtered = active === 'All' ? ITEMS : ITEMS.filter(i => i.category === active);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current.querySelectorAll('.reveal').forEach(el => { el.classList.remove('visible'); obs.observe(el); });
    return () => obs.disconnect();
  }, [active]);

  return (
    <section id="showcase" ref={ref} className={`py-20 sm:py-28 ${isDark ? 'bg-gray-900/50' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest rounded-full px-4 py-2 mb-5 border
            ${isDark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-emerald-600 bg-emerald-50 border-emerald-200'}`}>
            Our Work
          </div>
          <h2 className={`font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Stories We've <span className="gradient-text">Already Told</span>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Explore our growing catalogue of films, series, and impact productions.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="reveal flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold font-display border transition-all duration-200
                ${active === f
                  ? 'gradient-bg text-white border-transparent shadow-md shadow-emerald-500/25'
                  : isDark
                    ? 'bg-white/5 text-gray-400 border-white/10 hover:border-emerald-500/40 hover:text-emerald-400'
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-emerald-400 hover:text-emerald-600'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid: 1 → 2 → 3 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((item, idx) => (
            <ShowCard key={item.title} item={item} idx={idx} theme={theme} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={`text-center py-20 text-base ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            No items in this category yet — coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
