import { useState, useEffect } from 'react';
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import About          from './components/About';
import BrandPhilosophy from './components/BrandPhilosophy';
import VideoPage      from './components/VideoPage';
import Footer         from './components/Footer';
import ContentHub     from './components/ContentHub';
import GlobalPlayer   from './components/GlobalPlayer';
import { CONTENT_CATEGORIES } from './utils/contentData';

// Flatten all items from content categories to share the single source of truth
const ALL_ITEMS = Object.values(CONTENT_CATEGORIES).flatMap(category => category.items);

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

export default function App() {
  const [theme,       setTheme      ] = useState('dark');
  const [hash,        setHash       ] = useState(window.location.hash);

  // Video playback states
  const [activeVideo,     setActiveVideo]     = useState(null);
  const [videoState,      setVideoState]      = useState('none'); // 'none' | 'full' | 'pip'
  const [placeholderRect, setPlaceholderRect] = useState(null);

  // Global exit prompt state
  const [showAppPipPrompt, setShowAppPipPrompt] = useState(false);

  // Reset PiP preference on initial mount for easy testing
  useEffect(() => {
    localStorage.removeItem('glarepost-pip-pref');
  }, []);

  // Sync hash state with window location hash
  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Redirect empty hash or '#' to '#home' on initial load
  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#') {
      window.location.hash = '#home';
    }
  }, []);

  // Persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem('glarepost-theme');
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);

  // Handle routing states
  const isContentHub = hash.startsWith('#content');
  const isPhilosophy = hash === '#philosophy';
  const isAbout      = hash === '#about';
  const isVideoPage  = hash.startsWith('#video/');
  const isHome       = !isContentHub && !isPhilosophy && !isAbout && !isVideoPage;

  // Scroll to top on page route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);

  // Handle scrolling to page sub-sections if they exist
  useEffect(() => {
    if (!isContentHub && !isPhilosophy && !isAbout && !isVideoPage && hash && hash !== '#' && hash !== '#home') {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [hash, isContentHub, isPhilosophy, isAbout, isVideoPage]);

  // Route Synchronization for Video Playback (morfs coordinates without unmounting)
  const youtubeId = hash.startsWith('#video/') ? hash.replace('#video/', '') : null;

  useEffect(() => {
    if (youtubeId) {
      let videoItem = ALL_ITEMS.find(item => item.youtubeId === youtubeId);
      if (!videoItem && youtubeId === SHOWREEL_ITEM.youtubeId) {
        videoItem = SHOWREEL_ITEM;
      }
      if (videoItem) {
        setActiveVideo(videoItem);
        setVideoState('full');
        setShowAppPipPrompt(false); // Clear prompt if we navigate into a video
      }
    } else {
      // Exit route from video detected
      if (activeVideo && videoState === 'full') {
        const pref = localStorage.getItem('glarepost-pip-pref') || 'ask';
        if (pref === 'always') {
          setVideoState('pip');
        } else if (pref === 'never') {
          setVideoState('none');
          setActiveVideo(null);
        } else {
          // 'ask': minimize immediately to PiP to prevent playback interruption, and ask user
          setVideoState('pip');
          setShowAppPipPrompt(true);
        }
      }
    }
  }, [hash, youtubeId, activeVideo, videoState]);

  const toggleTheme = () => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark';
      localStorage.setItem('glarepost-theme', next);
      return next;
    });
  };

  const isDark = theme === 'dark';

  // Parse active category if we are in content hub
  let currentCategory = null;
  if (hash.startsWith('#content/')) {
    currentCategory = hash.replace('#content/', '');
  }

  const handlePlayVideo = (video) => {
    window.location.hash = `#video/${video.youtubeId}`;
  };

  const handleCloseVideo = () => {
    setVideoState('none');
    setActiveVideo(null);
  };

  const handleExpandVideo = () => {
    window.location.hash = `#video/${activeVideo.youtubeId}`;
  };

  // PiP Global Prompt handlers
  const handleConfirmPip = () => {
    setShowAppPipPrompt(false);
  };

  const handleAlwaysPip = () => {
    localStorage.setItem('glarepost-pip-pref', 'always');
    setShowAppPipPrompt(false);
  };

  const handleNeverPip = () => {
    localStorage.setItem('glarepost-pip-pref', 'never');
    setShowAppPipPrompt(false);
    setVideoState('none');
    setActiveVideo(null);
  };

  const handleCancelPip = () => {
    setShowAppPipPrompt(false);
    if (activeVideo) {
      window.location.hash = `#video/${activeVideo.youtubeId}`;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'}`}
      data-theme={theme}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} activeHash={hash} />

      <main>
        {isVideoPage ? (
          <VideoPage 
            hash={hash} 
            theme={theme} 
            onUpdateRect={(rect) => setPlaceholderRect(rect)}
          />
        ) : isContentHub ? (
          <ContentHub currentCategory={currentCategory} theme={theme} onPlayVideo={handlePlayVideo} />
        ) : isPhilosophy ? (
          <BrandPhilosophy theme={theme} />
        ) : isAbout ? (
          <About theme={theme} />
        ) : (
          <Hero onPlayVideo={handlePlayVideo} theme={theme} />
        )}
      </main>

      <Footer theme={theme} />

      {/* Persistent Global Player */}
      <GlobalPlayer
        video={activeVideo}
        state={videoState}
        placeholderRect={placeholderRect}
        onClose={handleCloseVideo}
        onExpand={handleExpandVideo}
        theme={theme}
      />

      {/* Global Minimalistic Picture-in-Picture Prompt Modal */}
      {showAppPipPrompt && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeInUp_0.2s_ease]">
          <div className={`w-full max-w-sm p-6.5 rounded-[1.8rem] border text-center space-y-4.5 shadow-2xl backdrop-blur-xl
            ${isDark ? 'bg-gray-900/95 border-white/10' : 'bg-white border-slate-200/90 shadow-slate-200/40'}`}>
            
            <div className="space-y-1">
              <h3 className={`font-display font-extrabold text-lg sm:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Minimize to PiP?
              </h3>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'} leading-relaxed max-w-xs mx-auto`}>
                How would you like to handle video playback when exiting?
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleConfirmPip}
                className="w-full py-2.5 rounded-2xl font-display font-bold text-xs text-white gradient-bg shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                Minimize (This Time)
              </button>
              
              <button
                onClick={handleAlwaysPip}
                className={`w-full py-2.5 rounded-2xl font-display font-bold text-xs border transition-all duration-200 hover:-translate-y-0.5
                  ${isDark ? 'text-gray-300 border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5' : 'text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-slate-50'}`}
              >
                Always Minimize
              </button>

              <button
                onClick={handleNeverPip}
                className={`w-full py-2.5 rounded-2xl font-display font-bold text-xs border transition-all duration-200 hover:-translate-y-0.5
                  ${isDark ? 'text-red-400 border-red-500/25 hover:bg-red-500/10' : 'text-red-600 border-red-200 hover:bg-red-50'}`}
              >
                Never Minimize
              </button>
            </div>

            <button
              onClick={handleCancelPip}
              className={`text-[10px] font-extrabold uppercase tracking-widest block mx-auto hover:underline transition-colors
                ${isDark ? 'text-gray-500 hover:text-gray-400' : 'text-slate-400 hover:text-slate-500'}`}
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
