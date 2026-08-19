export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  colSpan: string;
  aspectRatio?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'web3' | 'development' | 'leadership' | 'ai';
  certificateUrl: string;
}

export interface Exploration {
  id: string;
  title: string;
  category: string;
  image: string;
  rotation: string;
}

export interface SideProject {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  category: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'automotive-motion',
    title: 'Automotive Motion',
    category: '3D & Motion Direction',
    image: '/images/automotive.png',
    colSpan: 'md:col-span-7',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: 'urban-architecture',
    title: 'Urban Architecture',
    category: 'Spatial Design & CGI',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    colSpan: 'md:col-span-5',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'human-perspective',
    title: 'Human Perspective',
    category: 'Digital Portraiture & Experience',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    colSpan: 'md:col-span-5',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    category: 'Creative Direction & Strategy',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    colSpan: 'md:col-span-7',
    aspectRatio: 'aspect-[16/10]',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'IT Bootcamp "Software Development For Industry"',
    issuer: 'Universitas Bina Sarana Informatika',
    date: 'JUN 2025',
    category: 'development',
    certificateUrl: '/sertifikat/sertif bootcamp IT.png',
  },
  {
    id: 'cert-2',
    title: 'Laravel Basic Bootcamp (Speaker)',
    issuer: 'SMK Muhammadiyah 15',
    date: 'AUG 2025',
    category: 'development',
    certificateUrl: '/sertifikat/sertif laravel.png',
  },
  {
    id: 'cert-3',
    title: 'Build On IOTA Workshop',
    issuer: 'Rise In × IOTA',
    date: 'DEC 2025',
    category: 'web3',
    certificateUrl: '/sertifikat/Sertif iota.png',
  },
  {
    id: 'cert-4',
    title: 'Build on Algorand',
    issuer: 'Rise In',
    date: 'NOV 2025',
    category: 'web3',
    certificateUrl: '/sertifikat/Certificates-Build on Algorand-muhammad Luthfi Pratama.png',
  },
  {
    id: 'cert-5',
    title: 'Coding Camp: Intro to Software Engineering',
    issuer: 'RevoU',
    date: 'APR 2026',
    category: 'development',
    certificateUrl: '/sertifikat/codingcamp_CCSE 200426-01-1-00048.png',
  },
  {
    id: 'cert-6',
    title: 'Web3 Fundamental — Blockchain4Youth',
    issuer: 'Bitget',
    date: '2026',
    category: 'web3',
    certificateUrl: '/sertifikat/Web3 Fundamental Bitget.jpeg',
  },
  {
    id: 'cert-7',
    title: 'AI Fluency Framework & Foundations',
    issuer: 'AI Training Program',
    date: '2026',
    category: 'ai',
    certificateUrl: '/sertifikat/AI Fluency Framework & Foundations.png',
  },
  {
    id: 'cert-8',
    title: 'HIMSI Leadership Training "We Have Color to Be Leader"',
    issuer: 'HIMSI Universitas Bina Sarana Informatika',
    date: 'NOV 2023',
    category: 'leadership',
    certificateUrl: '/sertifikat/sertif himsi.png',
  },
];

export interface TechSkillItem {
  name: string;
  tag?: string;
}

export interface TechCategory {
  id: string;
  title: string;
  category: string;
  tagline: string;
  accent: string;
  badge: string;
  rotation: string;
  skills: TechSkillItem[];
  highlight: string;
  description: string;
  projectsUsed: string[];
}

