export interface Project {
  id: string;
  title: string;
  bnTitle: string;
  description: string;
  bnDescription: string;
  tags: string[];
  category: 'web' | 'mobile' | 'system' | 'ai';
  demoUrl?: string;
  githubUrl?: string;
  numberPrefix: string; // e.g. "01", "02"
  icon: string; // lucide icon name
}

export interface Skill {
  name: string;
  category: 'language' | 'frontend' | 'database' | 'tool' | 'concept';
  icon: string; // lucide icon name
  description: string;
  isPopular?: boolean;
}

export interface PhotographyItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: 'Nature' | 'Portrait' | 'Architecture' | 'Daily Life' | 'Campus';
  location: string;
  takenAt: string;
}

export interface AchievementCertificate {
  id: string;
  title: string;
  bnTitle?: string;
  issuer: string;
  bnIssuer?: string;
  date: string;
  description: string;
  bnDescription?: string;
  credentialUrl?: string;
  imagePlaceholder?: string; // beautiful gold vector or representation
  type: 'achievement' | 'certificate';
}

export interface AcademicTimeline {
  id: string;
  degree: string;
  bnDegree: string;
  institution: string;
  bnInstitution: string;
  period: string;
  description: string;
  bnDescription: string;
  courses: string[];
  status: 'completed' | 'ongoing';
}
