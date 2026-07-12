import { useState, useEffect } from 'react';
import { Maximize2, X } from 'lucide-react';

export default function GlobalPlayer({ video, state, placeholderRect, onClose, onExpand, theme }) {
  const isDark = theme === 'dark';
  const [dimensions, setDimensions] = useState({ width: 340, height: 191 });

  // Update dimensions on resize for PiP mode responsiveness
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth < 640 ? 280 : window.innerWidth < 1024 ? 320 : 360;
      setDimensions({ width: w, height: w * 9 / 16 });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!video || state === 'none') return null;

  // Determine dynamic placement styles
  let style = {};

  if (state === 'full') {
    style = {
      position: 'absolute',
      top: placeholderRect ? `${placeholderRect.top}px` : '0px',
      left: placeholderRect ? `${placeholderRect.left}px` : '0px',
      width: placeholderRect ? `${placeholderRect.width}px` : '100%',
      height: placeholderRect ? `${placeholderRect.height}px` : '100%',
      opacity: placeholderRect ? 1 : 0,
      transform: 'scale3d(1, 1, 1)',
      zIndex: 40,
      pointerEvents: 'auto',
      transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      borderRadius: '2rem',
      boxShadow: 'none',
      border: '1px solid rgba(0, 0, 0, 0.1)',
    };
  } else if (state === 'pip') {
    style = {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      opacity: 1,
      transform: 'scale3d(1, 1, 1)',
      zIndex: 180,
      pointerEvents: 'auto',
      transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
      borderRadius: '1.5rem',
      boxShadow: isDark 
        ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 15px rgba(16, 185, 129, 0.15)' 
        : '0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 10px rgba(0, 0, 0, 0.05)',
      border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
    };
  }

  return (
    <div 
      style={style}
      className="overflow-hidden group select-none bg-black"
    >
      {/* Custom Controls Overlay (Only active in PiP mode) */}
      {state === 'pip' && (
        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 z-20 pointer-events-none">
          
          {/* Top Bar Controls */}
          <div className="flex items-center justify-between w-full pointer-events-auto">
            <span className="text-[10px] font-bold text-white truncate max-w-[70%]">
              {video.title}
            </span>
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={onExpand}
                className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Expand to Full Page"
              >
                <Maximize2 size={12} />
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Close Video"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {/* Bottom Branding Tag */}
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-extrabold uppercase tracking-widest text-emerald-400">
              Playing in PiP
            </span>
          </div>

        </div>
      )}

      {/* Persistent Iframe */}
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&enablejsapi=1&rel=0`}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full absolute inset-0 pointer-events-auto"
      ></iframe>
    </div>
  );
}
