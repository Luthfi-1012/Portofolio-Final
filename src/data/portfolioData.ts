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

export interface ProjectMediaItem {
  type: 'image' | 'video';
  url: string;
  label: string;
}

export interface SideProject {
  id: string;
  title: string;
  description: string;
  image: string;
  media: ProjectMediaItem[];
  tags: string[];
  link?: string;
  githubUrl?: string;
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
    id: 'abstract-fluidity',
    title: 'Abstract Fluidity',
    category: 'Visual & Brand Identity',
    image: '/images/abstract.png',
    colSpan: 'md:col-span-5',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'digital-craft',
    title: 'Digital Craft',
    category: 'Design Systems',
    image: '/images/digital-craft.png',
    colSpan: 'md:col-span-4',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'spatial-design',
    title: 'Spatial Design',
    category: 'Spatial & Interaction',
    image: '/images/spatial.png',
    colSpan: 'md:col-span-8',
    aspectRatio: 'aspect-[16/10]',
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    role: 'Fullstack Developer Intern',
    company: 'PT. Kreasi Digital Nusantara',
    period: '2024 — Present',
    description:
      'Spearheaded the development of responsive web applications and REST APIs using Laravel and React. Improved frontend load performance by 35% through code splitting and asset optimization.',
    tags: ['Laravel', 'React', 'Tailwind CSS', 'MySQL', 'REST API'],
  },
  {
    role: 'Frontend & Smart Contract Developer',
    company: 'Web3 Academy / Rise In',
    period: '2024',
    description:
      'Built decentralized application frontends with ethers.js and wagmi. Authored and deployed ERC-20 and ERC-721 smart contracts on EVM testnets with comprehensive unit testing.',
    tags: ['Solidity', 'ethers.js', 'Hardhat', 'TypeScript', 'Web3.js'],
  },
  {
    role: 'Head of Web Development Division',
    company: 'BPH HIMSI UBSI',
    period: '2023 — 2024',
    description:
      'Led a team of 8 student developers in building internal university organization portals and event registration systems. Conducted weekly technical workshops on Git, React, and UI/UX best practices.',
    tags: ['Leadership', 'Git Flow', 'Mentoring', 'Project Management', 'Fullstack'],
  },
];

export interface TimelineItem {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Rise In: Build on Algorand Certification',
    issuer: 'Algorand Foundation / Rise In',
    date: '2024',
    category: 'web3',
    certificateUrl: '/sertifikat/Certificates-Build on Algorand-muhammad Luthfi Pratama.png',
  },
  {
    id: 'cert-2',
    title: 'IOTA Developer Certification',
    issuer: 'IOTA Foundation',
    date: '2024',
    category: 'web3',
    certificateUrl: '/sertifikat/Sertif iota.png',
  },
  {
    id: 'cert-3',
    title: 'Web3 Fundamental Certification',
    issuer: 'Bitget Blockchain4Youth',
    date: '2024',
    category: 'web3',
    certificateUrl: '/sertifikat/Web3 Fundamental Bitget.jpeg',
  },
  {
    id: 'cert-4',
    title: 'Mastering Laravel Framework for Modern Web',
    issuer: 'Codepolitan / Laravel Training',
    date: '2024',
    category: 'development',
    certificateUrl: '/sertifikat/sertif laravel.png',
  },
  {
    id: 'cert-5',
    title: 'Software Engineering Coding Camp',
    issuer: 'Coding Camp Indonesia',
    date: '2024',
    category: 'development',
    certificateUrl: '/sertifikat/codingcamp_CCSE 200426-01-1-00048.png',
  },
  {
    id: 'cert-6',
    title: 'AI Fluency Framework & Foundations',
    issuer: 'Anthropic / AI Literacy',
    date: '2024',
    category: 'ai',
    certificateUrl: '/sertifikat/AI Fluency Framework & Foundations.png',
  },
  {
    id: 'cert-7',
    title: 'Pelatihan Project Management & Software Bootcamp',
    issuer: 'Digital Talent Scholarship (Kominfo)',
    date: '2024',
    category: 'leadership',
    certificateUrl: '/sertifikat/sertif bootcamp IT.png',
  },
  {
    id: 'cert-8',
    title: 'Anggota BPH Himpunan Mahasiswa Sistem Informasi',
    issuer: 'HIMSI UBSI',
    date: '2023 — 2024',
    category: 'leadership',
    certificateUrl: '/sertifikat/sertif himsi.png',
  },
];

