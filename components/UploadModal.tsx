import React, { useState } from 'react';
import { Photo } from '../types';

interface UploadModalProps {
  onClose: () => void;
  onAdd: (photo: Photo) => void;
  currentYear: string;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onAdd, currentYear }) => {
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    location: '',
    description: '',
    camera: '',
    film: '',
    year: currentYear
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url || !formData.title) return;

    const newPhoto: Photo = {
      id: Date.now().toString(),
      url: formData.url,
      title: formData.title,
      description: formData.description || 'A moment captured.',
      date: new Date().toISOString().split('T')[0],
      location: formData.location || 'Unknown',
      reelYear: formData.year,
      cameraSettings: {
        camera: formData.camera || 'Handheld',
        film: formData.film || 'Archive',
        fStop: 'f/---',
        shutter: '---s'
      }
    };

    onAdd(newPhoto);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-[#0d0d0c] border border-white/5 p-12 shadow-2xl">
        <div className="absolute top-8 left-8 text-[8px] font-mono text-zinc-700 tracking-[0.6em] uppercase">
          Archive Log / Entry No. {Math.floor(Math.random() * 9000) + 1000}
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-zinc-700 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest"
        >
          Close ×
        </button>

        <h2 className="text-4xl font-['Cormorant_Garamond'] text-white font-light italic mb-10 tracking-tight">
          Expose a New <span className="text-[var(--accent-gold)]">Frame</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Image URL *</label>
              <input 
                type="text" 
                required
                className="bg-transparent border-b border-white/10 text-white text-xs py-2 focus:outline-none focus:border-[var(--accent-gold)]/40 transition-colors"
                value={formData.url}
                onChange={e => setFormData({...formData, url: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Title *</label>
              <input 
                type="text" 
                required
                className="bg-transparent border-b border-white/10 text-white text-xs py-2 focus:outline-none focus:border-[var(--accent-gold)]/40 transition-colors"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Morning Echo"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Location</label>
              <input 
                type="text" 
                className="bg-transparent border-b border-white/10 text-white text-xs py-2 focus:outline-none focus:border-[var(--accent-gold)]/40 transition-colors"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="Icelandic Coast"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Reel Year</label>
              <select 
                className="bg-[#0d0d0c] border-b border-white/10 text-white text-xs py-2 focus:outline-none focus:border-[var(--accent-gold)]/40 transition-colors"
                value={formData.year}
                onChange={e => setFormData({...formData, year: e.target.value})}
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Camera</label>
              <input 
                type="text" 
                className="bg-transparent border-b border-white/10 text-white text-xs py-2 focus:outline-none focus:border-[var(--accent-gold)]/40 transition-colors"
                value={formData.camera}
                onChange={e => setFormData({...formData, camera: e.target.value})}
                placeholder="Leica M6"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Film Stock</label>
              <input 
                type="text" 
                className="bg-transparent border-b border-white/10 text-white text-xs py-2 focus:outline-none focus:border-[var(--accent-gold)]/40 transition-colors"
                value={formData.film}
                onChange={e => setFormData({...formData, film: e.target.value})}
                placeholder="Kodak Portra 400"
              />
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-white text-black py-4 text-[10px] font-mono uppercase tracking-[0.4em] hover:bg-[var(--accent-gold)] hover:text-white transition-all duration-700 active:scale-95"
            >
              Commit to Archive
            </button>
          </div>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-zinc-800 tracking-widest uppercase">
          <span>Processing...</span>
          <span>Archival Grade Persistence</span>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;