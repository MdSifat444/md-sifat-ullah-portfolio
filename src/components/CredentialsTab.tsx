import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Award, 
  FileCheck, 
  ExternalLink, 
  Image as ImageIcon, 
  Upload, 
  X, 
  ZoomIn, 
  FileText,
  AlertCircle,
  Eye,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AchievementCertificate } from '../types';

interface CredentialsTabProps {
  activeCertificationTab: string;
  setActiveCertificationTab: (tab: string) => void;
  filteredCredentials: AchievementCertificate[];
  setIsCredentialModalOpen: (open: boolean) => void;
  deleteCredential: (id: string) => void;
  requireAdmin?: (action: () => void) => void;
  
  // Custom extension props to support full-stack adding functionality with images directly
  isCredentialModalOpen?: boolean;
  onAddCredential?: (credential: Omit<AchievementCertificate, 'id'>) => void;
}

export const CredentialsTab: React.FC<CredentialsTabProps> = ({
  activeCertificationTab,
  setActiveCertificationTab,
  filteredCredentials,
  setIsCredentialModalOpen,
  deleteCredential,
  requireAdmin,
  
  // Integrated optional modal handlers
  isCredentialModalOpen = false,
  onAddCredential
}) => {
  // Local state for image zoom/lightbox viewer
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Local state for add certificate form inside modal
  const [formType, setFormType] = useState<'certificate' | 'achievement'>('certificate');
  const [formTitle, setFormTitle] = useState('');
  const [formBengaliTitle, setFormBengaliTitle] = useState('');
  const [formIssuer, setFormIssuer] = useState('');
  const [formIssuerBengali, setFormIssuerBengali] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formVerifyUrl, setFormVerifyUrl] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle local image file upload & convert to Base64 String
  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFormImageUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleClearImage = () => {
    setFormImageUrl('');
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle the form submit inside the dialog
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formIssuer || !formDate) {
      alert("Please fill out all required (*) fields.");
      return;
    }

    if (onAddCredential) {
      onAddCredential({
        type: formType,
        title: formTitle,
        bengaliTitle: formBengaliTitle || undefined,
        issuer: formIssuer,
        issuerBengali: formIssuerBengali || undefined,
        date: formDate,
        description: formDescription,
        credentialUrl: formVerifyUrl || undefined,
        imageUrl: formImageUrl || undefined
      });
      
      // Reset forms
      resetForm();
    } else {
      // Fallback close if parent handles adding state separately
      setIsCredentialModalOpen(false);
    }
  };

  const resetForm = () => {
    setFormTitle('');
    setFormBengaliTitle('');
    setFormIssuer('');
    setFormIssuerBengali('');
    setFormDate('');
    setFormDescription('');
    setFormVerifyUrl('');
    setFormImageUrl('');
    setFileName('');
    setIsCredentialModalOpen(false);
  };

  return (
    <section id="certificates" className="py-16 bg-[#080808] text-zinc-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white flex items-center gap-3 tracking-wide">
              <span className="w-2.5 h-2.5 bg-[#e2b857] rounded-full inline-block animate-pulse shadow-md shadow-[#e2b857]/40"></span> 
              Credentials & Awards
            </h3>
            <p className="text-zinc-500 text-xs font-mono tracking-widest mt-2 uppercase">Official Licenses, Certifications, and Special Achievements</p>
          </div>

          {/* Add New Credential Trigger Button */}
          <button 
            type="button"
            onClick={() => requireAdmin ? requireAdmin(() => setIsCredentialModalOpen(true)) : setIsCredentialModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-6 py-3 bg-[#e2b857] hover:bg-[#ebd085] text-[10px] font-mono text-black tracking-widest font-bold rounded-full transition-all duration-300 shadow-xl shadow-[#e2b857]/10 cursor-pointer hover:shadow-[#e2b857]/20 border border-[#e2b857]"
          >
            <Plus size={14} className="stroke-[2.5]" /> ADD NEW CREDENTIAL
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-[#e2b857]/15">
          {['All', 'achievement', 'certificate'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveCertificationTab(type)}
              className={`px-5 py-2.5 text-[10px] tracking-widest font-mono uppercase transition-all duration-300 rounded-full border cursor-pointer ${
                activeCertificationTab === type 
                  ? 'bg-[#e2b857] border-[#e2b857] text-black font-bold shadow-lg shadow-[#e2b857]/20' 
                  : 'border-[#e2b857]/15 bg-white/5 hover:border-[#e2b857]/40 text-zinc-400 hover:text-white'
              }`}
            >
              {type === 'All' ? 'ALL CREDENTIALS' : type === 'achievement' ? 'AWARDS' : 'CERTIFICATES'}
            </button>
          ))}
        </div>

        {/* Credentials Cards Grid: Aspect Ratio 16:9 Image Top, text below */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCredentials.length > 0 ? (
            filteredCredentials.map((cred) => (
              <div 
                key={cred.id}
                className="p-6 border border-[#e2b857]/10 bg-[#111111]/90 rounded-3xl hover:border-[#e2b857]/35 hover:bg-[#151515] transition-all duration-300 flex flex-col gap-5 relative group shadow-2xl text-left"
              >
                {/* Delete Trigger Button over image / top corner */}
                <button 
                  type="button"
                  onClick={() => deleteCredential(cred.id)}
                  className="absolute top-10 right-10 z-20 text-zinc-400 hover:text-red-400 bg-black/70 backdrop-blur-md p-2 rounded-full border border-white/10 hover:bg-red-500/25 hover:border-red-500/40 transition-all duration-200"
                  title="Delete Credential"
                >
                  <Trash2 size={13} />
                </button>

                {/* Top Section: 16:9 Aspect Ratio Certificate Image Frame */}
                <div className="w-full aspect-[16/9] relative overflow-hidden rounded-2xl border border-white/5 bg-black/50 group-hover:border-[#e2b857]/20 transition-all">
                  {cred.imageUrl ? (
                    <div 
                      onClick={() => setSelectedImage(cred.imageUrl || null)}
                      className="relative w-full h-full cursor-zoom-in group/image"
                    >
                      <img 
                        src={cred.imageUrl} 
                        alt={cred.title} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {/* Image Action Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1.5">
                        <ZoomIn size={22} className="text-[#e2b857] animate-pulse" />
                        <span className="text-[9px] tracking-widest font-mono text-white uppercase bg-black/60 px-3 py-1 rounded-md border border-[#e2b857]/25">
                          EXPAND VIEW
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Elegant Custom Place-holder Gilded Frame for visual consistency */
                    <div className="w-full h-full bg-white/[0.015] border border-dashed border-[#e2b857]/10 flex flex-col items-center justify-center p-6 text-center">
                      <div className="text-zinc-650 group-hover:text-[#e2b857]/50 transition-colors flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center bg-white/5">
                          <ImageIcon size={18} strokeWidth={1} className="text-zinc-500 group-hover:text-[#e2b857]/60" />
                        </div>
                        <span className="text-[8px] font-mono tracking-widest max-w-[150px] leading-tight uppercase font-medium">
                          NO VERIFIED COVER ATTACHED
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Section: Info Content fully below the image */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Badge Pill Type and Date Meta Header */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="text-[#e2b857] p-2 bg-white/5 border border-white/10 rounded-xl group-hover:border-[#e2b857]/25 group-hover:bg-[#e2b857]/10 transition-all duration-300">
                          {cred.type === 'achievement' ? (
                            <Award size={14} strokeWidth={1.5} className="text-[#e2b857]" />
                          ) : (
                            <FileCheck size={14} strokeWidth={1.5} className="text-[#e2b857]" />
                          )}
                        </div>
                        <span className="text-[9px] font-mono tracking-widest text-[#e2b857]/80 uppercase">
                          {cred.type === 'achievement' ? 'AWARD' : 'CERTIFICATE'}
                        </span>
                      </div>

                      <span className="font-mono text-[9px] tracking-wider text-zinc-500">
                        {cred.date}
                      </span>
                    </div>

                    {/* Issuer Metadata */}
                    <span className="font-mono text-[10px] tracking-widest text-zinc-400 block uppercase mb-1">
                      {cred.issuer} 
                      {cred.issuerBengali && <span className="text-zinc-600 block sm:inline"> ({cred.issuerBengali})</span>}
                    </span>

                    {/* Titles */}
                    <h4 className="font-serif text-[17px] font-bold text-white group-hover:text-[#e2b857] transition-colors leading-snug">
                      {cred.title}
                    </h4>
                    {cred.bengaliTitle && (
                      <p className="text-zinc-500 text-xs font-serif mt-1 italic leading-normal">
                        {cred.bengaliTitle}
                      </p>
                    )}

                    {/* Custom Description */}
                    <p className="text-zinc-400 text-xs mt-3.5 leading-relaxed font-sans min-h-[3.5rem] line-clamp-3">
                      {cred.description}
                    </p>
                  </div>

                  {/* Card Actions Line */}
                  <div className="mt-5 pt-4 border-t border-zinc-900 flex flex-wrap gap-2.5 items-center justify-between">
                    <span className={`text-[8.5px] font-mono tracking-widest px-3 py-1 rounded-full ${
                      cred.type === 'achievement' 
                        ? 'bg-amber-500/10 text-[#e2b857] border border-[#e2b857]/20' 
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    } uppercase`}>
                      {cred.type === 'achievement' ? 'AWARD SERIES' : 'LICENSE TRACK'}
                    </span>

                    {cred.credentialUrl && (
                      <a 
                        href={cred.credentialUrl} 
                        target="_blank" 
                        rel="noreferrer noopener"
                        className="text-[9px] font-mono tracking-widest text-[#e2b857] hover:text-white flex items-center gap-1 transition-colors uppercase border-b border-[#e2b857]/20 hover:border-white pb-0.5"
                      >
                        VERIFY LICENSE <ExternalLink size={9} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 px-8 border border-dashed border-[#e2b857]/15 rounded-3xl bg-white/[0.01] text-center">
              <FileText size={40} strokeWidth={1} className="mx-auto text-zinc-650 mb-4" />
              <p className="text-zinc-400 font-serif text-lg">No records found matching current category filter</p>
              <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest mt-1">Try changing categories or add professional certificates</p>
            </div>
          )}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX DIALOG (ZOOM CERTIFICATES) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-6 backdrop-blur-sm cursor-zoom-out"
          >
            <button 
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/15 p-2.5 rounded-full border border-white/10 transition-colors shadow-2xl"
            >
              <X size={20} />
            </button>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-[#e2b857]/20 shadow-2xl shadow-[#e2b857]/10"
            >
              <img 
                src={selectedImage} 
                alt="Zoomed Credentials Preview" 
                className="max-w-full max-h-[80vh] object-contain block mx-auto bg-[#0d0d0d]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD CREDENTIALS DIALOG (PORTALS / MODAL INTERFACE) */}
      <AnimatePresence>
        {isCredentialModalOpen && (
          <div className="fixed inset-0 z-[500] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 min-h-screen">
            
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl bg-[#0d0d0d] border border-[#e2b857]/25 rounded-3xl p-6 md:p-8 shadow-2xl text-left my-8 max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button 
                type="button"
                onClick={() => setIsCredentialModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full border border-white/5 transition-colors z-[60]"
              >
                <X size={18} />
              </button>

              {/* Title Header */}
              <div className="border-b border-[#e2b857]/15 pb-4 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e2b857]/10 border border-[#e2b857]/20 flex items-center justify-center text-[#e2b857]">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold tracking-wide text-white uppercase leading-none">
                    Add New Credential
                  </h3>
                  <span className="text-[10px] font-mono tracking-widest text-[#e2b857]/70 uppercase block mt-1">Archive Certification or Award Achievement</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Stunning 2-Column form inside modal */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* LEFT PALETTE: Form fields (Takes 7 Cols out of 12) */}
                  <div className="lg:col-span-7 space-y-5">
                    
                    {/* Column 1 Row: Type & Date Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold flex items-center gap-1">
                          Credential Type <span className="text-[#e2b857]">*</span>
                        </label>
                        <select
                          value={formType}
                          onChange={(e) => setFormType(e.target.value as any)}
                          className="w-full rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-[#e2b857] text-white p-3 text-sm focus:outline-none transition-all cursor-pointer font-medium"
                        >
                          <option value="certificate">Certification Track</option>
                          <option value="achievement">Award / Achievement Series</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold flex items-center gap-1">
                          Date Recipient <span className="text-[#e2b857]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          placeholder="e.g. Dec 2025"
                          className="w-full rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-[#e2b857] text-white p-3 text-sm focus:outline-none transition-all placeholder-zinc-750 font-medium"
                        />
                      </div>
                    </div>

                    {/* Row 2: Credential English Title and Bengali Optional */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold flex items-center gap-1">
                          Credential Title <span className="text-[#e2b857]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder="e.g. AWS Solutions Architect"
                          className="w-full rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-[#e2b857] text-white p-3 text-sm focus:outline-none transition-all placeholder-zinc-750 font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">
                          Bengali Title (Optional)
                        </label>
                        <input
                          type="text"
                          value={formBengaliTitle}
                          onChange={(e) => setFormBengaliTitle(e.target.value)}
                          placeholder="e.g. সলিউশন আর্কিটেক্ট"
                          className="w-full rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 focus:border-[#e2b857] text-white p-3 text-sm focus:outline-none transition-all placeholder-zinc-800 text-zinc-300"
                        />
                      </div>
                    </div>

                    {/* Row 3: Issuer and Issuer Bengali */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold flex items-center gap-1">
                          Issuing Body <span className="text-[#e2b857]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formIssuer}
                          onChange={(e) => setFormIssuer(e.target.value)}
                          placeholder="e.g. Amazon Web Services"
                          className="w-full rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-[#e2b857] text-white p-3 text-sm focus:outline-none transition-all placeholder-zinc-750 font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold">
                          Issuer Bengali (Optional)
                        </label>
                        <input
                          type="text"
                          value={formIssuerBengali}
                          onChange={(e) => setFormIssuerBengali(e.target.value)}
                          placeholder="e.g. অ্যামাজন ওয়েব সার্ভিসেস"
                          className="w-full rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 focus:border-[#e2b857] text-white p-3 text-sm focus:outline-none transition-all placeholder-zinc-800 text-zinc-300"
                        />
                      </div>
                    </div>

                    {/* Description Textarea */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold">
                        Description (Metrics/Criteria Achieved)
                      </label>
                      <textarea
                        rows={3}
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Certifies verification on robust cloud design models, fault-tolerant infrastructure..."
                        className="w-full rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-[#e2b857] text-white p-3 text-xs focus:outline-none transition-all placeholder-zinc-750 resize-none block"
                      />
                    </div>

                    {/* Verification / Credential URL */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-[#e2b857]/80 uppercase font-bold">
                        Verification URL Link
                      </label>
                      <input
                        type="url"
                        value={formVerifyUrl}
                        onChange={(e) => setFormVerifyUrl(e.target.value)}
                        placeholder="e.g. https://www.credly.com/certs/..."
                        className="w-full rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-[#e2b857] text-white p-3 text-xs focus:outline-none transition-all placeholder-zinc-750"
                      />
                    </div>
                  </div>

                  {/* RIGHT PALETTE: Image Uploader and cover preview (Takes 5 Cols out of 12) */}
                  <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-zinc-900/80 pt-6 lg:pt-0 lg:pl-6 space-y-5">
                    <div className="space-y-3.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[10.5px] font-mono tracking-widest text-[#e2b857] uppercase font-bold flex items-center gap-1.5">
                          Certificate Image Attachment
                        </label>
                        {formImageUrl && (
                          <button
                            type="button"
                            onClick={handleClearImage}
                            className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors font-mono tracking-wider"
                          >
                            <X size={11} /> CLEAR IMAGE
                          </button>
                        )}
                      </div>

                      {/* Drop Drag Area */}
                      <div 
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`h-40 px-4 py-6 text-center border-2 border-dashed rounded-2xl cursor-pointer flex flex-col items-center justify-center transition-all ${
                          dragActive 
                            ? 'border-[#e2b857] bg-[#e2b857]/5' 
                            : formImageUrl && !fileName
                            ? 'border-emerald-500/30 bg-emerald-500/[0.01]'
                            : formImageUrl
                            ? 'border-emerald-500 bg-emerald-500/5'
                            : 'border-zinc-800 bg-zinc-950 hover:border-[#ebd085]/30 hover:bg-zinc-900/20'
                        }`}
                      >
                        <input 
                          ref={fileInputRef}
                          type="file" 
                          accept="image/*"
                          onChange={handleFileInputChange}
                          className="hidden" 
                        />
                        
                        {fileName ? (
                          <div className="space-y-1">
                            <CheckCircle size={28} className="mx-auto text-emerald-450" />
                            <p className="text-xs text-zinc-200 font-serif truncate max-w-[200px]">{fileName}</p>
                            <span className="text-[9px] font-mono text-zinc-500 uppercase">LOCAL FILE CONVERTED</span>
                          </div>
                        ) : formImageUrl ? (
                          <div className="space-y-1">
                            <CheckCircle size={28} className="mx-auto text-emerald-450" />
                            <p className="text-xs text-zinc-250 font-serif">Remote Cover Link Set</p>
                            <span className="text-[9px] font-mono text-emerald-400/80 uppercase">PREVIEW ACTIVE BELOW</span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-zinc-800 flex items-center justify-center mx-auto">
                              <Upload size={18} className="text-zinc-500" />
                            </div>
                            <div>
                              <span className="text-xs text-zinc-350 font-sans font-medium block">Drag & drop certificate image</span>
                              <span className="text-[9.5px] text-zinc-650 block mt-0.5">or click to browse local files</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Direct web URL link option */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono text-zinc-500 block uppercase">Or paste raw document image link:</span>
                        <input
                          type="url"
                          value={formImageUrl.startsWith('data:') ? '' : formImageUrl}
                          onChange={(e) => {
                            setFormImageUrl(e.target.value);
                            setFileName('');
                          }}
                          placeholder="e.g. https://domain.com/certificate.jpg"
                          className="w-full rounded-xl bg-zinc-950 border border-zinc-800 text-xs p-3 focus:outline-none focus:border-[#e2b857] transition-all placeholder-zinc-800 text-zinc-200"
                        />
                      </div>
                    </div>

                    {/* Integrated Live 16:9 aspect preview thumbnail of image document */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[9px] font-mono text-zinc-500 block uppercase">Live Document Status:</span>
                      {formImageUrl ? (
                        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#e2b857]/15 bg-black flex items-center justify-center">
                          <img 
                            src={formImageUrl} 
                            alt="preview thumbnail" 
                            className="w-full h-full object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 bg-emerald-500/90 text-black font-mono font-bold text-[8.5px] px-2 py-0.5 rounded tracking-widest uppercase flex items-center gap-1 shadow-lg">
                            <CheckCircle size={8} /> ATTACHED
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-[16/9] w-full bg-zinc-950 rounded-xl flex flex-col items-center justify-center border border-dashed border-zinc-900 text-zinc-600 text-[10px] font-mono p-4 text-center">
                          <AlertCircle size={15} className="text-zinc-755 mb-1" />
                          <span className="uppercase text-[8px] tracking-wider max-w-[200px] leading-tight">NO DOCUMENT ATTACHED YET</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Save Submit Button */}
                <div className="pt-6 border-t border-zinc-900/80 flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-xs font-mono tracking-widest rounded-xl transition-all duration-300 uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#e2b857] hover:bg-[#ebd085] text-xs font-mono text-black font-bold tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-[#e2b857]/10 uppercase cursor-pointer"
                  >
                    SAVE CREDENTIAL TO ARCHIVE
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