export const TECH_STACK_CATEGORIES: TechCategory[] = [
  {
    id: 'tech-1',
    title: 'Core Frontend & UI Architecture',
    category: 'Frontend Engineering',
    tagline: 'Modern, reactive, and accessible user interfaces',
    accent: '#38bdf8',
    badge: 'Component Systems',
    rotation: '-2.5deg',
    skills: [
      { name: 'React.js', tag: 'Core' },
      { name: 'TypeScript', tag: 'Language' },
      { name: 'Tailwind CSS', tag: 'Styling' },
      { name: 'JavaScript (ES6+)', tag: 'Core' },
      { name: 'GSAP & Lenis', tag: 'Motion' },
      { name: 'HTML5 / Modern CSS', tag: 'Semantic' },
    ],
    highlight: 'Building pixel-perfect, interactive frontend applications with smooth micro-animations.',
    description:
      'Proficient in building component-driven architectures, responsive interfaces, and interactive user experiences with React, TypeScript, and modern styling solutions.',
    projectsUsed: ['Personal Portfolio System', 'SiGaji Payroll Frontend', 'Bootcamp Web Application'],
  },
  {
    id: 'tech-2',
    title: 'Backend & Server Architecture',
    category: 'Backend Development',
    tagline: 'Robust MVC architecture & RESTful API endpoints',
    accent: '#f43f5e',
    badge: 'Server Architecture',
    rotation: '2.5deg',
    skills: [
      { name: 'Laravel (PHP)', tag: 'Framework' },
      { name: 'RESTful APIs', tag: 'Architecture' },
      { name: 'MVC Design Pattern', tag: 'Pattern' },
      { name: 'Auth (Sanctum/JWT)', tag: 'Security' },
      { name: 'Eloquent ORM', tag: 'ORM' },
      { name: 'CRUD Logic', tag: 'Core' },
    ],
    highlight: 'Speaker & trainer at Laravel Basic Bootcamp with hands-on CRUD and API implementation.',
    description:
      'Experienced in designing and delivering Laravel-powered web backends, secure authentication flows, database migrations, and clean RESTful API integration.',
    projectsUsed: ['SiGaji Employee Payroll System', 'Laravel Basic Bootcamp Workshop'],
  },
  {
    id: 'tech-3',
    title: 'Web3 & Decentralized Tech',
    category: 'Blockchain Exploration',
    tagline: 'Smart contracts, EVM chains, and dApp protocols',
    accent: '#818cf8',
    badge: 'Web3 & Blockchain',
    rotation: '-3deg',
    skills: [
      { name: 'Solidity', tag: 'Smart Contracts' },
      { name: 'EVM Chains', tag: 'Ecosystem' },
      { name: 'ethers.js / Web3.js', tag: 'Integration' },
      { name: 'Web3 Wallets', tag: 'Authentication' },
      { name: 'dApp Architecture', tag: 'Frontend' },
      { name: 'IOTA & Algorand', tag: 'Certified' },
    ],
    highlight: 'Certified across Rise In (IOTA & Algorand) and Bitget Blockchain4Youth programs.',
    description:
      'Passionate about decentralized systems, smart contract execution, token standards, and bridging modern web applications to blockchain infrastructure.',
    projectsUsed: ['Rise In IOTA Workshop', 'Build on Algorand dApp', 'Bitget Web3 Fundamentals'],
  },
  {
    id: 'tech-4',
    title: 'Databases & Data Modeling',
    category: 'Data Management',
    tagline: 'Relational schema design and data integrity',
    accent: '#34d399',
    badge: 'Database & SQL',
    rotation: '3deg',
    skills: [
      { name: 'MySQL', tag: 'Relational' },
      { name: 'PostgreSQL', tag: 'Database' },
      { name: 'ERD Modeling', tag: 'Design' },
      { name: 'Query Optimization', tag: 'Performance' },
      { name: 'Database Migrations', tag: 'DevOps' },
      { name: 'Data Seeding', tag: 'Testing' },
    ],
    highlight: 'Structured database schemas designed for payroll calculations and organizational records.',
    description:
      'Skilled in relational database modeling, writing optimized SQL queries, defining relational integrity constraints, and handling automated migrations.',
    projectsUsed: ['SiGaji Relational Schema', 'HIMSI Member Management System'],
  },
  {
    id: 'tech-5',
    title: 'Project Management & Leadership',
    category: 'Team Delivery & Leadership',
    tagline: 'Agile execution, team coordination, and tech mentoring',
    accent: '#fbbf24',
    badge: 'Leadership & PM',
    rotation: '-2deg',
    skills: [
      { name: 'Agile & Scrum', tag: 'Methodology' },
      { name: 'Team Leadership', tag: 'Project Manager' },
      { name: 'Sprint Planning', tag: 'Management' },
      { name: 'Technical Mentoring', tag: 'Speaker' },
      { name: 'Public Speaking', tag: 'Bootcamp' },
      { name: 'Organization Ops', tag: 'BPH HIMSI' },
    ],
    highlight: 'Led a software team to successful delivery as Project Manager at IT Bootcamp (Sentul).',
    description:
      'Proven experience leading cross-functional teams under tight deadlines, presenting technical workshops, and maintaining organization cohesion as a HIMSI board member.',
    projectsUsed: ['IT Bootcamp Software Development For Industry', 'HIMSI Daily Board Management'],
  },
  {
    id: 'tech-6',
    title: 'Modern Tooling & AI Workflow',
    category: 'Developer Productivity',
    tagline: 'High-velocity dev setup with AI-assisted acceleration',
    accent: '#c084fc',
    badge: 'Tools & Workflow',
    rotation: '2deg',
    skills: [
      { name: 'Git & GitHub', tag: 'VCS' },
      { name: 'Postman', tag: 'API Testing' },
      { name: 'Vite & npm', tag: 'Build Tools' },
      { name: 'AI-Assisted Dev', tag: 'Cursor / Copilot' },
      { name: 'Linux / Bash', tag: 'Environment' },
      { name: 'Figma / UI Spec', tag: 'Design Handoff' },
    ],
    highlight: 'Leveraging AI-augmented engineering workflows for rapid prototyping and clean refactoring.',
    description:
      'Experienced in maintaining clean git branching strategies, testing API contracts via Postman, and integrating AI coding tools to optimize daily software engineering output.',
    projectsUsed: ['All Web Repositories', 'API Integration Testing', 'Collaborative Team Git Workflows'],
  },
];

