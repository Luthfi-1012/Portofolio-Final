import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowLeft, 
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Sparkles,
  Layers,
  Code2
} from 'lucide-react';
import type { FeaturedProject } from '../data/portfolioData';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { useSmoothScroll } from './SmoothScrollProvider';

const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface FeaturedProjectDetailProps {
  project: FeaturedProject;
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (project: FeaturedProject) => void;
}

type TabType = 'challenge' | 'approach' | 'outcome' | 'whatWeDid';

export const FeaturedProjectDetail: React.FC<FeaturedProjectDetailProps> = ({
  project,
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const curtainOverlayRef = useRef<HTMLDivElement | null>(null);
  const curtainTextRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const tabContentRef = useRef<HTMLDivElement | null>(null);
  
  const [activeTab, setActiveTab] = useState<TabType>('challenge');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCurtain, setShowCurtain] = useState(true);
  const { lenis } = useSmoothScroll();

  const isMobileProject = project.category.toLowerCase().includes('mobile');

  const currentIndex = FEATURED_PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = FEATURED_PROJECTS[(currentIndex - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length];
  const nextProject = FEATURED_PROJECTS[(currentIndex + 1) % FEATURED_PROJECTS.length];

  const screenshots = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [project.image];
  const totalSlides = screenshots.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Tab change animation
  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab || !tabContentRef.current) return;
    
    gsap.fromTo(
      tabContentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
    setActiveTab(tab);
  };

  // Captivating Multi-Slat Shutter Transition & Staggered Case Study Entrance
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    document.body.style.overflow = 'hidden';
    lenis?.stop();
    setIsTransitioning(true);
    setShowCurtain(true);
    setCurrentSlide(0);
    setActiveTab('challenge');

    const overlay = curtainOverlayRef.current;
    const textDeck = curtainTextRef.current;
    const content = contentRef.current;
    const line = lineRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        setShowCurtain(false);
      },
    });

    if (overlay && textDeck && content) {
      const slats = overlay.querySelectorAll('.curtain-slat');

      // Set initial states
      gsap.set(overlay, { opacity: 1, display: 'block' });
      gsap.set(slats, { yPercent: 0 });
      gsap.set(textDeck, { opacity: 1, scale: 1 });
      gsap.set(content, { opacity: 0 });
      if (line) gsap.set(line, { scaleX: 0 });

      // 1. Text & Corners reveal
      tl.fromTo(
        overlay.querySelectorAll('.minimal-corner'),
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
      )
        .fromTo(
          textDeck.querySelector('.minimal-eyebrow'),
          { opacity: 0, y: 10, letterSpacing: '0.4em' },
          { opacity: 1, y: 0, letterSpacing: '0.3em', duration: 0.35, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(
          textDeck.querySelector('.minimal-title'),
          { opacity: 0, y: 18, filter: 'blur(8px)', scale: 0.98 },
          { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 0.45, ease: 'power3.out' },
          '-=0.25'
        );

      if (line) {
        tl.to(
          line,
          { scaleX: 1, duration: 0.4, ease: 'power2.inOut' },
          '-=0.3'
        );
      }

      // 2. Pause for reading/impact
      tl.to({}, { duration: 0.25 })

      // 3. Text deck fades out
        .to(textDeck, {
          opacity: 0,
          scale: 0.96,
          duration: 0.25,
          ease: 'power2.in',
        })

      // 4. Staggered Multi-Slat Shutter Wipe Up
        .to(
          slats,
          {
            yPercent: -100,
            duration: 0.7,
            stagger: {
              each: 0.06,
              from: 'start',
            },
            ease: 'power4.inOut',
          },
          '-=0.1'
        )

      // 5. Case Study Content Reveals with High-End Stagger
        .to(
          content,
          { opacity: 1, duration: 0.1 },
          '-=0.6'
        )
        .fromTo(
          content.querySelector('.case-header-bar'),
          { y: -25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.55'
        )
        .fromTo(
          content.querySelector('.case-left-col'),
          { y: 35, opacity: 0, filter: 'blur(4px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' },
          '-=0.45'
        )
        .fromTo(
          content.querySelector('.case-right-stage'),
          { scale: 1.08, opacity: 0, filter: 'blur(6px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          content.querySelectorAll('.case-badge'),
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, stagger: 0.03, ease: 'back.out(1.7)' },
          '-=0.3'
        );
    }

    return () => {
      tl.kill();
    };
  }, [isOpen, project.id, lenis]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, prevSlide, nextSlide]);

  const handleClose = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const container = containerRef.current;
    if (!container) return;

    gsap.to(container, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.inOut',
      onComplete: () => {
        document.body.style.overflow = '';
        lenis?.start();
        setIsTransitioning(false);
        onClose();
      },
    });
  }, [isTransitioning, lenis, onClose]);

  // Smooth Project Switching with Full Shutter Transition
  const handleSwitchProject = (target: FeaturedProject) => {
    if (isTransitioning) return;

    // Scroll container back to top
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    // Trigger full shutter transition for the new project
    setShowCurtain(true);
    if (onSelectProject) {
      onSelectProject(target);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#07070a] text-text-primary overflow-y-auto"
      data-lenis-prevent
    >
      {/* ── STAGE 1: CAPTIVATING MULTI-SLAT SHUTTER CURTAIN OVERLAY ── */}
      {showCurtain && (
        <div
          ref={curtainOverlayRef}
          className="fixed inset-0 z-[100000] pointer-events-none select-none overflow-hidden"
        >
          {/* 4 Vertical Shutter Slats that wipe upwards in a wave */}
          <div className="absolute inset-0 flex">
            <div className="curtain-slat w-1/4 h-full bg-[#06070a] border-r border-white/[0.04]" />
            <div className="curtain-slat w-1/4 h-full bg-[#06070a] border-r border-white/[0.04]" />
            <div className="curtain-slat w-1/4 h-full bg-[#06070a] border-r border-white/[0.04]" />
            <div className="curtain-slat w-1/4 h-full bg-[#06070a]" />
          </div>

          {/* Center Text Deck & Ambient Aura */}
          <div
            ref={curtainTextRef}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8"
          >
            {/* Subtle Ambient Center Glow */}
            <div className="absolute w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#ff2d87]/15 via-[#818cf8]/15 to-[#38bdf8]/15 blur-[130px] pointer-events-none" />

            {/* 4 Architectural Corner Marks */}
            <div className="minimal-corner absolute top-8 left-8 flex items-center gap-2.5 text-white/30 font-mono text-xs">
              <span className="text-sm font-light text-[#38bdf8]">+</span>
              <span className="tracking-[0.25em] text-[10px] text-white/35">0{currentIndex + 1}</span>
            </div>

            <div className="minimal-corner absolute top-8 right-8 flex items-center gap-2.5 text-white/30 font-mono text-xs">
              <span className="tracking-[0.25em] text-[10px] text-white/35">0{FEATURED_PROJECTS.length}</span>
              <span className="text-sm font-light text-[#38bdf8]">+</span>
            </div>

            <div className="minimal-corner absolute bottom-8 left-8 flex items-center gap-2.5 text-white/30 font-mono text-xs">
              <span className="text-sm font-light text-[#ff2d87]">+</span>
              <span className="tracking-[0.25em] text-[10px] text-white/35">SELECTED WORK</span>
            </div>

            <div className="minimal-corner absolute bottom-8 right-8 flex items-center gap-2.5 text-white/30 font-mono text-xs">
              <span className="tracking-[0.25em] text-[10px] text-white/35">CASE STUDY</span>
              <span className="text-sm font-light text-[#ff2d87]">+</span>
            </div>

            {/* Center Luxury Typography Deck */}
            <div className="relative z-10 text-center max-w-3xl px-6">
              {/* Category Eyebrow */}
              <div className="minimal-eyebrow flex items-center justify-center gap-3 mb-4">
                <span className="w-5 h-px bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent" />
                <span className="text-[11px] text-[#38bdf8] font-mono tracking-[0.3em] uppercase font-medium">
                  {project.category}
                </span>
                <span className="w-5 h-px bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent" />
              </div>

              {/* Title with Serif & Sans Contrast */}
              <h2 className="minimal-title text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight leading-[1.1] mb-5">
                {project.title.split(' ').map((word, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <span className="font-display italic text-white/95 font-normal ml-2">{word}</span>
                    ) : (
                      <span>{word} </span>
                    )}
                  </span>
                ))}
              </h2>

              {/* Hairline Divider Line */}
              <div
                ref={lineRef}
                className="w-28 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto origin-center shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── STAGE 2: CASE STUDY DETAIL VIEW ── */}
      <div ref={contentRef} className="min-h-screen flex flex-col justify-between p-6 md:p-10 lg:p-12 max-w-[1520px] mx-auto">
        
        {/* Top Header Bar */}
        <div className="case-header-bar flex items-center justify-between pb-7 border-b border-white/[0.08] mb-8 lg:mb-12">
          {/* Back to work button */}
          <button
            onClick={handleClose}
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.1] hover:border-white/30 transition-all duration-300 text-xs uppercase tracking-widest font-medium cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to work</span>
          </button>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.1] transition-all duration-300 text-xs uppercase tracking-widest font-medium"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>GitHub Repo</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/70 hover:text-white hover:bg-white/[0.1] transition-all duration-300 cursor-pointer"
              aria-label="Close case study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main 2-Column Case Study Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start flex-1 mb-12">
          
          {/* Left Column (~40% width): Project Specs, Roles, & Tabs */}
          <div className="case-left-col lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category eyebrow */}
              <div className="flex items-center gap-3 mb-3.5">
                <div className="w-6 h-px bg-[#38bdf8]/60" />
                <span className="text-xs text-[#38bdf8] uppercase tracking-[0.3em] font-medium font-mono">
                  {project.category}
                </span>
              </div>

              {/* Title with Serif Accent */}
              <h1 className="text-3xl sm:text-4xl xl:text-5xl text-white font-normal tracking-tight leading-[1.1] mb-4">
                {project.title.split(' ').map((word, i, arr) => (
                  <span key={i}>
                    {i === arr.length - 1 ? (
                      <span className="font-display italic text-white/95">{word}</span>
                    ) : (
                      <span>{word} </span>
                    )}
                  </span>
                ))}
              </h1>

              {/* Tagline / Summary */}
              <p className="text-sm md:text-[15px] text-white/60 leading-relaxed mb-6 font-normal">
                {project.tagline || project.description}
              </p>

              {/* Roles / Capabilities List */}
              <div className="mb-7">
                <span className="text-[11px] text-white/35 uppercase tracking-widest font-mono block mb-2.5">
                  Core Architecture & Roles
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(project.roles || project.tags).map((role) => (
                    <span
                      key={role}
                      className="case-badge px-3 py-1 text-[11px] text-white/75 bg-white/[0.03] border border-white/10 rounded-full font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Case Study Tabs (Challenge / Approach / Outcome / Key Features) */}
              <div className="mb-8">
                <div className="flex border-b border-white/10 gap-2 sm:gap-4 mb-4 overflow-x-auto pb-1">
                  {[
                    { key: 'challenge', label: 'The Challenge' },
                    { key: 'approach', label: 'Approach' },
                    { key: 'outcome', label: 'Outcome' },
                    { key: 'whatWeDid', label: 'Key Features' },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => handleTabChange(tab.key as TabType)}
                      className={`pb-2.5 text-xs uppercase tracking-wider font-mono transition-all duration-300 relative cursor-pointer flex-shrink-0 ${
                        activeTab === tab.key
                          ? 'text-white font-semibold'
                          : 'text-white/40 hover:text-white/75'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.key && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content Box with icons & polished hierarchy */}
                <div
                  ref={tabContentRef}
                  className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] border border-white/[0.08] shadow-xl text-sm text-white/75 leading-relaxed backdrop-blur-sm"
                >
                  {activeTab === 'challenge' && (
                    <div>
                      <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-widest mb-2.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Problem Statement</span>
                      </div>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                        {project.challenge || project.description}
                      </p>
                    </div>
                  )}

                  {activeTab === 'approach' && (
                    <div>
                      <div className="flex items-center gap-2 text-sky-400 text-xs font-mono uppercase tracking-widest mb-2.5">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Technical Architecture</span>
                      </div>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                        {project.approach || project.description}
                      </p>
                    </div>
                  )}

                  {activeTab === 'outcome' && (
                    <div>
                      <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-widest mb-2.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Measurable Impact</span>
                      </div>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                        {project.outcome || project.description}
                      </p>
                    </div>
                  )}

                  {activeTab === 'whatWeDid' && (
                    <div>
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Implemented Capabilities</span>
                      </div>
                      <ul className="space-y-2.5">
                        {(project.whatWeDid || project.tags).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile GitHub link */}
            <div className="sm:hidden mt-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.04] text-white text-xs uppercase tracking-widest font-medium"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>View GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column (~60% width): Adaptive Showcase Gallery */}
          <div className="case-right-stage lg:col-span-7 flex flex-col">
            {/* Main Showcase Stage */}
            <div
              className={`relative rounded-3xl overflow-hidden border border-white/12 shadow-2xl shadow-black/80 group/slider ${
                isMobileProject
                  ? 'min-h-[500px] md:min-h-[540px] flex items-center justify-center p-6 sm:p-8 bg-gradient-to-b from-[#0d1017] via-[#090b10] to-[#07070a]'
                  : 'aspect-[16/10] bg-[#0d0d14]'
              }`}
            >
              {/* Screenshot Display */}
              <img
                src={screenshots[currentSlide]}
                alt={`${project.title} screenshot ${currentSlide + 1}`}
                className={`transition-all duration-500 ${
                  isMobileProject
                    ? 'max-h-[460px] md:max-h-[490px] w-auto h-auto object-contain mx-auto rounded-[2.5rem] border-[3px] border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)]'
                    : 'w-full h-full object-cover'
                }`}
              />

              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#38bdf8]/50 to-transparent" />

              {/* Navigation Arrows */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/90 transition-all duration-200 cursor-pointer z-10"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/90 transition-all duration-200 cursor-pointer z-10"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Counter Pill */}
              {totalSlides > 1 && (
                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] text-white/80 tracking-widest font-mono z-10">
                  {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                </div>
              )}
            </div>

            {/* Thumbnail Navigation Row */}
            {totalSlides > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2 justify-center">
                {screenshots.map((ss, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer flex-shrink-0 bg-black/40 ${
                      isMobileProject ? 'w-12 h-20 p-1' : 'w-20 h-13'
                    } ${
                      idx === currentSlide
                        ? 'border-white opacity-100 scale-105 shadow-lg shadow-black/60'
                        : 'border-white/10 opacity-40 hover:opacity-75'
                    }`}
                  >
                    <img
                      src={ss}
                      alt={`Thumb ${idx + 1}`}
                      className={`w-full h-full ${isMobileProject ? 'object-contain' : 'object-cover'}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Project Navigation (Prev Project / Next Project) */}
        <div className="flex items-center justify-between pt-7 border-t border-white/[0.08]">
          <button
            onClick={() => handleSwitchProject(prevProject)}
            className="group flex items-center gap-3 text-left cursor-pointer p-2 rounded-2xl hover:bg-white/[0.03] transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white/[0.1] transition-all duration-300">
              <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </div>
            <div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono block">
                Previous
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-medium group-hover:text-white transition-colors">
                {prevProject.title}
              </span>
            </div>
          </button>

          <button
            onClick={() => handleSwitchProject(nextProject)}
            className="group flex items-center gap-3 text-right cursor-pointer p-2 rounded-2xl hover:bg-white/[0.03] transition-colors"
          >
            <div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono block">
                Next Project
              </span>
              <span className="text-xs sm:text-sm text-white/80 font-medium group-hover:text-white transition-colors">
                {nextProject.title}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white/[0.1] transition-all duration-300">
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};
