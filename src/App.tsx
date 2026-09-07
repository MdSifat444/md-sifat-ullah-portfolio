import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Code, Cpu, Database, GitBranch, Lightbulb, Coffee, FileCode, 
  Braces, Network, Zap, Box, GraduationCap, Globe, Gamepad, ShoppingCart, 
  Award, FileCheck, Mail, MapPin, Plus, X, Camera, ExternalLink, 
  MessageSquare, Trash2, CheckCircle2, Send, Github, Linkedin, Eye, 
  FileBadge2, Settings, Sliders, Edit2, Upload
} from 'lucide-react';
import { 
  INITIAL_TIMELINE, INITIAL_SKILLS, INITIAL_PROJECTS, 
  INITIAL_PHOTOGRAPHY, INITIAL_ACHIEVEMENTS 
} from './data';
import { AboutTab } from './components/AboutTab';
import { SkillsTimelineTab } from './components/SkillsTimelineTab';
import { ProjectsTab } from './components/ProjectsTab';
import { PhotographyTab } from './components/PhotographyTab';
import { CredentialsTab } from './components/CredentialsTab';
import { ContactTab } from './components/ContactTab';
import { 
  Project, Skill, PhotographyItem, AchievementCertificate, AcademicTimeline 
} from './types';

// Let's import the local asset if it handles nicely or fallback elegantly
const SifatAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400";

export interface ProfileInfo {
  name: string;
  title: string;
  tagline: string;
  bio1: string;
  bio2: string;
  quote: string;
  avatarUrl: string;
  institution: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
}

export const DEFAULT_PROFILE: ProfileInfo = {
  name: "Md. Sifat Ullah",
  title: "CSE Undergrad Student",
  tagline: "CSE Student at Daffodil International University. Focused on building elegant, high-impact software solutions.",
  bio1: "I am Md. Sifat Ullah – a passionate Computer Science student who loves solving real-world problems with robust technology.",
  bio2: "Currently studying Computer Science & Engineering at Daffodil International University. Software Engineering and system optimization are my core fields of interest.",
  quote: "I believe every complex problem has an elegant, clean, and optimized solution.",
  avatarUrl: SifatAvatar, 
  institution: "Daffodil International University",
  location: "Dhaka, Bangladesh",
  email: "mdsifatullah241@gmail.com",
  github: "https://github.com/sifatullah",
  linkedin: "https://www.linkedin.com/in/md-sifat-ullah-b051b533b",
  stat1Value: "6+",
  stat1Label: "Projects Done",
  stat2Value: "CSE",
  stat2Label: "Major Track",
  stat3Value: "DIU",
  stat3Label: "University",
  stat4Value: "BD",
  stat4Label: "Bangladesh",
};

const IconMap: { [key: string]: React.ComponentType<any> } = {
  Terminal, Code, Cpu, Database, GitBranch, Lightbulb, Coffee, FileCode, 
  Braces, Network, Zap, Box, GraduationCap, Globe, Gamepad, ShoppingCart, 
  Award, FileCheck, Mail, MapPin, Camera, ExternalLink, FileBadge2
};

