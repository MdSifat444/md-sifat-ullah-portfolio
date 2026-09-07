import React from 'react';
import { Code } from 'lucide-react';
import { ProfileInfo } from '../App';
import { Skill, AcademicTimeline } from '../types';

interface SkillsTimelineTabProps {
  profileInfo: ProfileInfo;
  initialSkills: Skill[];
  initialTimeline: AcademicTimeline[];
  iconMap: Record<string, React.ComponentType<any>>;
}

export const SkillsTimelineTab: React.FC<SkillsTimelineTabProps> = ({ 
  profileInfo, 
  initialSkills, 
  initialTimeline, 
  iconMap 
}) => {
  return (
    <div>
      {/* SKILLS SECTION - BENTO STYLE */}
      <section id="skills" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-left mb-16">
            <h3 className="font-serif text-3xl font-bold text-white mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full inline-block"></span> Technical Skills & Toolbox
            </h3>
          </div>

          {/* SKILLS GRID - BENTO ROUNDED CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {initialSkills.map((skill, index) => {
              const SpecificIcon = iconMap[skill.icon] || Code;
              return (
                <div 
                  key={skill.name}
                  className="p-6 md:p-8 bg-[#111111] border border-gold/10 rounded-3xl hover:border-gold/30 hover:bg-white/[0.01] flex flex-col items-start transition-all duration-300 shadow-md group relative overflow-hidden text-left"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300 mb-5">
                    <SpecificIcon size={20} strokeWidth={1.5} />
                  </div>
                  
                  <span className="text-white font-serif font-semibold text-lg uppercase tracking-wide">
                    {skill.name}
                  </span>
                  
                  <p className="text-xs text-zinc-500 group-hover:text-zinc-400 leading-relaxed font-sans mt-2 transition-colors">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ACADEMIC BACKGROUND */}
      <section className="py-16 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            <div className="lg:col-span-4 bg-[#111111] border border-gold/15 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-xl text-left">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full pointer-events-none" />
              <div>
                <h3 className="font-serif text-3xl font-bold text-white flex items-center gap-2 pt-2">
                  <span className="w-2 h-2 bg-gold rounded-full inline-block"></span> Academic Background
                </h3>
                <p className="text-zinc-400 text-sm mt-6 leading-relaxed font-sans">
                  Academic milestones shaping logical faculties, software design values, and continuous system optimization techniques.
                </p>
              </div>
              <div className="pt-8 border-t border-gold/15 mt-6 lg:mt-0">
                <span className="text-xs text-zinc-500 font-mono block tracking-wider uppercase">{profileInfo.institution}</span>
              </div>
            </div>

            {/* TIMELINE VIEW (EXACTLY MATCHES CONTENT FROM SCREENSHOT) */}
            <div className="lg:col-span-8 bg-[#111111] border border-gold/15 rounded-3xl p-8 md:p-10 shadow-xl relative pl-12 md:pl-16 space-y-12 before:absolute before:left-8 before:top-10 before:bottom-10 before:w-[1px] before:bg-gold/10 overflow-hidden">
              {initialTimeline.map((item) => (
                <div key={item.id} className="relative group text-left">
                  {/* Glowing indicator */}
                  <div className="absolute -left-[37px] md:-left-[41px] top-1.5 w-4 h-4 rotate-45 border border-gold bg-[#111111] flex items-center justify-center z-10 transition-transform group-hover:scale-110 duration-300">
                    <div className="w-1.5 h-1.5 bg-gold" />
                  </div>

                  <span className="font-mono text-xs tracking-[0.2em] text-gold uppercase block mb-2">
                    STUDY TIMELINE <span className="text-zinc-600 mx-1.5">·</span> {item.period}
                  </span>

                  <h4 className="font-serif text-2xl font-bold text-white leading-tight">
                    {item.degree}
                  </h4>
                  <p className="text-[#e2e8f0]/80 text-lg font-medium mt-1">
                    {item.institution}
                  </p>

                  <div className="mt-4 space-y-3">
                    <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Courses Tags blocks */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {item.courses.map((course) => (
                      <span key={course} className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono rounded-full hover:border-gold hover:text-white transition-colors">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
