import { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SelectedWorks } from './components/SelectedWorks';
import { ScrollStack } from './components/ScrollStack';
import { Journal } from './components/Journal';
import { Explorations } from './components/Explorations';
import { ContactFooter } from './components/ContactFooter';
import { CareerTimeline } from './components/CareerTimeline';
import { RippleGridCanvas } from './components/RippleGridCanvas';

/* ── About Section Data ── */
const ABOUT_DATA = {
  avatarUrl: '/Profil saya-Software Enginner.png',
  heading: 'I design systems,\nnot screens.',
  paragraphs: [
    "I'm a software engineer and creative technologist who believes the best digital products emerge at the intersection of **design systems**, **motion**, and **front-end craft**. Every interface I build starts with a question: how does this make someone feel?",
    "Over the past decade I've shipped products across industries — from **interactive brand platforms** to **data-rich dashboards** and **experimental WebGL canvases**. I care deeply about the details that most people never notice but always feel.",
    "When I'm not writing code, you'll find me exploring generative art, contributing to open-source design tools, or mentoring junior developers who share the same obsession with **pixel-perfect** execution.",
  ],
  sideLabel: 'EST. 2017 — BANDUNG',
  stats: [
    { value: 9, suffix: '+', label: 'YEARS DESIGNING' },
    { value: 48, suffix: '', label: 'PRODUCTS SHIPPED' },
    { value: 12, suffix: 'M', label: 'USERS REACHED' },
  ],
  accentColor: 'rgba(160, 170, 220, 0.75)',
};

const CAREER_MILESTONES = [
  {
    period: '2023 — NOW',
    isCurrent: true,
    role: 'Lead Product Designer',
    company: 'Halcyon Labs',
    description:
      'Leading a team of four across two product lines. Built the token pipeline that now ships to web, iOS and Android from one source.',
  },
  {
    period: '2021 — 2023',
    role: 'Senior Product Designer',
    company: 'Nusa Pay',
    description:
      'Owned the savings and transfers surface from 60k to 1.4M monthly users. Wrote the first design system the engineers actually kept.',
  },
  {
    period: '2019 — 2021',
    role: 'Product Designer',
    company: 'Kolektif Studio',
    description:
      'Agency work — 20+ launches for logistics, health and education clients.',
  },
  {
    period: '2017 — 2019',
    role: 'Junior UI Designer',
    company: 'StartupHive',
    description:
      'Cut teeth on rapid prototyping: 3 MVPs shipped in 18 months, Figma to React handoff workflow.',
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
          <Journal />
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
