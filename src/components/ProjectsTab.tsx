import React from 'react';
import { Plus, Trash2, Globe, Github, ExternalLink, Eye } from 'lucide-react';
import { Project } from '../types';

interface ProjectsTabProps {
  projects: Project[];
  setIsProjectModalOpen: (open: boolean) => void;
  deleteProject: (id: string) => void;
  iconMap: Record<string, React.ComponentType<any>>;
  requireAdmin?: (action: () => void) => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({ 
  projects, 
  setIsProjectModalOpen, 
  deleteProject, 
  iconMap,
  requireAdmin
}) => {
  return (
    <section id="projects" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <h3 className="font-serif text-3xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full inline-block"></span> Projects Portfolio
            </h3>
          </div>

          {/* Add Project trigger */}
          <button 
            onClick={() => requireAdmin ? requireAdmin(() => setIsProjectModalOpen(true)) : setIsProjectModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-light text-xs font-mono text-black tracking-widest font-bold rounded-full transition-all duration-300 shadow-lg shadow-gold/10 cursor-pointer"
          >
            <Plus size={14} /> ADD NEW PROJECT
          </button>
        </div>

        {/* PROJECTS TILES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => {
            const ProjectIcon = iconMap[proj.icon] || Globe;
            const isExamSeating = proj.title.toLowerCase().includes('exam seating') || proj.id === 'exam-seating';
            return (
              <div 
                key={proj.id}
                className={`p-8 md:p-10 border rounded-3xl relative flex flex-col justify-between transition-all duration-500 overflow-hidden min-h-[340px] group text-left ${
                  isExamSeating 
                    ? "border-gold bg-gold/[0.04] shadow-[0_10px_40px_rgba(212,175,55,0.15)]" 
                    : "border-gold/15 bg-[#111111] hover:border-gold/30 hover:bg-white/[0.01] shadow-xl"
                }`}
              >
                {/* Delete action */}
                {proj.id.startsWith('custom-') && (
                  <button 
                    onClick={() => deleteProject(proj.id)}
                    className="absolute top-6 right-6 text-zinc-500 hover:text-red-500 transition-colors p-1 z-10"
                    title="Delete custom project"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                {/* Numeric watermark indicator */}
                <span className="absolute right-8 bottom-4 font-serif text-7xl md:text-8xl font-black text-transparent select-none pointer-events-none opacity-[0.02] group-hover:opacity-[0.04] transition-all duration-500" style={{ WebkitTextStroke: "1.5px #d4af37" }}>
                  {proj.numberPrefix}
                </span>

                <div>
                  {/* Signature Project Badge */}
                  {isExamSeating && (
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold text-black text-[9px] font-mono font-bold tracking-widest rounded-full uppercase shadow-lg shadow-gold/20 animate-pulse">
                        ★ Signature Project
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`mb-6 inline-block p-3.5 border rounded-2xl transition-colors ${
                    isExamSeating 
                      ? "text-gold border-gold bg-gold/15" 
                      : "text-gold bg-white/5 border border-white/10 group-hover:border-gold/25 group-hover:bg-gold/10"
                  }`}>
                    <ProjectIcon size={20} strokeWidth={1.5} />
                  </div>

                  {/* Header */}
                  <h4 className="font-serif text-xl md:text-2xl font-bold tracking-tight mb-3 text-gold">
                    {proj.title}
                  </h4>

                  {/* Descriptions */}
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-sans">
                    {proj.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stacks */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tags.map(t => (
                      <span key={t} className="px-2.5 py-1 bg-white/10 border border-white/5 font-mono text-[10px] text-zinc-300 uppercase rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 items-center pt-2">
                    <a 
                      href={proj.githubUrl} 
                      target="_blank" 
                      rel="referrer noopener"
                      className="text-[11px] font-mono tracking-widest text-gold hover:text-white flex items-center gap-1.5 transition-colors uppercase border-b border-gold/15 hover:border-white pb-0.5"
                    >
                      <Github size={11} /> CODEBASE <ExternalLink size={10} />
                    </a>
                    {proj.demoUrl && (
                      <a 
                        href={proj.demoUrl}
                        className="text-[11px] font-mono tracking-widest text-gold hover:text-white flex items-center gap-1.5 transition-colors uppercase border-b border-gold/15 hover:border-white pb-0.5"
                      >
                        <Eye size={11} /> PREVIEW <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
