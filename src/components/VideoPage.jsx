import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Calendar, MapPin, Clapperboard, Users, Leaf, Play } from 'lucide-react';
import { CONTENT_CATEGORIES } from '../utils/contentData';

// Flatten all items from content categories to share the single source of truth
const ALL_ITEMS = Object.values(CONTENT_CATEGORIES).flatMap(category => category.items);

// Append the Showreel video explicitly so it can be resolved as a page item
const SHOWREEL_ITEM = {
  title: 'GLAREPOST Showreel',
  tagline: 'Experience GLAREPOST in 4K',
  desc: 'Experience the visual language and cinematic quality of India’s first cinematic sustainability studio in this compiled 4K preview.',
  type: 'Showreel',
  year: '2026',
  duration: '2 min',
  category: 'Showreel',
  youtubeId: 'scVjgI2p02M',
  director: 'Snehasis Medda & team',
  location: 'Mumbai, India',
  experts: ['Dr. Alok Sen (Climate Sci)', 'Snehasis Medda (Dir)'],
  greenFilming: 'Set operated entirely on renewable solar batteries; zero waste catering.'
};

const getSimilarVideos = (currentVideo) => {
  if (!currentVideo) return [];
  
  // Filter items in the same category, excluding the currently playing one
  let matches = ALL_ITEMS.filter(
    item => item.category === currentVideo.category && item.youtubeId !== currentVideo.youtubeId
  );
  
  // If we have fewer than 4 matches, fill with other items from the catalog
  if (matches.length < 4) {
    const filler = ALL_ITEMS.filter(
      item => item.category !== currentVideo.category && item.youtubeId !== currentVideo.youtubeId
    );
    matches = [...matches, ...filler];
  }
  
  // Return at most 6 similar videos
  return matches.slice(0, 6);
};

