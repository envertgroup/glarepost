import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Calendar, Play, Search, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { CONTENT_CATEGORIES } from '../utils/contentData';

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
  'Educational':  'bg-teal-500/20    text-teal-400    border-teal-500/25',
  'Experimental': 'bg-pink-500/20    text-pink-400    border-pink-500/25',
  'Feature Film': 'bg-violet-500/20  text-violet-400  border-violet-500/25',
};

const FORMATS = ['All', 'Web Series', 'Documentary', 'Docuseries', 'Impact Film', 'Educational', 'Experimental', 'Feature Film'];
const TOPICS = [
  'All', 'Artificial Intelligence', 'Smart Cities', 'Electric Mobility',
  'Innovation', 'Ocean Science', 'Renewable Energy', 'Space Exploration',
  'Biotechnology', 'Climate Resilience', 'Human Achievement'
];
const SORTS = ['default', 'year', 'duration'];

function ContentCard({ item, idx, theme, onPlayVideo }) {
  const isDark = theme === 'dark';
  return (
    <div
      className="reveal group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full transition-all duration-300 animate-fade-up"
      style={{ transitionDelay: `${(idx % 3) * 60}ms` }}
      onClick={() => onPlayVideo && onPlayVideo(item)}
    >
      {/* Visual Area */}
      <div 
        className={`relative h-48 sm:h-52 bg-gradient-to-br ${GRADIENTS[item.gradientIdx % GRADIENTS.length]} bg-cover bg-center flex items-end p-5 overflow-hidden`}
        style={{ 
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 60%, rgba(0, 0, 0, 0.3) 100%), url(https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg)` 
        }}
      >
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 blur-sm" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-black/20 blur-md" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/15 transition-transform duration-500 group-hover:scale-125" />

        {/* Hover overlay with Play button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-emerald-500/40">
            <Play size={20} fill="white" className="ml-1" />
          </div>
        </div>

        {/* Badges */}
        <div className="relative flex items-center gap-2 flex-wrap z-10">
          <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${TYPE_COLOR[item.type] ?? 'bg-white/15 text-white border-white/20'}`}>
            {item.type}
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold text-white/70 bg-black/30 border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Calendar size={10} />
            {item.year}
          </span>
        </div>
      </div>

      {/* Meta Info */}
      <div className={`p-5 border-x border-b rounded-b-2xl flex-1 flex flex-col justify-between transition-colors duration-300
        ${isDark ? 'bg-gray-900/50 border-white/5' : 'bg-gray-50/50 border-gray-200/50 shadow-sm hover:shadow-md'}`}>
        <div>
          <h3 className={`font-display font-bold text-base sm:text-lg mb-1.5 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-200 ${isDark ? 'text-white' : 'text-gray-950'}`}>
            {item.title}
          </h3>
          <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>{item.tagline}</p>
          <p className={`text-xs line-clamp-2 mb-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
        </div>
        <div className={`flex items-center justify-between pt-3 border-t ${isDark ? 'border-white/5' : 'border-gray-200/50'}`}>
          <span className="text-[10px] font-medium tracking-wide text-gray-500 dark:text-gray-400">{item.category}</span>
          <span className="text-[10px] font-medium flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Clock size={11} />
            {item.duration}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ContentHub({ currentCategory, theme, onPlayVideo }) {
  const isDark = theme === 'dark';
  const ref = useRef(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeType,   setActiveType]  = useState('All');
  const [activeTopic,  setActiveTopic] = useState('All');
  const [sortBy,       setSortBy]      = useState('default');
  const [openDropdown, setOpenDropdown] = useState(null); // 'type' | 'topic' | 'sort' | null

  // Click outside to close custom filter dropdowns
  useEffect(() => {
    const handleClose = () => setOpenDropdown(null);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, []);

  // Collapse search when routing/switching categories
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [currentCategory]);

  // Trigger reveal animation on scroll/mount/filter change
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05 }
    );
    ref.current.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('visible');
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, [currentCategory, searchQuery, activeType, activeTopic, sortBy]);

  const navigateToCategory = (id) => {
    window.location.hash = `#content/${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDashboard = () => {
    window.location.hash = '#content';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveType('All');
    setActiveTopic('All');
    setSortBy('default');
  };

  // ── Filters & Search Algorithm ──
  const filteredCategories = Object.keys(CONTENT_CATEGORIES).reduce((acc, catKey) => {
    const category = CONTENT_CATEGORIES[catKey];

    // If viewing single category, skip other categories
    if (currentCategory && category.id !== currentCategory) return acc;

    const filteredItems = category.items.filter(item => {
      // 1. Search Match
      const matchesSearch = searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Format Match
      const matchesFormat = activeType === 'All' || item.type === activeType;

      // 3. Topic Match
      const matchesTopic = activeTopic === 'All' || item.category === activeTopic;

      return matchesSearch && matchesFormat && matchesTopic;
    });

    // Sort operations
    if (sortBy === 'year') {
      filteredItems.sort((a, b) => b.year.localeCompare(a.year));
    } else if (sortBy === 'duration') {
      const getMinutes = (d) => {
        const val = parseInt(d);
        if (d.includes('ep')) return val * 30; // episodes proxy
        return val;
      };
      filteredItems.sort((a, b) => getMinutes(b.duration) - getMinutes(a.duration));
    }

    if (filteredItems.length > 0) {
      acc[catKey] = {
        ...category,
        items: filteredItems
      };
    }

    return acc;
  }, {});

  const toggleDropdown = (e, name) => {
    e.stopPropagation();
    setOpenDropdown(curr => curr === name ? null : name);
  };

  const selectFilter = (type, value) => {
    if (type === 'type') setActiveType(value);
    if (type === 'topic') setActiveTopic(value);
    if (type === 'sort') setSortBy(value);
    setOpenDropdown(null);
  };

  // Rendering Helper for Dropdown
  const renderDropdown = (label, currentVal, name, options) => {
    const isActive = currentVal !== 'All' && currentVal !== 'default';
    return (
      <div className="relative">
        <button
          onClick={(e) => toggleDropdown(e, name)}
          className={`flex items-center gap-1 text-xs transition-all duration-200 outline-none
            ${isActive
              ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
              : isDark
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-500 hover:text-gray-950'}`}
        >
          <span className="opacity-60">{label}</span>
          <span className="font-semibold">{currentVal === 'default' ? 'Default' : currentVal}</span>
          <ChevronDown size={11} className={`transition-transform duration-200 opacity-60 ${openDropdown === name ? 'rotate-180' : ''}`} />
        </button>

        {openDropdown === name && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute left-0 md:left-auto md:right-0 mt-2.5 w-52 rounded-xl z-30 overflow-hidden transition-all duration-200 origin-top-left md:origin-top-right animate-fade-up
              ${isDark
                ? 'bg-gray-900/95 border border-white/5 backdrop-blur-md shadow-2xl shadow-black/80'
                : 'bg-white border border-gray-200/50 shadow-xl'}`}
          >
            <div className="p-1 max-h-60 overflow-y-auto">
              {options.map(opt => (
                <button
                  key={opt}
                  onClick={() => selectFilter(name, opt)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 flex items-center justify-between
                    ${currentVal === opt
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                      : isDark
                        ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  {opt === 'default' ? 'Default Sort' : opt}
                  {currentVal === opt && <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 dark:bg-emerald-400" />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const isAnyFilterActive = searchQuery !== '' || activeType !== 'All' || activeTopic !== 'All' || sortBy !== 'default';

  return (
    <div ref={ref} className={`min-h-screen py-24 sm:py-28 ${isDark ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button (Category Pages) */}
        {currentCategory && (
          <button
            onClick={navigateToDashboard}
            className={`reveal flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-8 transition-colors duration-200
              ${isDark ? 'text-gray-400 hover:text-emerald-400' : 'text-gray-500 hover:text-emerald-600'}`}
          >
            <ArrowLeft size={16} />
            Back to All Content
          </button>
        )}

        {/* ── Search & Filter Bar (Premium UI with Full Width Expansion) ── */}
        <div className="reveal flex items-center justify-between h-10 mb-16 border-b border-gray-200/50 dark:border-white/5 pb-4 relative">
          
          {isSearchOpen ? (
            /* Full Width Search Field (Slides open from Left) */
            <div className="absolute inset-0 bg-transparent flex items-center justify-between z-20 pb-4 animate-[scaleIn_0.2s_ease-out]">
              <div className="relative flex-1 flex items-center">
                <Search size={15} className={`mr-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full bg-transparent outline-none text-sm font-light tracking-wide transition-all duration-300
                    ${isDark ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'}`}
                />
              </div>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className={`ml-4 p-1.5 rounded-full transition-all duration-150 hover:bg-black/5 dark:hover:bg-white/5
                  ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            /* Normal View: Search Trigger on Left, Filters on Right */
            <>
              {/* Top Left Search Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSearchOpen(true);
                }}
                className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider outline-none transition-colors duration-200
                  ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-950'}`}
              >
                <Search size={14} />
                <span>Search</span>
              </button>

              {/* Top Right Filters */}
              <div className="flex items-center gap-6">
                <SlidersHorizontal size={13} className={`${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                {renderDropdown('Format: ', activeType, 'type', FORMATS)}
                {renderDropdown('Topic: ', activeTopic, 'topic', TOPICS)}
                {renderDropdown('Sort: ', sortBy, 'sort', SORTS)}

                {isAnyFilterActive && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:opacity-85 transition-opacity pl-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* ── View Rendering ── */}
        {Object.keys(filteredCategories).length === 0 ? (
          /* Empty Search / Filter State */
          <div className="reveal text-center py-24">
            <p className={`text-sm font-medium mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              No productions match your criteria.
            </p>
            <button
              onClick={clearAllFilters}
              className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 hover:opacity-80 transition-all duration-200 border-b border-current pb-0.5"
            >
              Reset Filters
            </button>
          </div>
        ) : currentCategory && filteredCategories[currentCategory] ? (
          /* Single Category Detailed Page View */
          <div>
            {/* Header */}
            <div className="reveal mb-12">
              <h1 className={`font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {filteredCategories[currentCategory].title}
              </h1>
            </div>

            {/* Grid of all items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCategories[currentCategory].items.map((item, idx) => (
                <ContentCard key={item.title} item={item} idx={idx} theme={theme} onPlayVideo={onPlayVideo} />
              ))}
            </div>
          </div>
        ) : (
          /* Dashboard View (Category Section-by-Section) */
          <div className="space-y-12 sm:space-y-16">
            {Object.values(filteredCategories).map((category) => (
              <section
                key={category.id}
                id={`section-${category.id}`}
                className="scroll-mt-20 pt-6 first:pt-0"
              >
                {/* Section Header */}
                <div className="reveal flex items-baseline justify-between mb-8 sm:mb-10 border-b border-gray-200/50 dark:border-white/5 pb-4">
                  <h2 className={`font-display font-extrabold text-2xl sm:text-3xl tracking-tight ${isDark ? 'text-white' : 'text-gray-950'}`}>
                    {category.title}
                  </h2>

                  <button
                    onClick={() => navigateToCategory(category.id)}
                    className={`text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-75 pb-0.5 border-b border-transparent hover:border-current ${isDark ? category.accent : category.accent.replace('-400', '-600')}`}
                  >
                    View All
                  </button>
                </div>

                {/* Limited Grid (first 3 items) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {category.items.slice(0, 3).map((item, idx) => (
                    <ContentCard key={item.title} item={item} idx={idx} theme={theme} onPlayVideo={onPlayVideo} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
