import { useEffect } from 'react';
import { X, Play, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { useState, useRef } from 'react';

export default function ShowreelModal({ open, onClose, theme }) {
  const isDark = theme === 'dark';
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  // Trap scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  const toggleMute = () => {
    setMuted(m => {
      if (videoRef.current) videoRef.current.muted = !m;
      return !m;
    });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 lg:p-10"
      role="dialog"
      aria-modal="true"
      aria-label="Showreel"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className={`relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border
        ${isDark ? 'bg-gray-950 border-white/8' : 'bg-gray-900 border-white/5'}`}
        style={{ animation: 'scaleIn 0.3s ease both' }}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/8">
          <div>
            <p className="font-display font-bold text-white text-sm sm:text-base">GLAREPOST Showreel</p>
            <p className="text-xs text-gray-500 mt-0.5">2024 · 2 min · 4K</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Area — 16:9 */}
        <div className="relative bg-black" style={{ aspectRatio: '16/9' }}>
          {/* Placeholder visual when no real video is available */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Decorative cinematic bars */}
            <div className="absolute top-0 left-0 right-0 h-[8%] bg-black/80" />
            <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-black/80" />

            <div className="flex flex-col items-center gap-5 text-center px-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full gradient-bg flex items-center justify-center shadow-2xl shadow-emerald-500/40"
                style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
                <Play size={28} fill="white" className="ml-1" />
              </div>
              <div>
                <p className="font-display font-extrabold text-white text-xl sm:text-2xl mb-2">GLAREPOST</p>
                <p className="text-gray-400 text-sm">Cinema for the Future</p>
              </div>
              <p className="text-xs text-gray-600 max-w-xs">
                Connect your showreel video URL in <code className="text-emerald-500">ShowreelModal.jsx</code> to enable playback
              </p>
            </div>

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)'
            }} />
          </div>

          {/* Controls overlay */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-150 backdrop-blur-sm"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <button
              className="w-9 h-9 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-150 backdrop-blur-sm"
              aria-label="Fullscreen"
              onClick={() => videoRef.current?.requestFullscreen?.()}
            >
              <Maximize2 size={15} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white/8">
          <p className="text-xs text-gray-500">India's first cinematic sustainability studio</p>
          <a
            href="#contact"
            onClick={onClose}
            className="text-xs font-semibold font-display px-4 py-2 rounded-full gradient-bg text-white shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 text-center"
          >
            Work With Us
          </a>
        </div>
      </div>
    </div>
  );
}