export default function VideoPage({ hash, theme, onUpdateRect }) {
  const isDark = theme === 'dark';
  const containerRef = useRef(null);
  const placeholderRef = useRef(null);

  // Extract youtubeId from hash (e.g. #video/scVjgI2p02M)
  const youtubeId = hash.replace('#video/', '');

  // Find the video details
  const [currentVideo, setCurrentVideo] = useState(null);
  const [similarVideos, setSimilarVideos] = useState([]);

  useEffect(() => {
    // Scroll to top on page mount/change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [youtubeId]);

  useEffect(() => {
    let videoItem = ALL_ITEMS.find(item => item.youtubeId === youtubeId);
    if (!videoItem && youtubeId === SHOWREEL_ITEM.youtubeId) {
      videoItem = SHOWREEL_ITEM;
    }
    setCurrentVideo(videoItem || SHOWREEL_ITEM);
  }, [youtubeId]);

  // Update similar videos when current playing video changes
  useEffect(() => {
    if (currentVideo) {
      setSimilarVideos(getSimilarVideos(currentVideo));
    }
  }, [currentVideo]);

  // Sync placeholder position and size to App.jsx for the persistent global player
  useEffect(() => {
    const update = () => {
      if (placeholderRef.current && onUpdateRect) {
        const rect = placeholderRef.current.getBoundingClientRect();
        onUpdateRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
      }
    };

    update();
    const ob = new ResizeObserver(update);
    if (placeholderRef.current) ob.observe(placeholderRef.current);

    window.addEventListener('resize', update);
    window.addEventListener('scroll', update);

    return () => {
      ob.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
      if (onUpdateRect) onUpdateRect(null); // Clear rect on unmount
    };
  }, [youtubeId, onUpdateRect]);

  const handleBack = () => {
    window.location.hash = '#content';
  };

  const handleSelectSimilar = (item) => {
    window.location.hash = `#video/${item.youtubeId}`;
  };

  if (!currentVideo) {
    return (
      <div className={`min-h-screen pt-32 flex items-center justify-center ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-slate-900'}`}>
        <div className="text-center space-y-4">
          <p className="text-sm font-bold text-gray-500">Resolving production metadata...</p>
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`min-h-screen pt-28 pb-16 transition-colors duration-500 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Back navigation button */}
        <button
          onClick={handleBack}
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-8 transition-colors duration-200 outline-none
            ${isDark ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
        >
          <ArrowLeft size={16} />
          Go Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Player & Similar Videos (col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Aspect Ratio Boxed Placeholder Container */}
            <div 
              ref={placeholderRef}
              className="relative bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-black/10 aspect-video w-full h-full"
            >
              {/* Persistent Global Player overlays here */}
            </div>

            {/* Similar Videos Shelf */}
            <div className="space-y-5">
              <h3 className={`font-display font-extrabold text-xl border-b pb-3 ${isDark ? 'border-white/5 text-white' : 'border-slate-200 text-slate-900'}`}>
                Similar Productions
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {similarVideos.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => handleSelectSimilar(item)}
                    className={`flex flex-col rounded-2xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group
                      ${isDark 
                        ? 'bg-gray-900/40 border-white/5 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/5' 
                        : 'bg-white border-slate-200 hover:border-emerald-400/40 hover:shadow-xl hover:shadow-slate-200/30'}`}
                  >
                    {/* Thumbnail representation */}
                    <div className="relative aspect-video bg-gray-950 overflow-hidden flex-shrink-0">
                      <img
                        src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/45 flex items-center justify-center transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-emerald-500/30">
                          <Play size={16} fill="white" className="ml-0.5" />
                        </div>
                      </div>
                      
                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 z-10">
                        <span className="text-[8px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/60 text-white backdrop-blur-sm border border-white/10">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    {/* Details card content */}
                    <div className="p-4.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className={`font-bold text-sm line-clamp-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-200 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {item.title}
                        </h4>
                        <p className={`text-[10px] line-clamp-1 mt-1 font-medium ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{item.tagline}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-white/5">
                        <span className={`text-[10px] font-bold tracking-wide uppercase ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{item.category}</span>
                        <span className={`text-[10px] font-semibold ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{item.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Title, Metadata, Production details (col-span-4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            {/* Title Box */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border
                  ${isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-250'}`}>
                  {currentVideo.type}
                </span>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 border
                  ${isDark ? 'text-gray-400 bg-white/5 border-white/5' : 'text-slate-600 bg-slate-50 border-slate-200'}`}>
                  <Calendar size={11} />
                  {currentVideo.year}
                </span>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 border
                  ${isDark ? 'text-gray-400 bg-white/5 border-white/5' : 'text-slate-600 bg-slate-50 border-slate-200'}`}>
                  <Clock size={11} />
                  {currentVideo.duration}
                </span>
              </div>

              <div>
                <h1 className={`font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {currentVideo.title}
                </h1>
                <p className={`text-sm sm:text-base font-semibold mt-2.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {currentVideo.tagline}
                </p>
              </div>
            </div>

            {/* Crew / Details Box */}
            <div className={`p-6 rounded-3xl border space-y-4 backdrop-blur-md
              ${isDark ? 'bg-white/3 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
              
              {currentVideo.director && (
                <div className="flex items-start gap-4.5">
                  <Clapperboard size={16} className={`mt-0.5 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Director</p>
                    <p className={`text-sm font-semibold mt-0.5 ${isDark ? 'text-slate-250' : 'text-slate-800'}`}>{currentVideo.director}</p>
                  </div>
                </div>
              )}

              {currentVideo.location && (
                <div className="flex items-start gap-4.5">
                  <MapPin size={16} className={`mt-0.5 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Filming Location</p>
                    <p className={`text-sm font-semibold mt-0.5 ${isDark ? 'text-slate-250' : 'text-slate-800'}`}>{currentVideo.location}</p>
                  </div>
                </div>
              )}

              {currentVideo.experts && currentVideo.experts.length > 0 && (
                <div className="flex items-start gap-4.5">
                  <Users size={16} className={`mt-0.5 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <div className="w-full">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Featured Experts</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {currentVideo.experts.map(exp => (
                        <span key={exp} className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border
                          ${isDark ? 'bg-white/5 border-white/8 text-gray-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'}`}>
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Description Text */}
            <div className={`p-6 rounded-3xl border ${isDark ? 'bg-white/3 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                Description
              </h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                {currentVideo.desc || 'No detailed synopsis available for this production.'}
              </p>
            </div>

            {/* Eco-Filming Compliance */}
            {currentVideo.greenFilming && (
              <div className={`p-6 rounded-3xl border relative overflow-hidden
                ${isDark ? 'bg-emerald-950/20 border-emerald-900/35' : 'bg-emerald-50/50 border-emerald-250'}`}>
                <div className="flex items-start gap-4">
                  <Leaf size={18} className={`mt-0.5 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  <div>
                    <p className={`text-[10px] font-extrabold uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      Eco-Filming compliance
                    </p>
                    <p className={`text-xs leading-relaxed mt-1 font-medium ${isDark ? 'text-emerald-300/90' : 'text-emerald-800'}`}>
                      {currentVideo.greenFilming}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