export default function App() {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>(() => {
    const saved = localStorage.getItem('sifat_profile_info');
    let parsed;
    if (saved) parsed = JSON.parse(saved);

    if (parsed) {
      if (parsed.email === "sifatullah241@gmail.com" || parsed.email === "sifat@gmail.com" || parsed.email === "sifatullah241@gamil.com" || parsed.email === "mdsifatullah241@gamil.com") {
        parsed.email = "mdsifatullah241@gmail.com";
      }
      if (parsed.linkedin === "https://linkedin.com/in/sifatullah" || parsed.linkedin === "https://linkedin.com/in/sifatullah") {
        parsed.linkedin = "https://www.linkedin.com/in/md-sifat-ullah-b051b533b";
      }
      if (parsed.stat1Value === "12+") {
        parsed.stat1Value = "6+";
      }
      if (!parsed.avatarUrl || parsed.avatarUrl === "" || parsed.avatarUrl.includes("api.dicebear.com") || parsed.avatarUrl.includes("sifat_avatar")) {
        parsed.avatarUrl = SifatAvatar;
      }
      return parsed;
    }
    return DEFAULT_PROFILE;
  });

  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);

  // Authentication override for admin
  const requireAdmin = (action: () => void) => {
    const pwd = prompt("Enter Admin Password to edit:");
    if (pwd === "Sif@t444") {
      action();
    } else {
      if (pwd !== null) {
        alert("Incorrect password. Only the owner can edit.");
      }
    }
  };

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('sifat_projects');
    if (saved) {
      const parsed = JSON.parse(saved);
      const hasLegacy = parsed.some((p: any) => p.id === 'portfolio-website' || p.id === 'student-management');
      if (hasLegacy) {
        return INITIAL_PROJECTS;
      }
      return parsed;
    }
    return INITIAL_PROJECTS;
  });

  const [photography, setPhotography] = useState<PhotographyItem[]>(() => {
    const saved = localStorage.getItem('sifat_photography');
    if (saved) return JSON.parse(saved);
    return INITIAL_PHOTOGRAPHY;
  });

  const [achievements, setAchievements] = useState<AchievementCertificate[]>(() => {
    const saved = localStorage.getItem('sifat_achievements');
    if (saved) return JSON.parse(saved);
    return INITIAL_ACHIEVEMENTS;
  });

  const [messages, setMessages] = useState<Array<{ name: string; email: string; msg: string; date: string }>>(() => {
    const saved = localStorage.getItem('sifat_messages');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Fetch true backend state on mount (with robust fallback)
  useEffect(() => {
    fetch('/api/data?' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error("Mocking static load mode");
        return res.json();
      })
      .then(data => {
        if (data.profileInfo) {
          const parsed = data.profileInfo;
          if (parsed.email === "sifatullah241@gmail.com" || parsed.email === "sifat@gmail.com" || parsed.email === "sifatullah241@gamil.com" || parsed.email === "mdsifatullah241@gamil.com") {
            parsed.email = "mdsifatullah241@gmail.com";
          }
          if (parsed.linkedin === "https://linkedin.com/in/sifatullah" || parsed.linkedin === "https://linkedin.com/in/sifatullah") {
            parsed.linkedin = "https://www.linkedin.com/in/md-sifat-ullah-b051b533b";
          }
          if (parsed.stat1Value === "12+") {
            parsed.stat1Value = "6+";
          }
          if (!parsed.avatarUrl || parsed.avatarUrl === "" || parsed.avatarUrl.includes("api.dicebear.com") || parsed.avatarUrl.includes("sifat_avatar") || parsed.avatarUrl.includes("sifat_profile_pic_")) {
            parsed.avatarUrl = SifatAvatar;
          }
          setProfileInfo(parsed);
        }
        if (data.projects) setProjects(data.projects);
        if (data.photography) setPhotography(data.photography);
        if (data.achievements) setAchievements(data.achievements);
        if (data.messages) setMessages(data.messages);
        setIsDataLoaded(true);
      })
      .catch((e) => {
        console.warn("Backend dynamic service offline, operating fully in durable client localstorage memory mode");
        setIsDataLoaded(true);
      });
  }, []);

  // State sync logic
  useEffect(() => {
    if (!isDataLoaded) return;
    
    localStorage.setItem('sifat_profile_info', JSON.stringify(profileInfo));
    localStorage.setItem('sifat_projects', JSON.stringify(projects));
    localStorage.setItem('sifat_photography', JSON.stringify(photography));
    localStorage.setItem('sifat_achievements', JSON.stringify(achievements));
    localStorage.setItem('sifat_messages', JSON.stringify(messages));

    fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileInfo, projects, photography, achievements, messages })
    }).catch(e => console.warn("Failed to synchronize with backend store:", e));
  }, [profileInfo, projects, photography, achievements, messages, isDataLoaded]);

  // Active Workspace Panel navigation
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'projects' | 'photography' | 'credentials' | 'contact'>('about');

  const scrollToWorkspace = () => {
    setTimeout(() => {
      const el = document.getElementById('workspace-portal');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Section visibility/filtering state triggers
  const [activePhotoTab, setActivePhotoTab] = useState<string>('All');
  const [activeCertificationTab, setActiveCertificationTab] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Modals state managers
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isCredentialModalOpen, setIsCredentialModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [msgStatus, setMsgStatus] = useState<boolean>(false);

  // Form Fields for Message Contact
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  // Add Photo Fields for separate form modal No. 2
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<'Nature' | 'Portrait' | 'Architecture' | 'Daily Life' | 'Campus'>('Nature');
  const [newPhotoLocation, setNewPhotoLocation] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // Add Project Fields for separate form modal No. 3
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjBnDesc, setNewProjBnDesc] = useState('');
  const [newProjEnDesc, setNewProjEnDesc] = useState('');
  const [newProjTags, setNewProjTags] = useState('');
  const [newProjCategory, setNewProjCategory] = useState<'web' | 'mobile' | 'system' | 'ai'>('web');
  const [newProjGithub, setNewProjGithub] = useState('');

  // Submit handlings
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    const newMsgs = [
      {
        name: contactName,
        email: contactEmail,
        msg: contactMsg,
        date: new Date().toLocaleDateString('bn-BD', { hour: '2-digit', minute: '2-digit' })
      },
      ...messages
    ];
    setMessages(newMsgs);
    setMsgStatus(true);
    setContactName('');
    setContactEmail('');
    setContactMsg('');

    setTimeout(() => {
      setMsgStatus(false);
    }, 5000);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    requireAdmin(() => {
      if (!newPhotoTitle || !newPhotoUrl) return;

      const newPhoto: PhotographyItem = {
        id: `custom-pho-${Date.now()}`,
        title: newPhotoTitle,
        caption: newPhotoCaption || 'Captured moment by Sifat.',
        imageUrl: newPhotoUrl,
        category: newPhotoCategory,
        location: newPhotoLocation || 'Bangladesh',
        takenAt: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })
      };

      setPhotography([newPhoto, ...photography]);
      setIsPhotoModalOpen(false);
      setNewPhotoTitle('');
      setNewPhotoCaption('');
      setNewPhotoLocation('');
      setNewPhotoUrl('');
    });
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle || !newProjEnDesc) return;

    const prefixNum = String(projects.length + 1).padStart(2, '0');
    const newProject: Project = {
      id: `custom-proj-${Date.now()}`,
      title: newProjTitle.toUpperCase(),
      bnTitle: newProjTitle.toUpperCase(),
      description: newProjEnDesc,
      bnDescription: newProjBnDesc || newProjEnDesc,
      tags: newProjTags ? newProjTags.split(',').map(t => t.trim().toUpperCase()) : ['React'],
      category: newProjCategory,
      githubUrl: newProjGithub || 'https://github.com/sifatullah',
      numberPrefix: prefixNum,
      icon: newProjCategory === 'web' ? 'Globe' : newProjCategory === 'system' ? 'GraduationCap' : 'Cpu'
    };

    setProjects([...projects, newProject]);
    setIsProjectModalOpen(false);
    setNewProjTitle('');
    setNewProjBnDesc('');
    setNewProjEnDesc('');
    setNewProjTags('');
    setNewProjGithub('');
  };

  // NEW UNIFIED HANDLER: Submits dynamic local credential with image converted base64 or link!
  const handleAddCredential = (newCred: Omit<AchievementCertificate, 'id'>) => {
    const item: AchievementCertificate = {
      ...newCred,
      id: `custom-cred-${Date.now()}`
    };
    setAchievements((prev) => [item, ...prev]);
  };

  const deletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    requireAdmin(() => {
      if (confirm('Are you sure you want to remove this photo?')) {
        setPhotography(photography.filter(p => p.id !== id));
        if (lightboxIndex !== null) setLightboxIndex(null);
      }
    });
  };

  const deleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const deleteCredential = (id: string) => {
    requireAdmin(() => {
      if (confirm('Are you sure you want to delete this credential?')) {
        setAchievements(achievements.filter(a => a.id !== id));
      }
    });
  };

  const deleteMessage = (idx: number) => {
    setMessages(messages.filter((_, i) => i !== idx));
  };

  const photoTabs = ['All', 'Nature', 'Campus', 'Architecture', 'Daily Life'];
  const filteredPhotos = activePhotoTab === 'All' 
    ? photography 
    : photography.filter(p => p.category === activePhotoTab);

  const filteredCredentials = activeCertificationTab === 'All'
    ? achievements
    : achievements.filter(c => c.type === activeCertificationTab);

  const getInitials = (n: string) => {
    if (!n) return 'SU';
    return n.split(' ').map(x => x ? x[0] : '').join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen text-[#e5e5e5] bg-[#050505] font-sans antialiased selection:bg-gold selection:text-black bento-gradient-bg">
      
      {/* Background patterns */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-radial-[circle_800px_at_50%_minus_200px] from-[#e2b857]/5 to-transparent pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-[#e2b857]/15">
        <div id="nav-container" className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-0 md:h-20 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <a href="#" className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#e2e8f0] hover:text-[#e2b857] transition-colors">
              {getInitials(profileInfo.name).split('').join(' . ')}
            </a>
            
            <div className="flex items-center gap-2 md:hidden">
              <button 
                onClick={() => requireAdmin(() => setIsCustomizeModalOpen(true))}
                className="px-3 py-1.5 border border-[#e2b857]/45 bg-[#e2b857]/10 text-[#e2b857] rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 flex items-center gap-1 uppercase font-semibold cursor-pointer"
              >
                <Settings size={10} /> Edit
              </button>
              <button 
                onClick={() => { setActiveTab('contact'); scrollToWorkspace(); }}
                className="px-4 py-1.5 bg-white text-black rounded-full text-[10px] font-mono tracking-wider text-center transition-all duration-300 font-semibold cursor-pointer"
              >
                HIRE
              </button>
            </div>
          </div>
          
          <nav className="flex items-center justify-start lg:justify-center overflow-x-auto pb-1.5 md:pb-0 gap-5 sm:gap-6 md:gap-8 text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-zinc-400 border-t border-white/5 pt-2.5 md:pt-0 md:border-0 w-full md:w-auto scroll-smooth whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              { id: 'about', label: 'ABOUT ME' },
              { id: 'skills', label: 'SKILLS & STUDY' },
              { id: 'projects', label: 'PROJECTS' },
              { id: 'photography', label: 'PHOTOGRAPHY' },
              { id: 'credentials', label: 'AWARD & CERTIFICATIONS' },
              { id: 'contact', label: 'CONTACT' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); scrollToWorkspace(); }} 
                className={`hover:text-[#e2b857] transition-colors duration-300 cursor-pointer text-[11px] sm:text-xs tracking-widest md:tracking-[0.2em] relative py-1 shrink-0 ${activeTab === tab.id ? 'text-[#e2b857] font-bold font-medium' : ''}`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeHeaderTabIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#e2b857]" 
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button 
              onClick={() => requireAdmin(() => setIsCustomizeModalOpen(true))}
              className="px-4 py-2 border border-[#e2b857]/45 bg-[#e2b857]/10 hover:bg-[#e2b857] hover:text-black text-[#e2b857] rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 uppercase font-semibold cursor-pointer"
            >
              <Settings size={13} /> Edit Portfolio
            </button>
            <button 
              onClick={() => { setActiveTab('contact'); scrollToWorkspace(); }}
              className="px-5 py-2 bg-white hover:bg-zinc-200 text-black rounded-full text-xs font-mono tracking-wider text-center transition-all duration-300 font-semibold cursor-pointer animate-pulse-subtle"
            >
              HIRE ME
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[75vh] flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
            
            {/* Left Big Card: Intro */}
            <div className="lg:col-span-12 bg-[#111111] border border-[#e2b857]/15 hover:border-[#e2b857]/30 rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden text-left min-h-[380px] shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#e2b857]/5 blur-3xl rounded-full pointer-events-none"></div>
              
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight leading-none pt-4"
                >
                  {profileInfo.name}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-zinc-400 mt-4 text-base md:text-lg max-w-xl font-sans leading-relaxed"
                >
                  {profileInfo.tagline}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="mt-6 border-l-2 border-[#e2b857] bg-[#e2b857]/5 px-5 py-4 rounded-r-2xl max-w-xl shadow-[inset_0_1px_20px_rgba(226,184,87,0.02)] border-y border-r border-[#e2b857]/10"
                >
                  <p className="italic text-[#e2b857] font-serif text-sm leading-relaxed">
                    "{profileInfo.quote}"
                  </p>
                </motion.div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mt-8">
                  <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono text-zinc-300">Software Engineering</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/15 rounded-full text-xs font-mono text-zinc-300 font-semibold text-[#ebd085]">Full Stack Developer</span>
                  <span className="px-3 py-1 bg-[#e2b857]/10 border border-[#e2b857]/25 rounded-full text-xs font-mono text-[#ebd085]">Competitive Programming</span>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <button 
                    onClick={() => { setActiveTab('about'); scrollToWorkspace(); }}
                    className="px-6 py-3 bg-[#e2b857] text-black hover:bg-[#ebd085] text-xs font-mono tracking-wider font-semibold rounded-full transition-all duration-300 shadow-lg shadow-[#e2b857]/15 cursor-pointer"
                  >
                    DISCOVER MORE
                  </button>
                  <button 
                    onClick={() => { setActiveTab('contact'); scrollToWorkspace(); }}
                    className="px-6 py-3 border border-zinc-700 hover:border-[#e2b857] text-white hover:text-[#e2b857] text-xs font-mono tracking-wider rounded-full transition-all duration-300 cursor-pointer"
                  >
                    GET IN TOUCH
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* DYNAMIC PORTAL CANVAS */}
        <div id="workspace-portal" className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <AboutTab 
                  profileInfo={profileInfo} 
                  onUpdateProfile={(newInfo) => {
                    setProfileInfo(newInfo);
                    localStorage.setItem('sifat_profile_info', JSON.stringify(newInfo));
                  }} 
                  requireAdmin={requireAdmin}
                />
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <SkillsTimelineTab 
                  profileInfo={profileInfo} 
                  initialSkills={INITIAL_SKILLS} 
                  initialTimeline={INITIAL_TIMELINE} 
                  iconMap={IconMap} 
                />
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectsTab 
                  projects={projects} 
                  setIsProjectModalOpen={setIsProjectModalOpen} 
                  deleteProject={deleteProject} 
                  iconMap={IconMap} 
                  requireAdmin={requireAdmin}
                />
              </motion.div>
            )}

            {activeTab === 'photography' && (
              <motion.div
                key="photography"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <PhotographyTab 
                  photoTabs={photoTabs} 
                  activePhotoTab={activePhotoTab} 
                  setActivePhotoTab={setActivePhotoTab} 
                  filteredPhotos={filteredPhotos} 
                  setLightboxIndex={setLightboxIndex} 
                  setIsPhotoModalOpen={setIsPhotoModalOpen} 
                  deletePhoto={deletePhoto} 
                  requireAdmin={requireAdmin}
                />
              </motion.div>
            )}

            {activeTab === 'credentials' && (
              <motion.div
                key="credentials"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <CredentialsTab 
                  activeCertificationTab={activeCertificationTab} 
                  setActiveCertificationTab={setActiveCertificationTab} 
                  filteredCredentials={filteredCredentials} 
                  setIsCredentialModalOpen={setIsCredentialModalOpen} 
                  deleteCredential={deleteCredential} 
                  requireAdmin={requireAdmin}
                  isCredentialModalOpen={isCredentialModalOpen}
                  onAddCredential={handleAddCredential}
                />
              </motion.div>
            )}

            {activeTab === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ContactTab 
                  profileInfo={profileInfo} 
                  contactName={contactName} 
                  setContactName={setContactName} 
                  contactEmail={contactEmail} 
                  setContactEmail={setContactEmail} 
                  contactMsg={contactMsg} 
                  setContactMsg={setContactMsg} 
                  msgStatus={msgStatus} 
                  handleContactSubmit={handleContactSubmit} 
                  messages={messages} 
                  deleteMessage={deleteMessage} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-[#e2b857]/15 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div>
            <h4 className="font-serif text-lg font-bold tracking-widest text-[#e2e8f0] text-center md:text-left">
              {getInitials(profileInfo.name).split('').join(' . ')}
            </h4>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-1">
              © {new Date().getFullYear()} {profileInfo.name} · {profileInfo.institution} · Bangladesh. All Rights Reserved.
            </p>
          </div>

          <div className="flex gap-4">
            <a href={profileInfo.github} target="_blank" rel="noreferrer" className="text-xs font-mono text-[#e2b857] hover:text-white font-semibold transition-colors">
              GITHUB
            </a>
            <span className="text-zinc-700">|</span>
            <a href={profileInfo.linkedin} target="_blank" rel="noreferrer" className="text-xs font-mono text-[#e2b857] hover:text-white font-semibold transition-colors">
              LINKEDIN
            </a>
            <span className="text-zinc-700">|</span>
            <button 
              onClick={() => { setActiveTab('about'); scrollToWorkspace(); }}
              className="text-xs font-mono text-[#ebd085] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
            >
              ABOUT ME
            </button>
          </div>

        </div>
      </footer>

      {/* -------------------- DYNAMIC FORMS AND MODALS MODES -------------------- */}

      {/* 1. PHOTOGRAPHY LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-55 flex flex-col justify-between p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Topbar controls */}
            <div className="flex items-center justify-between text-[#e2e8f0] z-20">
              <span className="font-mono text-xs tracking-widest text-[#e2b857] font-bold">
                SHOT {lightboxIndex + 1} OF {filteredPhotos.length}
              </span>
              <button 
                onClick={() => setLightboxIndex(null)}
                className="p-2 bg-zinc-900 border border-[#e2b857]/20 hover:border-[#e2b857] hover:text-[#e2b857] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Stage Image wrapper */}
            <div className="flex-1 flex items-center justify-center py-6 block relative select-none" onClick={(e) => e.stopPropagation()}>
              
              {/* Prev Button */}
              <button 
                onClick={() => setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length)}
                className="absolute left-4 p-4 border border-[#e2b857]/15 bg-black/50 text-[#e2b857] hover:bg-[#e2b857] hover:text-black transition-colors cursor-pointer z-10 text-xs font-mono font-bold"
              >
                PREV
              </button>

              <img 
                src={filteredPhotos[lightboxIndex].imageUrl} 
                alt={filteredPhotos[lightboxIndex].title} 
                referrerPolicy="no-referrer"
                className="max-h-[70vh] max-w-[85vw] object-contain border border-[#e2b857]/20 shadow-[0_0_50px_rgba(226,184,87,0.08)] bg-zinc-950"
              />

              {/* Next Button */}
              <button 
                onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length)}
                className="absolute right-4 p-4 border border-[#e2b857]/15 bg-black/50 text-[#e2b857] hover:bg-[#e2b857] hover:text-black transition-colors cursor-pointer z-10 text-xs font-mono font-bold"
              >
                NEXT
              </button>
            </div>

            {/* Bottom info banner */}
            <div className="text-center z-10 pb-4 max-w-2xl mx-auto" onClick={(e) => e.stopPropagation()}>
              <h4 className="font-serif text-3xl font-medium text-[#e2b857] mb-1">
                {filteredPhotos[lightboxIndex].title}
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                {filteredPhotos[lightboxIndex].caption}
              </p>
              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-stone-550 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin size={11} className="text-[#e2b857]/40" /> {filteredPhotos[lightboxIndex].location}
                </span>
                <span>•</span>
                <span>TAKEN AT: {filteredPhotos[lightboxIndex].takenAt}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. ADD PHOTOGRAPHY PICTURE MODAL */}
      <AnimatePresence>
        {isPhotoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setIsPhotoModalOpen(false)}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#111111] border border-[#e2b857]/30 p-8 w-full max-w-lg z-10 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl"
            >
              <button 
                onClick={() => setIsPhotoModalOpen(false)}
                className="absolute top-6 right-6 text-[#a8a29e] hover:text-[#e2b857] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <h4 className="font-serif text-2xl text-[#e2b857] font-medium tracking-wide mb-6">
                Upload New Photography
              </h4>

              <form onSubmit={handleAddPhoto} className="space-y-4 text-left">
                <div>
                  <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                    PICTURE TITLE *
                  </label>
                  <input 
                    type="text" 
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    placeholder="e.g. Autumn Sunrise"
                    required
                    className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                    CAPTION (SHORT OVERVIEW)
                  </label>
                  <input 
                    type="text" 
                    value={newPhotoCaption}
                    onChange={(e) => setNewPhotoCaption(e.target.value)}
                    placeholder="e.g. Golden hour rays hitting lake side..."
                    className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                      CATEGORY *
                    </label>
                    <select 
                      value={newPhotoCategory}
                      onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                      className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3 py-2.5 text-zinc-100 text-xs rounded-xl cursor-pointer"
                    >
                      <option value="Nature">Nature</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Daily Life">Daily Life</option>
                      <option value="Campus">Campus</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                      LOCATION
                    </label>
                    <input 
                      type="text" 
                      value={newPhotoLocation}
                      onChange={(e) => setNewPhotoLocation(e.target.value)}
                      placeholder="e.g. DIU Smart City"
                      className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                    UPLOAD IMAGE FILE OR LINK *
                  </label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement('canvas');
                            const MAX_DIM = 1200;
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
                              setNewPhotoUrl(canvas.toDataURL('image/jpeg', 0.85));
                            }
                          };
                          img.src = event.target?.result as string;
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    required={!newPhotoUrl}
                    className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2 text-zinc-400 text-xs file:mr-4 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[10px] file:font-mono file:bg-[#e2b857]/10 file:text-[#e2b857] hover:file:bg-[#e2b857]/20 cursor-pointer rounded-xl"
                  />
                  {newPhotoUrl ? (
                    <span className="text-[10px] text-green-500 block mt-1">Image loaded beautifully! Ready to save.</span>
                  ) : (
                    <input 
                      type="url" 
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      placeholder="Or paste direct image URL string here"
                      className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl mt-2"
                    />
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#e2b857] hover:bg-[#ebd085] text-black py-3 text-xs tracking-widest font-mono font-bold uppercase transition-all rounded-full cursor-pointer mt-4"
                >
                  SAVE PICTURE TO SHOWCASE
                </button>
              </form>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* 3. ADD PROJECT CARD MODAL */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setIsProjectModalOpen(false)}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#111111] border border-[#e2b857]/30 p-8 w-full max-w-lg z-10 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl"
            >
              <button 
                onClick={() => setIsProjectModalOpen(false)}
                className="absolute top-6 right-6 text-[#a8a29e] hover:text-[#e2b857] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <h4 className="font-serif text-2xl text-[#e2b857] font-medium tracking-wide mb-6">
                Add Project Card
              </h4>

              <form onSubmit={handleAddProject} className="space-y-4 text-left">
                <div>
                  <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                    PROJECT TITLE *
                  </label>
                  <input 
                    type="text" 
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    placeholder="e.g. SMART TRAFFIC FLOW CONTROL"
                    required
                    className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                    ENGLISH DESCRIPTION *
                  </label>
                  <textarea 
                    rows={2.5}
                    value={newProjEnDesc}
                    onChange={(e) => setNewProjEnDesc(e.target.value)}
                    placeholder="A brief overview detailing architecture, databases..."
                    required
                    className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2 text-zinc-100 text-xs rounded-xl resize-none block"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                    BENGALI SUBTITLE STATEMENT
                  </label>
                  <input 
                    type="text" 
                    value={newProjBnDesc}
                    onChange={(e) => setNewProjBnDesc(e.target.value)}
                    placeholder="e.g. স্লাইডশো যুক্ত রেসপন্সিভ ওয়েব ড্যাশবোর্ড।"
                    className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                      CATEGORY *
                    </label>
                    <select 
                      value={newProjCategory}
                      onChange={(e) => setNewProjCategory(e.target.value as any)}
                      className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3 py-2.5 text-zinc-100 text-xs rounded-xl cursor-pointer"
                    >
                      <option value="web">Web App (Globe)</option>
                      <option value="system">Systems (GraduationCap)</option>
                      <option value="ai">AI / Data Science (Cpu)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                      TECH TAGS (COMMA SEPARATED)
                    </label>
                    <input 
                      type="text" 
                      value={newProjTags}
                      onChange={(e) => setNewProjTags(e.target.value)}
                      placeholder="e.g. React, C++, Express"
                      className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                    GITHUB / REGISTRY LINK
                  </label>
                  <input 
                    type="url" 
                    value={newProjGithub}
                    onChange={(e) => setNewProjGithub(e.target.value)}
                    placeholder="e.g. https://github.com/sifatullah/my-repo"
                    className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#e2b857] hover:bg-[#ebd085] text-black py-3 text-xs tracking-widest font-mono font-bold uppercase transition-all rounded-full cursor-pointer mt-4"
                >
                  ADD PROJECT TO PORTFOLIO
                </button>
              </form>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* 5. PROFILE EDIT / CUSTOMIZE DIAGN_PL MODAL */}
      <AnimatePresence>
        {isCustomizeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setIsCustomizeModalOpen(false)}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#111111] border border-[#e2b857]/30 p-8 w-full max-w-2xl z-10 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl max-h-[90vh] overflow-y-auto text-left"
            >
              <button 
                onClick={() => setIsCustomizeModalOpen(false)}
                className="absolute top-6 right-6 text-[#a8a29e] hover:text-[#e2b857] transition-colors font-medium cursor-pointer"
              >
                <X size={18} />
              </button>

              <h4 className="font-serif text-2xl text-[#e2b857] font-medium tracking-wide mb-6">
                Customize Profile Details
              </h4>

              <div className="space-y-6">
                {/* Visual Identity Section */}
                <div className="border-b border-[#e2b857]/10 pb-4">
                  <h5 className="text-sm font-semibold text-[#e2b857] mb-4 font-mono uppercase tracking-wider">
                    Basic Identity
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        value={profileInfo.name}
                        onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                        Title / Role
                      </label>
                      <input 
                        type="text" 
                        value={profileInfo.title}
                        onChange={(e) => setProfileInfo({ ...profileInfo, title: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                      Tagline / Headline Statement
                    </label>
                    <input 
                      type="text" 
                      value={profileInfo.tagline}
                      onChange={(e) => setProfileInfo({ ...profileInfo, tagline: e.target.value })}
                      className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                    />
                  </div>
                </div>

                {/* Profile Picture Option */}
                <div className="border-b border-[#e2b857]/10 pb-4">
                  <h5 className="text-sm font-semibold text-[#e2b857] mb-4 font-mono uppercase tracking-wider">
                    Profile Picture Option
                  </h5>
                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                      Avatar Image URL
                    </label>
                    <input 
                      type="url" 
                      value={profileInfo.avatarUrl}
                      onChange={(e) => setProfileInfo({ ...profileInfo, avatarUrl: e.target.value })}
                      placeholder="e.g. https://images.unsplash.com/your-own-pic-link"
                      className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl mb-4"
                    />
                    
                    <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                      Or Upload Your Exact Photo Directly
                    </label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const img = new Image();
                            img.onload = () => {
                              const canvas = document.createElement('canvas');
                              const MAX_DIM = 600;
                              let w = img.width;
                              let h = img.height;
                              if (w > h) {
                                if (w > MAX_DIM) {
                                  h = Math.round((h * MAX_DIM) / w);
                                  w = MAX_DIM;
                                }
                              } else {
                                if (h > MAX_DIM) {
                                  w = Math.round((w * MAX_DIM) / h);
                                  h = MAX_DIM;
                                }
                              }
                              canvas.width = w;
                              canvas.height = h;
                              const ctx = canvas.getContext('2d');
                              if (ctx) {
                                ctx.drawImage(img, 0, 0, w, h);
                                const compressedSrc = canvas.toDataURL('image/jpeg', 0.85);
                                setProfileInfo({ ...profileInfo, avatarUrl: compressedSrc });
                              }
                            };
                            img.src = event.target?.result as string;
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-mono file:bg-[#e2b857]/10 file:text-[#e2b857] hover:file:bg-[#e2b857]/20 cursor-pointer bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2 text-zinc-400 text-xs rounded-xl"
                    />
                    <p className="text-[10px] text-zinc-500 mt-2.5 leading-relaxed">
                      You can drop or choose your exact photo file here. It is compressed locally to fit perfectly inside your web browser secure storage!
                    </p>
                  </div>
                </div>

                {/* Educational Info */}
                <div className="border-b border-[#e2b857]/10 pb-4">
                  <h5 className="text-sm font-semibold text-[#e2b857] mb-4 font-mono uppercase tracking-wider">
                    Education & Social Info
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                        Institution
                      </label>
                      <input 
                        type="text" 
                        value={profileInfo.institution}
                        onChange={(e) => setProfileInfo({ ...profileInfo, institution: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        value={profileInfo.email}
                        onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                        GitHub Profile Link
                      </label>
                      <input 
                        type="url" 
                        value={profileInfo.github}
                        onChange={(e) => setProfileInfo({ ...profileInfo, github: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-[#a8a29e] uppercase block mb-1.5 opacity-80">
                        LinkedIn Profile Link
                      </label>
                      <input 
                        type="url" 
                        value={profileInfo.linkedin}
                        onChange={(e) => setProfileInfo({ ...profileInfo, linkedin: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-3.5 py-2.5 text-zinc-100 text-xs rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Metric Indicators */}
                <div>
                  <h5 className="text-sm font-semibold text-[#e2b857] mb-4 font-mono uppercase tracking-wider">
                    Summary Stats (4 Counters)
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-black/50 p-3 rounded-2xl border border-[#e2b857]/10">
                      <label className="font-mono text-[8px] tracking-wider text-zinc-500 uppercase block mb-1">Stat 1 Value</label>
                      <input 
                        type="text" 
                        value={profileInfo.stat1Value}
                        onChange={(e) => setProfileInfo({ ...profileInfo, stat1Value: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-2.5 py-1.5 text-zinc-100 text-xs rounded-lg text-center"
                      />
                      <label className="font-mono text-[8px] tracking-wider text-zinc-500 uppercase block mt-2 mb-1">Stat 1 Label</label>
                      <input 
                        type="text" 
                        value={profileInfo.stat1Label}
                        onChange={(e) => setProfileInfo({ ...profileInfo, stat1Label: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-2.5 py-1.5 text-[#ebd085] text-xs rounded-lg text-center"
                      />
                    </div>
                    <div className="bg-black/50 p-3 rounded-2xl border border-[#e2b857]/10">
                      <label className="font-mono text-[8px] tracking-wider text-zinc-500 uppercase block mb-1">Stat 2 Value</label>
                      <input 
                        type="text" 
                        value={profileInfo.stat2Value}
                        onChange={(e) => setProfileInfo({ ...profileInfo, stat2Value: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-2.5 py-1.5 text-zinc-100 text-xs rounded-lg text-center"
                      />
                      <label className="font-mono text-[8px] tracking-wider text-zinc-500 uppercase block mt-2 mb-1">Stat 2 Label</label>
                      <input 
                        type="text" 
                        value={profileInfo.stat2Label}
                        onChange={(e) => setProfileInfo({ ...profileInfo, stat2Label: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-2.5 py-1.5 text-[#ebd085] text-xs rounded-lg text-center"
                      />
                    </div>
                    <div className="bg-black/50 p-3 rounded-2xl border border-[#e2b857]/10">
                      <label className="font-mono text-[8px] tracking-wider text-zinc-500 uppercase block mb-1">Stat 3 Value</label>
                      <input 
                        type="text" 
                        value={profileInfo.stat3Value}
                        onChange={(e) => setProfileInfo({ ...profileInfo, stat3Value: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-2.5 py-1.5 text-zinc-100 text-xs rounded-lg text-center"
                      />
                      <label className="font-mono text-[8px] tracking-wider text-zinc-500 uppercase block mt-2 mb-1">Stat 3 Label</label>
                      <input 
                        type="text" 
                        value={profileInfo.stat3Label}
                        onChange={(e) => setProfileInfo({ ...profileInfo, stat3Label: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-2.5 py-1.5 text-[#ebd085] text-xs rounded-lg text-center"
                      />
                    </div>
                    <div className="bg-black/50 p-3 rounded-2xl border border-[#e2b857]/10">
                      <label className="font-mono text-[8px] tracking-wider text-zinc-500 uppercase block mb-1">Stat 4 Value</label>
                      <input 
                        type="text" 
                        value={profileInfo.stat4Value}
                        onChange={(e) => setProfileInfo({ ...profileInfo, stat4Value: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-2.5 py-1.5 text-zinc-100 text-xs rounded-lg text-center"
                      />
                      <label className="font-mono text-[8px] tracking-wider text-zinc-500 uppercase block mt-2 mb-1">Stat 4 Label</label>
                      <input 
                        type="text" 
                        value={profileInfo.stat4Label}
                        onChange={(e) => setProfileInfo({ ...profileInfo, stat4Label: e.target.value })}
                        className="w-full bg-black border border-[#e2b857]/15 focus:border-[#e2b857] outline-none px-2.5 py-1.5 text-[#ebd085] text-xs rounded-lg text-center"
                      />
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => {
                    localStorage.setItem('sifat_profile_info', JSON.stringify(profileInfo));
                    setIsCustomizeModalOpen(false);
                  }}
                  className="w-full bg-[#e2b857] hover:bg-[#ebd085] text-black py-3.5 text-sm tracking-widest font-mono font-bold uppercase transition-all rounded-full cursor-pointer shadow-lg shadow-[#e2b857]/10 font-semibold"
                >
                  SAVE & APPLY CHANGES
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