export const EXPLORATIONS = TECH_STACK_CATEGORIES;

export const SIDE_PROJECTS: SideProject[] = [
  {
    id: 'sp-1',
    title: 'Synthwave Radio',
    description:
      'A retro-futuristic web radio player with real-time audio visualization, built as a love letter to 80s aesthetics and modern web audio APIs.',
    image:
      'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=1200&auto=format&fit=crop',
    tags: ['React', 'Web Audio API', 'Canvas', 'GSAP'],
    link: '#',
    category: 'Web App',
  },
  {
    id: 'sp-2',
    title: 'Terrain Generator',
    description:
      'Procedural terrain engine running entirely in the browser. Uses layered Perlin noise, hydraulic erosion simulation, and custom GLSL shaders.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    tags: ['Three.js', 'GLSL', 'TypeScript', 'WebGL'],
    link: '#',
    category: 'Creative Tech',
  },
  {
    id: 'sp-3',
    title: 'Markdown Atelier',
    description:
      'A minimal, distraction-free markdown editor with live preview, syntax highlighting, and local-first storage. Designed for writers who think in plain text.',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'MDX', 'IndexedDB', 'Tailwind'],
    link: '#',
    category: 'Developer Tool',
  },
  {
    id: 'sp-4',
    title: 'Motion Palette',
    description:
      'An interactive gallery of curated micro-animations and transition patterns. Copy-paste ready code snippets for Framer Motion, CSS, and GSAP.',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    tags: ['Framer Motion', 'GSAP', 'React', 'Storybook'],
    link: '#',
    category: 'Design Resource',
  },
  {
    id: 'sp-5',
    title: 'Night Owl CLI',
    description:
      'A terminal-based productivity dashboard for developers. Pomodoro timer, git stats, Spotify integration, and weather — all without leaving the terminal.',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    tags: ['Rust', 'TUI', 'REST APIs', 'CLI'],
    link: '#',
    category: 'CLI Tool',
  },
];

export const STATS: StatItem[] = [
  {
    value: '3.78',
    label: 'Current GPA',
    subtext: 'Actively pursuing Information Systems degree at Universitas Bina Sarana Informatika.',
  },
  {
    value: '8+',
    label: 'Certifications',
    subtext: 'Across Web3, Laravel, software engineering, and leadership training programs.',
  },
  {
    value: '100%',
    label: 'Project Delivery',
    subtext: 'Successfully led and delivered bootcamp projects on time with team coordination.',
  },
];
