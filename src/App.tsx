import { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SelectedWorks } from './components/SelectedWorks';
import { ScrollStack } from './components/ScrollStack';
import { Certifications } from './components/Certifications';
import { Explorations } from './components/Explorations';
import { ContactFooter } from './components/ContactFooter';
import { CareerTimeline } from './components/CareerTimeline';
import { RippleGridCanvas } from './components/RippleGridCanvas';

/* ── About Section Data ── */
const ABOUT_DATA = {
  avatarUrl: '/Profil saya-Software Enginner.png',
  heading: 'I build systems,\nnot just code.',
  paragraphs: [
    "I'm an active **Information Systems** student at Universitas Bina Sarana Informatika with a **3.78 GPA**, experienced in leading teams as **Project Manager** to successfully deliver IT bootcamp projects. Strongly interested in **Web3** and continuously expanding technical competencies.",
    "I've contributed as a **board member** of the Information Systems Student Association (HIMSI), served as a **speaker** at a Laravel Basic Bootcamp, and led a team through an industry-focused **software development** bootcamp covering workshop, project work, and final presentation.",
    "I'm accustomed to integrating **AI tools** into daily workflows to improve efficiency and output quality. My tech stack spans **Laravel**, **React.js**, **JavaScript**, and **Tailwind CSS** — always learning, always building.",
  ],
  sideLabel: 'EST. 2023 — JAKARTA',
  stats: [
    { value: 3.78, suffix: '', label: 'CURRENT GPA' },
    { value: 8, suffix: '+', label: 'CERTIFICATIONS' },
    { value: 5, suffix: '+', label: 'PROJECTS DONE' },
  ],
  accentColor: 'rgba(160, 170, 220, 0.75)',
};

const CAREER_MILESTONES = [
  {
    period: '2023 — NOW',
    isCurrent: true,
    role: 'Information Systems Student',
    company: 'Universitas Bina Sarana Informatika',
    description:
      'Pursuing a degree in Information Systems with a 3.78 GPA. Coursework includes Web Programming, Databases, UI/UX Design, and Data Science Algorithms. Final project: SiGaji — a web-based employee payroll system.',
  },
  {
    period: 'NOV 2023 — AUG 2025',
    role: 'Board Member (Daily Management)',
    company: 'HIMSI — Information Systems Student Association',
    description:
      'Actively carried out organizational programs. Completed HIMSI Leadership Training and applied outcomes to mentor new members and maintain team cohesion.',
  },
  {
    period: 'JUNE 2025',
    role: 'Project Manager — IT Bootcamp',
    company: 'Universitas BSI · Asyana Hotel, Sentul',
    description:
      'Led a team in designing and completing an industry-focused software development project, covering a 2.5-hour workshop, 7 hours of project work, and a 3-hour presentation session.',
  },
  {
    period: 'AUGUST 2025',
    role: 'Speaker — Laravel Basic Bootcamp',
    company: 'SMK Muhammadiyah 15, South Jakarta',
    description:
      'Presented fundamental Laravel concepts to 10 participants. Guided hands-on practice and code troubleshooting until participants successfully implemented a CRUD feature.',
  },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-text-primary font-body antialiased selection:bg-stroke selection:text-text-primary relative">
      {/* Global Interactive Ripple Grid Canvas Backdrop */}
      <RippleGridCanvas
        spacing={26}
        radius={220}
        baseColor="rgba(175, 195, 255, 0.42)"
        speed={0.0038}
        amplitude={10}
        backgroundColor="#0a0a0f"
        globalTracking={true}
        className="fixed inset-0 z-0"
      />

      {/* Main Portfolio Layout */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <AboutSection {...ABOUT_DATA} />
          <SelectedWorks />
          <ScrollStack />
          <Explorations />
          <Certifications />
          <CareerTimeline milestones={CAREER_MILESTONES} />
        </main>
        <ContactFooter />
      </div>

      {/* Loading Screen Curtain Overlay */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
    </div>
  );
}
