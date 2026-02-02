import React from 'react';
import { Photo } from '../types';

interface PhotoCardProps {
  photo: Photo;
  onDelete?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onDelete }) => {
  return (
    <div className="flex-shrink-0 flex flex-col items-center relative group px-2 select-none transition-all duration-1000 hover:z-30">
      
      {/* Delete Trigger - Visible on Hover */}
      {onDelete && (
        <button 
          onClick={onDelete}
          className="absolute -top-2 -right-2 w-6 h-6 bg-black border border-white/10 rounded-full text-white/20 hover:text-red-500 hover:border-red-500/40 z-50 opacity-0 group-hover:opacity-100 transition-all duration-500 text-[10px] font-mono"
        >
          ×
        </button>
      )}

      {/* Upper Frame Header */}
      <div className="w-full h-8 flex justify-between px-8 items-end pb-1 border-b border-white/[0.03] transition-colors duration-700 group-hover:border-[var(--accent-gold)]/20">
        <span className="text-[7px] font-mono text-zinc-700 tracking-widest uppercase">{photo.cameraSettings?.camera || 'UNKNOWN'}</span>
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-3 h-4 bg-[#0a0a0a] rounded-sm border border-white/[0.02]"></div>
          ))}
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative bg-[#050505] p-1.5 transition-all duration-1000 group-hover:shadow-[0_0_60px_rgba(0,0,0,1)]">
        
        {/* Subtle Frame ID */}
        <div className="absolute -left-14 top-1/2 -translate-y-1/2 -rotate-90 text-[7px] font-mono text-zinc-800 tracking-[0.5em] group-hover:text-[var(--accent-gold)] transition-colors duration-700 whitespace-nowrap uppercase">
          {photo.reelYear}_NEG_{photo.id.slice(0, 3)}
        </div>

        {/* The Image */}
        <div className="overflow-hidden w-[75vw] md:w-[45vw] lg:w-[35vw] aspect-[16/10] relative bg-[#020202]">
          <img 
            src={photo.url} 
            alt={photo.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-[1.5s] grayscale-[30%] group-hover:grayscale-0 scale-[1.05] group-hover:scale-100 ease-out"
          />
          
          <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] pointer-events-none"></div>
        </div>
        
        {/* Meta Info Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none bg-black/20 backdrop-blur-[2px]">
           <div className="text-center px-6">
             <h3 className="text-white font-['Cormorant_Garamond'] font-light italic text-4xl mb-2">{photo.title}</h3>
             <div className="h-px w-8 bg-[var(--accent-gold)] mx-auto mb-3"></div>
             <p className="text-[var(--text-secondary)] text-[8px] font-['Inter'] uppercase tracking-[0.4em]">{photo.location}</p>
           </div>
        </div>
      </div>

      {/* Lower Frame Footer */}
      <div className="w-full h-8 flex justify-between px-8 items-start pt-1 border-t border-white/[0.03] transition-colors duration-700 group-hover:border-[var(--accent-gold)]/20">
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-3 h-4 bg-[#0a0a0a] rounded-sm border border-white/[0.02]"></div>
          ))}
        </div>
        <span className="text-[7px] font-mono text-zinc-700 tracking-widest uppercase">{photo.cameraSettings?.film || 'EXPOSED'}</span>
      </div>

      {/* Bottom Date */}
      <div className="mt-4 opacity-0 translate-y-2 group-hover:opacity-40 group-hover:translate-y-0 transition-all duration-700 delay-100">
        <span className="text-[8px] font-mono text-[var(--text-secondary)] tracking-widest italic">{photo.date}</span>
      </div>
    </div>
  );
};

export default PhotoCard;