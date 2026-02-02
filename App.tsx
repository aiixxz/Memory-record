import React, { useRef, useEffect, useState, useMemo } from 'react';
import PhotoCard from './components/PhotoCard';
import UploadModal from './components/UploadModal';
import { MOCK_PHOTOS } from './constants';
import { Photo } from './types';

const REEL_CONFIG: Record<string, { title: string; subtitle: string; color: string; note: string }> = {
  '2025': {
    title: 'MEMORY',
    subtitle: '我要做一棵树',
    color: 'rgba(10, 10, 9, 0.85)',
    note: 'TEXTURE OF TIME / ARCHIVE COLLECTION NO. 0042',
    bgimage: './image/2025-background.jpg'
  },
  '2024': {
    title: 'ECHOES',
    subtitle: '听见风的声音',
    color: 'rgba(20, 18, 16, 0.85)',
    note: 'RESONANCE / CHRONICLE COLLECTION NO. 0039'
  },
  '2023': {
    title: 'ORIGIN',
    subtitle: '万物生长的起点',
    color: 'rgba(12, 16, 18, 0.85)',
    note: 'FOUNDATION / GENESIS COLLECTION NO. 0021'
  }
};

const App: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState('2025');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  
  const years = ['2025', '2024', '2023'];
  const currentConfig = REEL_CONFIG[activeYear];

  useEffect(() => {
    const saved = localStorage.getItem('archive_photos');
    if (saved) {
      setPhotos(JSON.parse(saved));
    } else {
      setPhotos(MOCK_PHOTOS);
    }
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      localStorage.setItem('archive_photos', JSON.stringify(photos));
    }
  }, [photos]);

  const filteredPhotos = useMemo(() => 
    photos.filter(p => p.reelYear === activeYear),
    [photos, activeYear]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const handleYearChange = (year: string) => {
    if (year === activeYear) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveYear(year);
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
      setTimeout(() => setIsTransitioning(false), 500);
    }, 300);
  };

  const handleAddPhoto = (newPhoto: Photo) => {
    setPhotos(prev => [newPhoto, ...prev]);
    setIsModalOpen(false);
  };

  const handleDeletePhoto = (id: string) => {
    if (window.confirm('Archive this frame permanently?')) {
      setPhotos(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden select-none transition-all duration-[1.5s] ease-in-out"
      style={{ 
      backgroundImage: currentConfig.bgimage ? `url(${currentConfig.bgimage})` : 'none',
      backgroundColor: currentConfig.color,
      backgroundBlendMode: 'overlay' 
      }}
    >
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none z-0">
        <span className="text-[40rem] font-['Bebas_Neue'] leading-none text-white">{activeYear}</span>
      </div>
      
      {/* Subtle Vertical Timeline */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-8">
        <div className="h-16 w-px bg-white opacity-10"></div>
        {years.map((year, idx) => (
          <button
            key={year}
            onClick={() => handleYearChange(year)}
            className={`group relative flex flex-col items-center transition-all duration-700 ${
              activeYear === year ? 'opacity-100' : 'opacity-20 hover:opacity-50'
            }`}
          >
            <span className="text-[7px] font-mono tracking-widest text-zinc-500 mb-2 rotate-180 vertical-text">
              REEL_0{years.length - idx}
            </span>
            <span className="font-['Cormorant_Garamond'] text-xl italic text-white transition-colors group-hover:text-[var(--accent-gold)]">
              {year.slice(-2)}
            </span>
            {activeYear === year && (
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-[var(--accent-gold)] rounded-full shadow-[0_0_8px_var(--accent-gold)]"></div>
            )}
          </button>
        ))}
        <div className="h-16 w-px bg-white opacity-10"></div>
      </div>

      {/* Editorial Title Section */}
      <div className="absolute top-16 left-20 z-0 pointer-events-none group">
        <h1 className="flex flex-col gap-0 leading-none">
          <span className="text-white text-9xl md:text-[13rem] font-['Cormorant_Garamond'] font-light tracking-[-0.05em] opacity-80 transition-all duration-[1.5s] group-hover:tracking-tight group-hover:opacity-100">
            {isTransitioning ? 'REELING' : currentConfig.title}
          </span>
          <div className="flex items-center gap-8 -mt-10 md:-mt-14">
            <span className="text-[var(--accent-gold)] font-['Noto_Serif_SC'] font-extralight text-4xl md:text-5xl tracking-[0.6em] opacity-90 drop-shadow-sm transition-all duration-1000">
               {currentConfig.subtitle}
            </span>
            <div className="h-px w-32 bg-[var(--accent-gold)] opacity-10 transition-all duration-1000 group-hover:w-64"></div>
          </div>
          <span className="text-[var(--text-secondary)] font-['Noto_Serif_SC'] font-extralight text-lg md:text-xl tracking-[1em] mt-6 ml-4 italic opacity-50">
             拥有坚硬的纹路 — {activeYear}
          </span>
        </h1>
        
        <div className="mt-14 font-['Inter'] text-[9px] uppercase tracking-[1em] text-[var(--text-secondary)] opacity-30">
          <p className="flex items-center gap-6 transition-opacity duration-1000">
            {currentConfig.note}
          </p>
        </div>
      </div>

      {/* Main Horizontal Scroll Area */}
      <div 
        ref={scrollRef}
        className={`scroll-container relative z-10 transition-all duration-700 ${
          isTransitioning ? 'opacity-0 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'
        }`}
      >
        <div className="flex-shrink-0 w-[55vw] md:w-[48vw]"></div>

        <div className="relative flex items-center">
          <div className="film-reel-track"></div>
          
          <div className="flex items-center gap-2">
            {filteredPhotos.map((photo) => (
              <PhotoCard 
                key={photo.id} 
                photo={photo} 
                onDelete={() => handleDeletePhoto(photo.id)}
              />
            ))}
          </div>
        </div>

        {/* Outro Section */}
        <div className="flex-shrink-0 w-[60vw] h-full flex flex-col justify-center items-start pl-48 relative">
           <div className="absolute top-1/2 -translate-y-1/2 -left-20 opacity-[0.015] pointer-events-none">
              <span className="text-[25rem] font-['Bebas_Neue'] tracking-tighter text-white">FINIS</span>
           </div>
           <div className="relative">
             <h2 className="text-6xl font-['Cormorant_Garamond'] text-white font-light italic leading-tight opacity-90 tracking-tight">
                Wait for the light to <br/>
                <span className="text-[var(--accent-gold)] transition-all duration-1000 hover:text-white cursor-default">reveal</span> what time hides.
             </h2>
             <div className="mt-20 flex flex-col gap-8">
               <button 
                  onClick={() => scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' })}
                  className="group flex items-center gap-6 text-[10px] font-['Inter'] font-light uppercase tracking-[0.6em] text-[var(--text-secondary)] hover:text-white transition-all duration-500"
               >
                  <span className="relative flex items-center justify-center">
                    <span className="w-12 h-px bg-white/10 group-hover:w-24 group-hover:bg-[var(--accent-gold)] transition-all duration-700"></span>
                  </span>
                  Return to Origin
               </button>
               <div className="flex gap-12 text-[8px] text-zinc-500 font-mono tracking-widest uppercase opacity-40">
                 <span>© {activeYear} ARCHIVE</span>
                 <span>COLLECTED BY SILENCE</span>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Archive Manager Button */}
      <div className="fixed bottom-10 left-10 z-[110]">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-8 h-8 flex items-center justify-center border border-white/5 rounded-full text-white/20 hover:text-[var(--accent-gold)] hover:border-[var(--accent-gold)]/40 hover:scale-110 transition-all duration-500 opacity-20 hover:opacity-100"
          title="Add Frame to Archive"
        >
          <span className="text-lg font-light">+</span>
        </button>
      </div>

      {/* Minimal Sidebar Info */}
      <div className="fixed bottom-12 right-16 z-50 flex flex-col items-end gap-2 opacity-30 group hover:opacity-100 transition-opacity duration-700">
        <span className="text-[9px] font-['Inter'] tracking-[0.4em] text-[var(--text-secondary)] uppercase">REEL_{activeYear}</span>
        <div className="w-12 h-px bg-[var(--accent-gold)] transition-all duration-700 group-hover:w-24"></div>
        <span className="text-white font-['Cormorant_Garamond'] text-2xl font-light italic">Observation is an art.</span>
      </div>

      {isModalOpen && (
        <UploadModal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={handleAddPhoto} 
          currentYear={activeYear}
        />
      )}

      {/* Guide Lines */}
      <div className="fixed top-1/4 left-0 w-full h-px bg-white/[0.01] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 left-0 w-full h-px bg-white/[0.01] pointer-events-none z-0"></div>
    </div>
  );
};

export default App;
