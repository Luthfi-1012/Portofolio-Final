export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  colSpan: string;
  aspectRatio?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  readTime: string;
  date: string;
  image: string;
  url?: string;
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

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'journal-1',
    title: 'Designing for the Next Generation of Spatial Interfaces',
    readTime: '5 min read',
    date: 'AUG 2026',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'journal-2',
    title: 'The Subtle Art of Micro-Animations in Web Performance',
    readTime: '4 min read',
    date: 'JUL 2026',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'journal-3',
    title: 'Building Dark Mode Systems That Don\'t Cause Eye Strain',
    readTime: '6 min read',
    date: 'JUN 2026',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'journal-4',
    title: 'Why Typography Is 90% of Your Web Portfolio Aesthetic',
    readTime: '3 min read',
    date: 'MAY 2026',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=400&auto=format&fit=crop',
  },
];

export const EXPLORATIONS: Exploration[] = [
  {
    id: 'exp-1',
    title: 'Chrono Sphere',
    category: 'Interactive 3D Shaders',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop',
    rotation: '-3deg',
  },
  {
    id: 'exp-2',
    title: 'Neon Monolith',
    category: 'Generative Architecture',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    rotation: '4deg',
  },
  {
    id: 'exp-3',
    title: 'Aura Prism',
    category: 'Raymarching Light Experiments',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
    rotation: '-2deg',
  },
  {
    id: 'exp-4',
    title: 'Kinetic Drift',
    category: 'Physics-Based Typography',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    rotation: '3deg',
  },
  {
    id: 'exp-5',
    title: 'Cyber Void',
    category: 'Dark Horizon Visuals',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
    rotation: '-4deg',
  },
  {
    id: 'exp-6',
    title: 'Fluid Dynamics',
    category: 'WebGL Particle Fields',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop',
    rotation: '2deg',
  },
];

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
    value: '20+',
    label: 'Years Experience',
    subtext: 'Delivering world-class digital products and high-impact design experiences.',
  },
  {
    value: '95+',
    label: 'Projects Done',
    subtext: 'Across creative direction, fullstack WebGL apps & interactive brand systems.',
  },
  {
    value: '200%',
    label: 'Satisfied Clients',
    subtext: 'Consistently exceeding expectations, timelines, and technical benchmarks.',
  },
];
