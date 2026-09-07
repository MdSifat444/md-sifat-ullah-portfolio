import React from 'react';
import { Camera, Trash2, MapPin } from 'lucide-react';
import { PhotographyItem } from '../types';

interface PhotographyTabProps {
  photoTabs: string[];
  activePhotoTab: string;
  setActivePhotoTab: (tab: string) => void;
  filteredPhotos: PhotographyItem[];
  setLightboxIndex: (index: number | null) => void;
  setIsPhotoModalOpen: (open: boolean) => void;
  deletePhoto: (id: string, e: React.MouseEvent) => void;
  requireAdmin?: (action: () => void) => void;
}

export const PhotographyTab: React.FC<PhotographyTabProps> = ({
  photoTabs,
  activePhotoTab,
  setActivePhotoTab,
  filteredPhotos,
  setLightboxIndex,
  setIsPhotoModalOpen,
  deletePhoto,
  requireAdmin
}) => {
  return (
    <section id="photography" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <h3 className="font-serif text-3xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full inline-block"></span> Photography Showcase
            </h3>
          </div>

          {/* Action items */}
          <button 
            onClick={() => requireAdmin ? requireAdmin(() => setIsPhotoModalOpen(true)) : setIsPhotoModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-light text-xs font-mono text-black tracking-widest font-bold rounded-full transition-all duration-300 shadow-lg shadow-gold/10 cursor-pointer"
          >
            <Camera size={14} /> UPLOAD NEW SHOT
          </button>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-gold/15 pb-6">
          {photoTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActivePhotoTab(tab)}
              className={`px-4 py-2 text-xs tracking-widest font-mono uppercase transition-all duration-300 rounded-full cursor-pointer ${
                activePhotoTab === tab 
                  ? 'bg-gold text-black font-bold shadow-lg shadow-gold/15' 
                  : 'border border-gold/15 bg-white/5 hover:border-gold/45 text-zinc-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item, index) => (
            <div
              key={item.id}
              className="group border border-gold/15 bg-[#111111] rounded-3xl p-4 hover:border-gold/30 hover:bg-white/[0.01] cursor-pointer overflow-hidden relative flex flex-col justify-between shadow-lg text-left"
              onClick={() => setLightboxIndex(index)}
            >
              {/* Delete action */}
              <button 
                onClick={(e) => deletePhoto(item.id, e)}
                className="absolute top-6 right-6 hover:text-red-500 z-10 p-2 bg-black/60 hover:bg-black/80 transition-all border border-gold/15 text-zinc-400 rounded-xl"
                title="Remove picture"
              >
                <Trash2 size={13} />
              </button>

              <div className="relative overflow-hidden aspect-[4/3] bg-zinc-900 mb-4 rounded-2xl">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1437419764061-2473afe69fc2?auto=format&fit=crop&q=80&w=600";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              <div>
                <div className="flex justify-between items-center gap-4 mb-2">
                  <h4 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors truncate">
                    {item.title}
                  </h4>
                  <span className="shrink-0 px-2.5 py-0.5 border border-gold/20 text-[9px] font-mono tracking-wider text-gold bg-gold/5 rounded-full uppercase">
                    {item.category}
                  </span>
                </div>
                
                <p className="text-xs text-zinc-400 font-sans line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>

                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono mt-4 pt-3 border-t border-gold/15 justify-between">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} className="text-gold/75" /> {item.location}
                  </span>
                  <span>{item.takenAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
