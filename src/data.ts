import { Project, Skill, PhotographyItem, AchievementCertificate, AcademicTimeline } from './types';

export const INITIAL_TIMELINE: AcademicTimeline[] = [
  {
    id: 'diu-cse',
    degree: 'Bachelor of Science in Computer Science & Engineering',
    bnDegree: 'কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং-এ ব্যাচেলর অব সায়েন্স',
    institution: 'Daffodil International University',
    bnInstitution: 'ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটি',
    period: '2023 - PRESENT',
    description: 'Full-time undergraduate program focusing on software development, algorithms, and modern computing technologies.',
    bnDescription: 'সফটওয়্যার ডেভেলপমেন্ট, অ্যালগরিদম এবং আধুনিক কম্পিউটিং প্রযুক্তির উপর বিশেষ গুরুত্ব সহকারে চার বছর মেয়াদী পূর্ণকালীন স্নাতক প্রোগ্রাম।',
    courses: ['Software Engineering', 'Algorithms', 'Database Systems', 'Web Technology', 'OOP'],
    status: 'ongoing'
  }
];

export const INITIAL_SKILLS: Skill[] = [
  {
    name: 'C / C++',
    category: 'language',
    icon: 'Terminal',
    description: 'Foundation programming language, utilized heavily for algorithms and competitive coding.',
    isPopular: true
  },
  {
    name: 'Python',
    category: 'language',
    icon: 'FileCode',
    description: 'General purpose language used for scripting, machine learning integration, and interactive tools.',
    isPopular: true
  },
  {
    name: 'Java',
    category: 'language',
    icon: 'Coffee',
    description: 'Object-Oriented language, utilized in modular system development and academic projects.',
    isPopular: true
  },
  {
    name: 'HTML / CSS',
    category: 'frontend',
    icon: 'Code',
    description: 'The semantic core of web interfaces paired with custom responsive utility styles.',
    isPopular: true
  },
  {
    name: 'Javascript',
    category: 'language',
    icon: 'Braces',
    description: 'Modern ECMA scripting language for high fidelity client side interactive states.',
    isPopular: true
  },
  {
    name: 'React.Js',
    category: 'frontend',
    icon: 'Cpu',
    description: 'Component architecture UI library utilized for designing high response SPAs.',
    isPopular: true
  },
  {
    name: 'MySQL',
    category: 'database',
    icon: 'Database',
    description: 'Relational Database Management System for structured information modeling and querying.',
    isPopular: true
  },
  {
    name: 'Git & Github',
    category: 'tool',
    icon: 'GitBranch',
    description: 'Distributed version control protocols and cloud repository management platforms.',
    isPopular: true
  },
  {
    name: 'Data Structures',
    category: 'concept',
    icon: 'Network',
    description: 'Organizing and structuring spatial information efficiently (Stacks, Queues, Trees, Graphs).',
    isPopular: true
  },
  {
    name: 'Algorithms',
    category: 'concept',
    icon: 'Zap',
    description: 'Computational optimization techniques and problem decomposition logics.',
    isPopular: true
  },
  {
    name: 'OOP',
    category: 'concept',
    icon: 'Box',
    description: 'Object-Oriented Programming principles: Encapsulation, Inheritance, Polymorphism, Abstraction.',
    isPopular: true
  },
  {
    name: 'Problem Solving',
    category: 'concept',
    icon: 'Lightbulb',
    description: 'Algorithmic dynamic programming and logical restructuring of code.',
    isPopular: true
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'exam-seating',
    title: 'University Exam Seating Management System',
    bnTitle: 'University Exam Seating Management System',
    description: 'A PostgreSQL-backed full-stack web application that automates university exam seat allocation for 800 students across 16 rooms and 15 exams, enforcing anti-cheating batch-mixing rules directly at the database level through triggers and constraints.',
    bnDescription: 'একটি PostgreSQL-ব্যাকড ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন যা ১৬টি রুমে ১৫টি পরীক্ষার জন্য ৮০০ জন শিক্ষার্থীর আসন বরাদ্দ স্বয়ংক্রিয়ভাবে অপ্টিমাইজ করে এবং ডাটাবেজ লেভেলে ট্রিগার ও কনস্ট্রেইন্টের মাধ্যমে অসদুপায় রোধে ব্যাচ-মিক্সিং নিয়মাবলী কার্যকর করে।',
    tags: ['PostgreSQL', 'Full-Stack', 'Database Triggers'],
    category: 'web',
    githubUrl: 'https://github.com/sifatullah',
    demoUrl: '#',
    numberPrefix: '01',
    icon: 'Database'
  },
  {
    id: 'restaurant-compiler',
    title: 'Restaurant Bill Generator Using Compiler Design Concepts',
    bnTitle: 'Restaurant Bill Generator Using Compiler Design Concepts',
    description: 'A modular C compiler that processes restaurant orders through all five classical compiler phases (Lexer → Parser → Symbol Table → Semantic Analysis → Code Generation) to produce a VAT-calculated, discount-aware restaurant bill.',
    bnDescription: 'একটি মডুলার সি কম্পাইলার যা রেস্টুরেন্ট অর্ডারগুলোকে কম্পাইলারের পাঁচটি ক্লাসিক্যাল ফেজ (Lexer → Parser → Symbol Table → Semantic Analysis → Code Generation) অতিক্রম করার মাধ্যমে ভ্যাট ও ডিসকাউন্ট হিসাব করে নির্ভুল বিল তৈরি করে।',
    tags: ['C', 'Compiler Design', 'Lexer/Parser'],
    category: 'system',
    githubUrl: 'https://github.com/sifatullah',
    demoUrl: '#',
    numberPrefix: '02',
    icon: 'FileCode'
  },
  {
    id: 'ascend-eco',
    title: 'Ascend Eco Bloom',
    bnTitle: 'Ascend Eco Bloom',
    description: 'A gamified personal growth tracker web application that helps users log daily activities, earn XP rewards, track progress, and measure eco impact through carbon-saving reports.',
    bnDescription: 'একটি গ্যামিফাইড ব্যক্তিগত গ্রোথ ট্র্যাকার ওয়েব অ্যাপ্লিকেশন যা ব্যবহারকারীদের দৈনন্দিন কার্যক্রম বা অভ্যাস ট্র্যাক করতে, এক্সপি (XP) রিওয়ার্ড অর্জন করতে এবং কার্বন-সেভিং রিপোর্টের মাধ্যমে পরিবেশগত প্রভাব পরিমাপ করতে সাহায্য করে।',
    tags: ['WebApp', 'Gamification', 'Sustainability'],
    category: 'web',
    githubUrl: 'https://github.com/sifatullah',
    demoUrl: '#',
    numberPrefix: '03',
    icon: 'Zap'
  },
  {
    id: 'bank-rollback',
    title: 'Bank System With Transaction Rollback',
    bnTitle: 'Bank System With Transaction Rollback',
    description: 'A C-based bank management system that uses linked lists and stacks to manage accounts, handle transactions, and rollback the most recent transaction for error correction.',
    bnDescription: 'সি-প্রোগ্রামিং ভিত্তিক একটি ব্যাংক সিস্টেম যা অ্যাকাউন্ট পরিচালনা, লিনিয়ার ট্রানজেকশন ট্র্যাকিং এবং ভুল সংশোধনের সুবিধার্থে লিংকড লিস্ট এবং স্ট্যাক ব্যবহার করে একদম শেষ ট্রানজেকশন রোলব্যাক করার বৈশিষ্ট্য প্রদান করে।',
    tags: ['C', 'Data Structures', 'Linked Lists'],
    category: 'system',
    githubUrl: 'https://github.com/sifatullah',
    demoUrl: '#',
    numberPrefix: '04',
    icon: 'Network'
  }
];

