import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowUpRight, 
  X, 
  CheckCircle2, 
  FolderGit2, 
  Sparkles 
} from 'lucide-react';
import { TECH_STACK_CATEGORIES } from '../data/portfolioData';
import type { TechCategory } from '../data/portfolioData';
import { CardShaderCanvas } from './CardShaderCanvas';

gsap.registerPlugin(ScrollTrigger);

// Custom line-art visual module renderer for each engineering card (clean inline specs)
const renderCardVisualSnippet = (id: string) => {
  switch (id) {
    case 'tech-1':
    case 'tech-frontend':
      return (
        <div className="my-3 py-1.5 font-mono text-xs antialiased space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-white flex items-center gap-1.5 font-semibold tracking-tight">
              <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC] animate-pulse" />
              React 19 · TypeScript Strict
            </span>
            <span className="text-xs text-white/80 font-mono">60 FPS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-[#89AACC] to-[#4E85BF] rounded-full" />
            </div>
            <span className="text-xs text-white/90 font-mono">Tailwind UI</span>
          </div>
        </div>
      );

    case 'tech-2':
    case 'tech-backend':
      return (
        <div className="my-3 py-1.5 font-mono text-xs antialiased space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold tracking-tight">POST /api/v1/auth/sanctum</span>
            <span className="text-xs text-[#89AACC] font-semibold">200 OK</span>
          </div>
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>Laravel 11.x · Eloquent ORM</span>
            <span className="text-white/80 font-mono">18ms</span>
          </div>
        </div>
      );

    case 'tech-3':
    case 'tech-web3':
      return (
        <div className="my-3 py-1.5 font-mono text-xs antialiased space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold truncate tracking-tight">EVM :: 0x71C...3a9F</span>
            <span className="text-xs text-[#89AACC] font-semibold">VERIFIED</span>
          </div>
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>Solidity ^0.8.20 · ethers.js</span>
            <span className="text-white/80">Rise In Certified</span>
          </div>
        </div>
      );

    case 'tech-4':
    case 'tech-database':
      return (
        <div className="my-3 py-1.5 font-mono text-xs antialiased space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold tracking-tight">users.id ➔ payroll.user_id</span>
            <span className="text-xs text-[#89AACC] font-semibold">B-TREE</span>
          </div>
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>MySQL 8.0 · PostgreSQL</span>
            <span className="text-white/80">ACID Compliant</span>
          </div>
        </div>
      );

    case 'tech-5':
    case 'tech-management':
      return (
        <div className="my-3 py-1.5 font-mono text-xs antialiased space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold tracking-tight">Sprint Delivery: 100%</span>
            <span className="text-xs text-[#89AACC] font-semibold">SCRUM</span>
          </div>
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>BPH HIMSI · Mentoring</span>
            <span className="text-white/80">10+ Developers</span>
          </div>
        </div>
      );

    case 'tech-6':
    case 'tech-tools':
      return (
        <div className="my-3 py-1.5 font-mono text-xs antialiased space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold tracking-tight">● main ─━─ ● feat/agent</span>
            <span className="text-xs text-[#89AACC] font-semibold">VITE HMR</span>
          </div>
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>Git · Postman · AI Workflow</span>
            <span className="text-white/80">Copilot / Cursor</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

/* ── Interactive Detail Modal Lightbox with Shader Backdrop ── */
const TechDetailModal: React.FC<{
  tech: TechCategory | null;
  onClose: () => void;
}> = ({ tech, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tech) return;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    tl.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' },
      '-=0.1'
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tech]);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to(cardRef.current, { opacity: 0, y: 20, scale: 0.97, duration: 0.2, ease: 'power2.in' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.18, ease: 'power2.in' }, '-=0.08');
  }, [onClose]);

  if (!tech) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={handleClose}
      style={{ opacity: 0 }}
    >
      <div
        ref={cardRef}
        className="relative max-w-2xl w-full bg-[#0d0e14]/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ opacity: 0 }}
      >
        {/* WebGL Fluid Shader in Modal Background */}
        <CardShaderCanvas cardId={tech.id} isHovered={true} className="opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 via-[#0a0a0f]/75 to-[#0a0a0f]/50 pointer-events-none" />

        {/* Subtle accent gradient top line */}
        <div className="absolute top-0 left-0 right-0 h-px accent-gradient opacity-80 z-20" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-surface/80 border border-stroke flex items-center justify-center text-text-primary hover:bg-stroke/40 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Foreground Content */}
        <div className="relative z-10">
          <div className="mb-4 pr-10">
            <span className="text-[10.5px] uppercase font-mono tracking-[0.25em] text-[#89AACC] font-medium">
              {tech.badge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-medium text-text-primary tracking-tight mt-1">
              {tech.title}
            </h3>
          </div>

          <p className="text-sm text-muted mb-6 leading-relaxed">
            {tech.description}
          </p>

          {/* Key Highlight Box */}
          <div className="p-4 rounded-2xl bg-surface/80 border border-stroke mb-6 flex items-start gap-3 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-[#89AACC] shrink-0 mt-0.5" strokeWidth={1.75} />
            <p className="text-xs text-text-primary leading-relaxed font-normal">
              {tech.highlight}
            </p>
          </div>

          {/* Skills Matrix */}
          <div className="mb-6">
            <h4 className="text-[11px] uppercase font-mono tracking-[0.2em] text-muted font-medium mb-3">
              Core Technologies & Methodologies
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tech.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-2.5 rounded-xl bg-surface/70 border border-stroke flex items-center justify-between backdrop-blur-sm"
                >
                  <span className="text-xs font-medium text-text-primary">
                    {skill.name}
                  </span>
                  {skill.tag && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-bg border border-stroke text-muted font-mono">
                      {skill.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Associated Projects */}
          <div className="mb-6">
            <h4 className="text-[11px] uppercase font-mono tracking-[0.2em] text-muted font-medium mb-3">
              Applied In Projects & Roles
            </h4>
            <div className="flex flex-wrap gap-2">
              {tech.projectsUsed.map((proj, pIdx) => (
                <span
                  key={pIdx}
                  className="text-xs px-3 py-1.5 rounded-lg bg-surface/80 border border-stroke text-text-secondary flex items-center gap-2 backdrop-blur-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC]" />
                  {proj}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end pt-4 border-t border-stroke/60">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-full bg-surface/90 border border-stroke text-xs text-text-primary hover:bg-stroke/40 transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Explorations: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);

  const [selectedTech, setSelectedTech] = useState<TechCategory | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Split the 6 tech categories into 2 columns (3 items each)
  const col1Items = TECH_STACK_CATEGORIES.slice(0, 3);
  const col2Items = TECH_STACK_CATEGORIES.slice(3, 6);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;

    if (!section || !col1 || !col2) return;

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (isDesktop && !isReducedMotion) {
        // Parallax scrub on columns while title remains pinned via CSS sticky
        gsap.fromTo(
          col1,
          { y: 0 },
          {
            y: -140,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          col2,
          { y: 70 },
          {
            y: -240,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.3,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[220vh] md:min-h-[280vh] bg-bg border-t border-stroke/40"
    >
      {/* Layer 1: CSS Sticky Center Title (Pinned throughout section scroll) */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10">
        <div className="max-w-xl mx-auto pointer-events-auto">
          
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-text-primary font-normal tracking-tight mb-4">
            Tech & <span className="font-semibold text-text-primary">capabilities</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-8 leading-relaxed font-normal">
            Technologies, frameworks, and workflows I leverage to architect modern web applications, scalable backends, and Web3 systems.
          </p>

          {/* Action button */}
          <a
            href="https://github.com/Luthfi-1012"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-xs uppercase tracking-wider text-text-primary backdrop-blur-md transition-colors group-hover:border-transparent group-hover:bg-bg">
              <FolderGit2 className="w-4 h-4 text-accent" />
              Explore GitHub Repos
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>

        </div>
      </div>

      {/* Layer 2: Bespoke Engineering Shader Cards in Floating Parallax Deck */}
      <div className="relative -mt-[100vh] z-20 max-w-[1400px] mx-auto px-6 pt-24 md:pt-36 pb-36 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-40 items-start">
          
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-16 md:gap-32 pointer-events-auto will-change-transform">
            {col1Items.map((item: TechCategory, idx: number) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedTech(item)}
                style={{ transform: `rotate(${idx % 2 === 0 ? '-2.5deg' : '2.5deg'})` }}
                className="group relative w-full max-w-[400px] mx-auto rounded-3xl p-6 md:p-7 border border-white/15 bg-[#0c0d14]/90 shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:rotate-0 hover:z-30 cursor-pointer hover:border-[#89AACC]/40 hover:shadow-[0_0_35px_rgba(137,170,204,0.18)] overflow-hidden antialiased [backface-visibility:hidden]"
              >
                {/* 1. Animated WebGL Shader */}
                <CardShaderCanvas cardId={item.id} isHovered={hoveredCard === item.id} />

                {/* 2. Soft Dark Vignette Overlay for Crisp Typography Contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d14]/90 via-[#0c0d14]/15 to-transparent pointer-events-none" />

                {/* 3. Subtle top edge hairline glow on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#89AACC]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* 4. Foreground Content */}
                <div className="relative z-10">
                  {/* Top Module Bar: Numbered identifier + Category Badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-mono tracking-[0.2em] text-zinc-300 font-medium">
                      0{idx + 1} // MODULE
                    </span>
                    <span className="text-xs uppercase font-mono tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-white/20 bg-black/60 text-[#89AACC] font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & One-line Summary */}
                  <h3 className="text-xl font-medium text-white mb-1 tracking-tight group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal max-w-[65ch]">
                    {item.tagline}
                  </p>

                  {/* Custom Engineering Visual Preview Snippet */}
                  {renderCardVisualSnippet(item.id)}

                  {/* Skill Stack Monospace Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-black/60 border border-white/20 text-white font-medium group-hover:border-white/30 transition-colors"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/15 text-xs text-zinc-300 group-hover:text-white transition-colors">
                    <span className="text-xs font-mono uppercase tracking-[0.18em] flex items-center gap-1.5 text-white font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-[#89AACC]" />
                      Inspect Details & Roles
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#89AACC]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-16 md:gap-32 pointer-events-auto pt-16 md:pt-56 will-change-transform">
            {col2Items.map((item: TechCategory, idx: number) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedTech(item)}
                style={{ transform: `rotate(${idx % 2 === 0 ? '3deg' : '-2deg'})` }}
                className="group relative w-full max-w-[400px] mx-auto rounded-3xl p-6 md:p-7 border border-white/15 bg-[#0c0d14]/90 shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:rotate-0 hover:z-30 cursor-pointer hover:border-[#89AACC]/40 hover:shadow-[0_0_35px_rgba(137,170,204,0.18)] overflow-hidden antialiased [backface-visibility:hidden]"
              >
                {/* 1. Animated WebGL Shader */}
                <CardShaderCanvas cardId={item.id} isHovered={hoveredCard === item.id} />

                {/* 2. Soft Dark Vignette Overlay for Crisp Typography Contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d14]/90 via-[#0c0d14]/15 to-transparent pointer-events-none" />

                {/* 3. Subtle top edge hairline glow on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#89AACC]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* 4. Foreground Content */}
                <div className="relative z-10">
                  {/* Top Module Bar: Numbered identifier + Category Badge */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-mono tracking-[0.2em] text-zinc-300 font-medium">
                      0{idx + 4} // MODULE
                    </span>
                    <span className="text-xs uppercase font-mono tracking-[0.2em] px-2.5 py-0.5 rounded-full border border-white/20 bg-black/60 text-[#89AACC] font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & One-line Summary */}
                  <h3 className="text-xl font-medium text-white mb-1 tracking-tight group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-normal max-w-[65ch]">
                    {item.tagline}
                  </p>

                  {/* Custom Engineering Visual Preview Snippet */}
                  {renderCardVisualSnippet(item.id)}

                  {/* Skill Stack Monospace Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-black/60 border border-white/20 text-white font-medium group-hover:border-white/30 transition-colors"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/15 text-xs text-zinc-300 group-hover:text-white transition-colors">
                    <span className="text-xs font-mono uppercase tracking-[0.18em] flex items-center gap-1.5 text-white font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-[#89AACC]" />
                      Inspect Details & Roles
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#89AACC]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Interactive Detail Modal Lightbox */}
      <TechDetailModal
        tech={selectedTech}
        onClose={() => setSelectedTech(null)}
      />
    </section>
  );
};
