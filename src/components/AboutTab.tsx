import React, { useRef, useState } from 'react';
import { Camera, Upload, Check } from 'lucide-react';
import { ProfileInfo } from '../App';

interface AboutTabProps {
  profileInfo: ProfileInfo;
  onUpdateProfile: (info: ProfileInfo) => void;
  requireAdmin?: (action: () => void) => void;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export const AboutTab: React.FC<AboutTabProps> = ({ profileInfo, onUpdateProfile, requireAdmin }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (requireAdmin) {
        requireAdmin(() => {
          processFile(file);
        });
      } else {
        processFile(file);
      }
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to downscale and compress the image beautifully.
        // This ensures the local storage capacity (5MB) is never exceeded,
        // and keeps the page load lightning fast while retaining HD circle quality.
        const canvas = document.createElement('canvas');
        const MAX_DIM = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          onUpdateProfile({
            ...profileInfo,
            avatarUrl: compressedDataUrl,
          });
        }
        setIsUploading(false);
      };
      img.onerror = () => {
        setIsUploading(false);
        alert('Failed to load image. Please try another file.');
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (requireAdmin) {
        requireAdmin(() => {
          processFile(e.dataTransfer.files![0]);
        });
      } else {
        processFile(e.dataTransfer.files[0]);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="about" className="py-16 relative overflow-hidden">
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PROFILE CARD - BENTO STYLED */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-stretch h-full">
            <div className="relative group p-8 border border-gold/15 hover:border-gold/30 bg-[#111111] rounded-3xl w-full flex flex-col items-center justify-center min-h-[380px] overflow-hidden shadow-2xl transition-all duration-500">
              
              {/* Atmospheric soft glow */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/5 blur-[60px] rounded-full pointer-events-none" />
              
              {/* Outer design circle / Drag Box */}
              <div 
                onClick={triggerFileInput}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative w-36 h-36 md:w-44 md:h-44 rounded-full border p-2 flex items-center justify-center shadow-inner mb-6 cursor-pointer transition-all duration-500 select-none ${
                  dragActive 
                    ? "border-gold bg-gold/10 scale-105 shadow-gold/20" 
                    : "border-gold/15 hover:border-gold/45 decoration-transparent"
                }`}
                title="Click or drag image file here to change your profile photo"
              >
                
                {/* Inner circle with spinning dashed borders */}
                <div className={`absolute inset-0 rounded-full border border-dashed animate-[spin_50s_linear_infinite] ${
                  dragActive ? "border-gold" : "border-gold/25"
                }`} />
                <div className="absolute inset-1.5 rounded-full border border-dashed border-gold/10 animate-[spin_30s_linear_infinite_reverse]" />
                
                {/* Profile Image container */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-950 border border-gold/25">
                  {profileInfo.avatarUrl ? (
                    <img 
                      src={profileInfo.avatarUrl} 
                      alt={profileInfo.name} 
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(profileInfo.name)}&backgroundColor=050505`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-gold text-4xl font-serif font-black">
                      {getInitials(profileInfo.name)}
                    </div>
                  )}

                  {/* Upload Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Upload size={18} className="text-gold animate-bounce" />
                    <span className="text-[9px] font-mono tracking-wider font-semibold text-gold-light uppercase text-center px-2">
                      {isUploading ? "Uploading..." : dragActive ? "DROP FILE!" : "Upload Photo"}
                    </span>
                  </div>
                </div>
                
                {/* Camera Trigger floating icon button */}
                <span className="absolute bottom-2 right-2 w-9 h-9 bg-zinc-900 border border-gold/30 rounded-xl flex items-center justify-center text-gold shadow-lg shadow-black/80 hover:bg-gold hover:text-black transition-all cursor-pointer" title="Click to upload your original photo">
                  <Camera size={13} strokeWidth={1.5} />
                </span>
              </div>

              <div className="text-center">
                <h4 className="font-serif text-white text-2xl font-bold tracking-tight mt-1">{profileInfo.name}</h4>
                <p className="text-xs text-zinc-500 font-mono mt-1">{profileInfo.institution}</p>
                
                <p className="text-[10px] text-zinc-500 font-mono mt-2 flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-pulse"></span>
                  Click or drag your exact photo to replace
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT TEXT DETAILS - BENTO GRID COMPACT CARD */}
          <div className="lg:col-span-7 bg-[#111111] border border-gold/15 hover:border-gold/30 rounded-3xl p-8 md:p-10 flex flex-col justify-between h-full min-h-[460px] relative overflow-hidden shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full pointer-events-none" />
            
            <div>
              <h3 className="font-serif text-3xl font-bold text-white tracking-tight mb-6 flex items-center gap-2 pt-2">
                <span className="w-2 h-2 bg-gold rounded-full inline-block"></span> About Me
              </h3>

              <div className="space-y-4 text-zinc-300 text-sm md:text-base leading-relaxed text-left">
                <p>
                  Assalamualaikum, I am <strong className="text-white font-semibold font-serif">Md. Sifat Ullah</strong>, a Computer Science and Engineering student at <strong className="text-gold font-medium">Daffodil International University</strong> with a passion for technology, problem-solving, and innovation.
                </p>
                <p>
                  Skilled in <strong className="text-white font-semibold">C, C++, and Java</strong>, I enjoy building practical solutions through programming while exploring <strong className="text-white font-semibold">Data Analysis, Artificial Intelligence, and Digital Creativity</strong>. My participation in contests such as the <span className="text-gold-light font-semibold text-gold">Take-Off Programming Contest</span>, <span className="text-gold-light font-semibold text-gold">Unlock the Algorithm Contest</span>, and <span className="text-gold-light font-semibold text-gold">Googling Contest</span> has strengthened my analytical thinking and teamwork skills.
                </p>
                <p>
                  One of my notable projects, the <strong className="text-gold font-bold font-serif">University Exam Seating Management System</strong>, reflects my commitment to continuous learning and software development. Beyond technology, I am passionate about <strong className="text-white font-semibold font-sans">photography</strong>, capturing unique moments and perspectives through my lens.
                </p>
                <p className="text-zinc-400">
                  I am constantly learning, building, and striving to create meaningful solutions that make a real-world impact.
                </p>
              </div>
            </div>

            {/* THE 4 QUICK STATS - EXACT FROM SCREENSHOT */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="p-4 rounded-2xl border border-gold/10 bg-[#181818] flex flex-col hover:border-gold/30 transition-all duration-300 text-left">
                <span className="text-2xl font-serif font-bold text-gold">{profileInfo.stat1Value}</span>
                <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase mt-1">{profileInfo.stat1Label}</span>
              </div>
              <div className="p-4 rounded-2xl border border-gold/10 bg-[#181818] flex flex-col hover:border-gold/30 transition-all duration-300 text-left">
                <span className="text-2xl font-serif font-bold text-gold">{profileInfo.stat2Value}</span>
                <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase mt-1">{profileInfo.stat2Label}</span>
              </div>
              <div className="p-4 rounded-2xl border border-gold/10 bg-[#181818] flex flex-col hover:border-gold/30 transition-all duration-300 text-left">
                <span className="text-2xl font-serif font-bold text-gold">{profileInfo.stat3Value}</span>
                <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase mt-1">{profileInfo.stat3Label}</span>
              </div>
              <div className="p-4 rounded-2xl border border-gold/10 bg-[#181818] flex flex-col hover:border-gold/30 transition-all duration-300 text-left">
                <span className="text-2xl font-serif font-bold text-gold">{profileInfo.stat4Value}</span>
                <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase mt-1">{profileInfo.stat4Label}</span>
              </div>
            </div>

          </div>
          
        </div>

      </div>
    </section>
  );
};