export const INITIAL_PHOTOGRAPHY: PhotographyItem[] = [
  {
    id: 'pho-1',
    title: 'Golden Fields of Bengal',
    caption: 'Chasing the dramatic golden hour sunbeams slicing through rural crop canopies.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200',
    category: 'Nature',
    location: 'Savar, Dhaka',
    takenAt: 'Nov 2025'
  },
  {
    id: 'pho-2',
    title: 'Daffodil Campus Silhouette',
    caption: 'Dusk settling over Daffodil International University main campus with beautiful modern geometric shadows.',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    category: 'Campus',
    location: 'DIU Smart City, Ashulia',
    takenAt: 'Jan 2026'
  },
  {
    id: 'pho-3',
    title: 'Architectural Rhythm',
    caption: 'Monochrome lines and structured concrete frameworks that evoke high fidelity grids.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    category: 'Architecture',
    location: 'Dhaka City center',
    takenAt: 'Mar 2026'
  },
  {
    id: 'pho-4',
    title: 'Raindrops & Reflections',
    caption: 'Raining streams pool into mirrors capturing reflective portraits of busy commuting souls.',
    imageUrl: 'https://images.unsplash.com/photo-1437419764061-2473afe69fc2?auto=format&fit=crop&q=80&w=1200',
    category: 'Daily Life',
    location: 'Dhanmondi, Dhaka',
    takenAt: 'May 2025'
  },
  {
    id: 'pho-5',
    title: 'The Solitary Boat',
    caption: 'A deep emerald river holding a single wooden ship under misty twilight clouds.',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200',
    category: 'Nature',
    location: 'Shitalakshya River',
    takenAt: 'Oct 2025'
  },
  {
    id: 'pho-6',
    title: 'Geometric Shadows',
    caption: 'Golden light casting deep silhouettes over DIU iconic playground structures.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200',
    category: 'Campus',
    location: 'DIU Ashulia Green Campus',
    takenAt: 'Feb 2026'
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementCertificate[] = [
  {
    id: 'ach-1',
    title: 'DIU Academic Excellence Award',
    bnTitle: 'ডিআইইউ একাডেমিক এক্সিলেন্স অ্যাওয়ার্ড',
    issuer: 'Daffodil International University',
    bnIssuer: 'ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটি',
    date: 'July 2025',
    description: 'Awarded for maintaining outstanding cognitive focus, mathematical problem-solving skills, and top tier SGPA in Computer Science courses.',
    bnDescription: 'কম্পিউটার সায়েন্স কোর্সসমূহে অসাধারণ একাডেমিক ফলাফল এবং গাণিতিক সমস্যা সমাধানে বিশেষ পারদর্শিতার জন্য মেধা বৃত্তি ও পুরস্কার অর্জন।',
    type: 'achievement'
  },
  {
    id: 'cer-1',
    title: 'Database Design Specialist',
    bnTitle: 'ডাটাবেস ডিজাইন স্পেশালিস্ট',
    issuer: 'Cisco Networking Academy / Professional Track',
    bnIssuer: 'সিসকো নেটওয়ার্কিং একাডেমি / প্রফেশনাল ট্র্যাক',
    date: 'Dec 2025',
    description: 'Certified in schema optimization, recursive query normalization, transaction rollbacks, and concurrent connection security using SQL dialects.',
    bnDescription: 'এসকিউএল ডাটাবেস স্কিমা অপ্টিমাইজেশন, রিলেশনাল ডাটা মডেলিং এবং কনকারেন্ট ট্রানজেকশন প্রোটোকলের উপর বিশেষ প্রফেশনাল কোর্স সম্পন্নকারী সার্টিফিকেট।',
    credentialUrl: 'https://www.credly.com',
    type: 'certificate'
  },
  {
    id: 'cer-2',
    title: 'Web Application Developer Credentials',
    bnTitle: 'ওয়েব অ্যাপ্লিকেশন ডেভেলপার ক্রেডেনশিয়াল',
    issuer: 'React Global Engineering Guild',
    bnIssuer: 'রিয়্যাক্ট গ্লোবাল ইঞ্জিনিয়ারিং গিল্ড',
    date: 'March 2026',
    description: 'Validation of advanced client-side component state management, lazy parsing, and asynchronous queue integrations.',
    bnDescription: 'অ্যাডভান্সড ক্লায়েন্ট-সাইড কম্পোনেন্ট স্টেট ম্যানেজমেন্ট, লেজি লোড অপ্টিমাইজেশন এবং এসিনক্রোনাস ডাটা ইন্টারফেস ইন্টিগ্রেশনের উপর বিশেষ যোগ্যতা অর্জন।',
    credentialUrl: 'https://www.credly.com',
    type: 'certificate'
  },
  {
    id: 'ach-2',
    title: 'DIU Intra-University Programming Contest Semifinalist',
    bnTitle: 'ডিআইইউ ইন্ট্রা-ইউনিভার্সিটি প্রোগ্রামিং প্রতিযোগিতা সেমিফাইনালিস্ট',
    issuer: 'DIU Computer & Programming Club (CPC)',
    bnIssuer: 'ডিআইইউ কম্পিউটার অ্যান্ড প্রোগ্রামিং ক্লাব (সিপিসি)',
    date: 'Oct 2025',
    description: 'Ranked in the top 30 contesting teams out of over 150 student teams. Handled intricate spatial geometry and dynamic logic equations in C++ under tight timelines.',
    bnDescription: '১৫০টিরও বেশি প্রতিদ্বন্দী টিমের মধ্যে প্রতিযোগিতায় অন্যতম জটিল জ্যামিতিক এবং ডাইনামিক ডেটা স্ট্রাকচার সমস্যা সমাধান করে শীর্ষ তালিকায় স্থান অর্জন।',
    type: 'achievement'
  }
];
