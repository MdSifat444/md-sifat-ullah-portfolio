import React from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, MessageSquare, X } from 'lucide-react';
import { ProfileInfo } from '../App';
import { AnimatePresence, motion } from 'motion/react';

interface ContactTabProps {
  profileInfo: ProfileInfo;
  contactName: string;
  setContactName: (val: string) => void;
  contactEmail: string;
  setContactEmail: (val: string) => void;
  contactMsg: string;
  setContactMsg: (val: string) => void;
  msgStatus: boolean;
  handleContactSubmit: (e: React.FormEvent) => void;
  messages: any[];
  deleteMessage: (idx: number) => void;
}

export const ContactTab: React.FC<ContactTabProps> = ({
  profileInfo,
  contactName,
  setContactName,
  contactEmail,
  setContactEmail,
  contactMsg,
  setContactMsg,
  msgStatus,
  handleContactSubmit,
  messages,
  deleteMessage
}) => {
  return (
    <section id="contact" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-left">
          <h3 className="font-serif text-3xl font-bold text-white mb-16 flex items-center gap-2">
            <span className="w-2 h-2 bg-gold rounded-full"></span> Contact Details
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CHANNELS - BENTO STATS STYLE */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-4 text-left">

            {/* Email address */}
            <div className="p-5 border border-gold/30 hover:border-gold bg-[#111111] rounded-3xl flex items-center gap-5 hover:bg-gold/5 transition-all shadow-md group">
              <div className="w-12 h-12 bg-gold/15 border border-gold/30 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300">
                <Mail size={18} strokeWidth={1.5} />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-wider text-gold-light/60 uppercase block">EMAIL</span>
                <a href={`mailto:${profileInfo.email}`} className="text-base text-gold hover:text-white transition-colors font-semibold">
                  {profileInfo.email}
                </a>
              </div>
            </div>

            {/* GitHub info */}
            <div className="p-5 border border-gold/30 hover:border-gold bg-[#111111] rounded-3xl flex items-center gap-5 hover:bg-gold/5 transition-all shadow-md group">
              <div className="w-12 h-12 bg-gold/15 border border-gold/30 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300">
                <Github size={18} strokeWidth={1.5} />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-wider text-gold-light/60 uppercase block">GITHUB</span>
                <a href={profileInfo.github} target="_blank" rel="referrer noopener" className="text-base text-gold hover:text-white transition-colors font-semibold">
                  {profileInfo.github.replace('https://', '')}
                </a>
              </div>
            </div>

            {/* LinkedIn info */}
            <div className="p-5 border border-gold/30 hover:border-gold bg-[#111111] rounded-3xl flex items-center gap-5 hover:bg-gold/5 transition-all shadow-md group">
              <div className="w-12 h-12 bg-gold/15 border border-gold/30 rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300">
                <Linkedin size={18} strokeWidth={1.5} />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-wider text-gold-light/60 uppercase block">LINKEDIN</span>
                <a href={profileInfo.linkedin} target="_blank" rel="referrer noopener" className="text-base text-gold hover:text-white transition-colors font-semibold">
                  {profileInfo.linkedin.replace('https://', '')}
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT FORM - BENTO CARD STYLE */}
          <div className="lg:col-span-12 xl:col-span-7 p-8 md:p-10 border border-gold/15 bg-[#111111] rounded-3xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 blur-3xl rounded-full pointer-events-none" />
            
            <h4 className="font-serif text-2xl font-bold text-white tracking-tight mb-8 text-left">
              Send a Message
            </h4>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              
              {/* Name Input */}
              <div className="text-left">
                <label className="font-mono text-[10px] tracking-widest text-[#a8a29e] block uppercase mb-2">
                  YOUR NAME
                </label>
                <input 
                  type="text" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="John Doe" 
                  required
                  className="w-full bg-[#161616] border border-gold/15 focus:border-gold focus:bg-white/[0.01] outline-none px-4 py-3.5 text-zinc-200 text-sm rounded-2xl tracking-wide transition-all"
                />
              </div>

              {/* Email Input */}
              <div className="text-left">
                <label className="font-mono text-[10px] tracking-widest text-[#a8a29e] block uppercase mb-2">
                  EMAIL ADDRESS
                </label>
                <input 
                  type="email" 
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="john@example.com" 
                  required
                  className="w-full bg-[#161616] border border-gold/15 focus:border-gold focus:bg-white/[0.01] outline-none px-4 py-3.5 text-zinc-200 text-sm rounded-2xl tracking-wide transition-all"
                />
              </div>

              {/* Message Body */}
              <div className="text-left">
                <label className="font-mono text-[10px] tracking-widest text-[#a8a29e] block uppercase mb-2">
                  MESSAGE
                </label>
                <textarea 
                  rows={5}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Hi, I'd like to reach out to you..." 
                  required
                  className="w-full bg-[#161616] border border-gold/15 focus:border-gold focus:bg-white/[0.01] outline-none px-4 py-3.5 text-zinc-200 text-sm rounded-2xl tracking-wide transition-all resize-none"
                />
              </div>

              {/* Success Trigger */}
              <AnimatePresence>
                {msgStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 p-4 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs rounded-2xl font-sans"
                  >
                    <CheckCircle2 size={16} />
                    <span>Your message was sent successfully and saved locally!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-gold hover:bg-gold-light text-black font-mono font-bold tracking-widest text-xs uppercase py-4 transition-all duration-300 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold/10"
              >
                <Send size={12} /> DISPATCH MESSAGE
              </button>

            </form>

            {/* Submissions Inbox Display (Fully Stateful) */}
            {messages.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gold/15">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-bold text-white flex items-center gap-2">
                    <MessageSquare size={16} className="text-gold" /> Active Inbox ({messages.length})
                  </h5>
                  <span className="font-mono text-[9px] tracking-widest text-gold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
                    PERSISTENT RECORD
                  </span>
                </div>

                <div className="space-y-4 max-h-[240px] overflow-y-auto pr-2">
                  {messages.map((item, idx) => (
                    <div key={idx} className="p-4 border border-gold/10 bg-[#161616] rounded-2xl relative group text-left">
                      <button 
                        onClick={() => deleteMessage(idx)}
                        className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete receipt"
                      >
                        <X size={14} />
                      </button>
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <span className="text-xs font-bold text-white block">
                          {item.name} <span className="text-zinc-500 font-mono text-[10px] tracking-normal font-normal">({item.email})</span>
                        </span>
                        <span className="text-[9px] text-zinc-500 font-mono whitespace-nowrap">{item.date}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 font-sans">
                        {item.msg}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