export interface TechSkill {
  name: string;
  tag: string;
}

export interface TechCategory {
  id: string;
  title: string;
  category: string;
  tagline: string;
  accent: string;
  badge: string;
  rotation: string;
  skills: TechSkill[];
  highlight: string;
  description: string;
  projectsUsed: string[];
}

export const TECH_STACK_CATEGORIES: TechCategory[] = [
  {
    id: 'tech-1',
    title: 'Frontend & UI Engineering',
    category: 'Modern Web & UI',
    tagline: 'Modern, reactive, and accessible user interfaces',
    accent: '#89AACC',
    badge: 'Component Systems',
    rotation: '-2.5deg',
    skills: [
      { name: 'React.js', tag: 'Core SPA' },
      { name: 'TypeScript', tag: 'Type-Safe' },
      { name: 'Tailwind CSS', tag: 'Design System' },
      { name: 'JavaScript (ES6+)', tag: 'Core Logic' },
      { name: 'GSAP & Lenis', tag: 'Smooth Motion' },
      { name: 'HTML5 / Modern CSS', tag: 'Semantics' },
    ],
    highlight: 'Building declarative, fluid component systems with clean state architectures and strict TypeScript types.',
    description:
      'Specialized in creating fast, accessible, and reactive frontend experiences. Strong emphasis on modular architecture, strict type checking, responsive design patterns, and GSAP micro-animations.',
    projectsUsed: ['Personal Portfolio v2', 'Automotive Motion Experience', 'Spatial Design System'],
  },
  {
    id: 'tech-2',
    title: 'Backend & RESTful APIs',
    category: 'Server & Business Logic',
    tagline: 'Scalable REST services, authentication, and business logic',
    accent: '#38bdf8',
    badge: 'Server Architecture',
    rotation: '2.5deg',
    skills: [
      { name: 'Laravel (PHP)', tag: 'Framework' },
      { name: 'RESTful APIs', tag: 'Architecture' },
      { name: 'MVC Design Pattern', tag: 'Structure' },
      { name: 'Auth (Sanctum/JWT)', tag: 'Security' },
      { name: 'Eloquent ORM', tag: 'Database Layer' },
      { name: 'CRUD Logic', tag: 'Core API' },
    ],
    highlight: 'Architected robust RESTful API endpoints with Sanctum token authentication and Eloquent ORM relations.',
    description:
      'Experienced in building maintainable backend applications with Laravel, implementing role-based authentication (Sanctum/JWT), validating request payloads, and structuring clean MVC controllers.',
    projectsUsed: ['SiGaji Backend Service', 'Admin Dashboard REST API', 'Auth Microservices'],
  },
  {
    id: 'tech-3',
    title: 'Web3 & Blockchain',
    category: 'Decentralized Tech',
    tagline: 'Smart contracts, EVM chains, and dApp protocols',
    accent: '#818cf8',
    badge: 'Web3 & Smart Contracts',
    rotation: '-3deg',
    skills: [
      { name: 'Solidity', tag: 'Smart Contracts' },
      { name: 'EVM Chains', tag: 'Ethereum / Testnets' },
      { name: 'ethers.js / Web3.js', tag: 'dApp Connect' },
      { name: 'Web3 Wallets', tag: 'Metamask / Wagmi' },
      { name: 'dApp Architecture', tag: 'Decentralized UI' },
      { name: 'IOTA & Algorand', tag: 'Alternative L1s' },
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
    title: 'Pelindung Satwa — Wildlife Donation UI/UX',
    description:
      'A compassionate wildlife conservation and animal adoption platform designed with empathetic visual hierarchy, intuitive donation flows, and transparent campaign tracking.',
    image: '/Gambar side projects/Figma Project Donasi Pelindung Satwa.png',
    media: [
      {
        type: 'image',
        url: '/Gambar side projects/Figma Project Donasi Pelindung Satwa.png',
        label: 'Figma Complete Wireframe & Flow Spec',
      },
    ],
    tags: ['Figma', 'UI/UX Design', 'Design System', 'Prototyping'],
    link: '#',
    category: 'Figma UI/UX Design',
  },
  {
    id: 'sp-2',
    title: 'WanderLust — Travel Discovery & Booking App',
    description:
      'A modern travel discovery and itinerary planning application featuring curated destination guides, interactive booking cards, and seamless navigation architectures.',
    image: '/Gambar side projects/Figma Project Travel App.png',
    media: [
      {
        type: 'image',
        url: '/Gambar side projects/Figma Project Travel App.png',
        label: 'Mobile Screen Architectures & Destination Flows',
      },
    ],
    tags: ['Figma', 'Mobile UI/UX', 'User Journey', 'Visual Design'],
    link: '#',
    category: 'Figma UI/UX Design',
  },
  {
    id: 'sp-3',
    title: 'Norva Studio — Scandinavian Furniture Store',
    description:
      'An elegant, minimalist furniture e-commerce platform built with fluid video showcases, category filters, interactive spatial previews, and seamless cart management.',
    image: '/Gambar side projects/Norva Furniture Shop.png',
    media: [
      {
        type: 'video',
        url: '/Gambar side projects/Norva Furniture Hero vidio.mp4',
        label: 'Hero Video Showcase & 3D Atmosphere',
      },
      {
        type: 'image',
        url: '/Gambar side projects/Norva Furniture Shop.png',
        label: 'Curated Scandinavian Product Grid',
      },
      {
        type: 'image',
        url: '/Gambar side projects/Norva Furniture app.png',
        label: 'Interior Staging & Cart Management',
      },
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Video Hero', 'E-Commerce'],
    category: 'Web Application',
  },
  {
    id: 'sp-4',
    title: 'Lunera — Luxury Skincare E-Commerce',
    description:
      'A modern and aesthetic skincare web application featuring a curated product catalog, dynamic hero showcase, responsive shopping cart, and smooth micro-interactions.',
    image: '/Gambar side projects/Skincare app hero.png',
    media: [
      {
        type: 'image',
        url: '/Gambar side projects/Skincare app hero.png',
        label: 'Hero Banner & Regimen Customizer',
      },
      {
        type: 'image',
        url: '/Gambar side projects/Skincare app.png',
        label: 'Full Product Catalog & Collections',
      },
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'E-Commerce'],
    category: 'Web Application',
  },
  {
    id: 'sp-5',
    title: 'DeFund — Stellar Soroban Crowdfunding dApp',
    description:
      'A decentralized crowdfunding platform built on the Stellar network with Soroban Rust smart contracts, featuring transparent milestone escrows, testnet wallet authentication, and real-time campaign funding.',
    image: '/Gambar side projects/web3 crowdfund.png',
    media: [
      {
        type: 'image',
        url: '/Gambar side projects/web3 crowdfund.png',
        label: 'Decentralized Campaign Explorer',
      },
      {
        type: 'image',
        url: '/Gambar side projects/web3 crowdfund funding.png',
        label: 'Milestone Funding & Escrow Terminal',
      },
    ],
    tags: ['Stellar Network', 'Soroban (Rust)', 'Smart Contracts', 'React', 'Tailwind CSS'],
    link: 'https://github.com/Luthfi-1012/Crowdfund-Stellar',
    githubUrl: 'https://github.com/Luthfi-1012/Crowdfund-Stellar',
    category: 'Web3 & dApp',
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
