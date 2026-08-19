import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowUpRight, 
  X, 
  Layers, 
  Server, 
  Coins, 
  Database, 
  Users, 
  Cpu, 
  CheckCircle2, 
  Code2, 
  FolderGit2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { TECH_STACK_CATEGORIES } from '../data/portfolioData';
import type { TechCategory } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// Helper to get matching icons for categories
const getCategoryIcon = (id: string, color: string) => {
  const iconProps = { className: 'w-5 h-5', style: { color } };
  switch (id) {
    case 'tech-1':
      return <Layers {...iconProps} />;
    case 'tech-2':
      return <Server {...iconProps} />;
    case 'tech-3':
      return <Coins {...iconProps} />;
    case 'tech-4':
      return <Database {...iconProps} />;
    case 'tech-5':
      return <Users {...iconProps} />;
    case 'tech-6':
      return <Cpu {...iconProps} />;
    default:
      return <Code2 {...iconProps} />;
  }
};

export const Explorations: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);

  const [selectedTech, setSelectedTech] = useState<TechCategory | null>(null);

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
          
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Engineering Arsenal
            </span>
            <div className="w-8 h-px bg-stroke" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-text-primary font-normal tracking-tight mb-4">
            Tech & <span className="font-display italic font-normal">capabilities</span>
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

      {/* Layer 2: Floating Parallax Tech Category Cards */}
      <div className="relative -mt-[100vh] z-20 max-w-[1400px] mx-auto px-6 pt-24 md:pt-36 pb-36 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-40 items-start">
          
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-16 md:gap-32 pointer-events-auto will-change-transform">
            {col1Items.map((item: TechCategory) => (
              <div
                key={item.id}
                onClick={() => setSelectedTech(item)}
                style={{ transform: `rotate(${item.rotation})` }}
                className="group relative w-full max-w-[380px] mx-auto rounded-3xl p-6 md:p-7 border border-stroke/80 bg-surface/90 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:rotate-0 hover:z-30 cursor-pointer hover:border-white/40 overflow-hidden"
              >
                {/* Glowing ambient background light */}
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 blur-3xl transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: item.accent }}
                />

                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-bg/80 border border-stroke flex items-center justify-center">
                    {getCategoryIcon(item.id, item.accent)}
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-stroke bg-bg/60 font-medium"
                    style={{ color: item.accent }}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-medium text-text-primary mb-1.5 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-5">
                  {item.tagline}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-bg/90 border border-stroke text-text-secondary group-hover:border-stroke/80 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>

                {/* Bottom CTA bar */}
                <div className="flex items-center justify-between pt-3 border-t border-stroke/40 text-xs text-muted group-hover:text-text-primary transition-colors">
                  <span className="text-[11px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    View Details & Projects
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent" />
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-16 md:gap-32 pointer-events-auto pt-16 md:pt-56 will-change-transform">
            {col2Items.map((item: TechCategory) => (
              <div
                key={item.id}
                onClick={() => setSelectedTech(item)}
                style={{ transform: `rotate(${item.rotation})` }}
                className="group relative w-full max-w-[380px] mx-auto rounded-3xl p-6 md:p-7 border border-stroke/80 bg-surface/90 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:rotate-0 hover:z-30 cursor-pointer hover:border-white/40 overflow-hidden"
              >
                {/* Glowing ambient background light */}
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 blur-3xl transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: item.accent }}
                />

                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-bg/80 border border-stroke flex items-center justify-center">
                    {getCategoryIcon(item.id, item.accent)}
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-stroke bg-bg/60 font-medium"
                    style={{ color: item.accent }}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-medium text-text-primary mb-1.5 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-5">
                  {item.tagline}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-bg/90 border border-stroke text-text-secondary group-hover:border-stroke/80 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>

                {/* Bottom CTA bar */}
                <div className="flex items-center justify-between pt-3 border-t border-stroke/40 text-xs text-muted group-hover:text-text-primary transition-colors">
                  <span className="text-[11px] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    View Details & Projects
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Interactive Detail Modal (Lightbox) */}
      {selectedTech && (
        <div
          className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedTech(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#111219] border border-stroke/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient glow in modal */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ backgroundColor: selectedTech.accent }}
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedTech(null)}
              className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-surface border border-stroke flex items-center justify-center text-text-primary hover:bg-stroke/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-surface border border-stroke flex items-center justify-center">
                {getCategoryIcon(selectedTech.id, selectedTech.accent)}
              </div>
              <div>
                <span
                  className="text-[10px] uppercase tracking-widest font-semibold"
                  style={{ color: selectedTech.accent }}
                >
                  {selectedTech.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-text-primary">
                  {selectedTech.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-muted mb-6 leading-relaxed">
              {selectedTech.description}
            </p>

            {/* Highlight Box */}
            <div className="p-4 rounded-2xl bg-surface/80 border border-stroke/60 mb-6 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-xs text-text-primary leading-relaxed">
                {selectedTech.highlight}
              </p>
            </div>

            {/* Skills Matrix */}
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-widest text-muted font-medium mb-3">
                Core Stack & Technologies
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {selectedTech.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded-xl bg-bg/80 border border-stroke/60 flex items-center justify-between"
                  >
                    <span className="text-xs font-medium text-text-primary">
                      {skill.name}
                    </span>
                    {skill.tag && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface border border-stroke text-muted">
                        {skill.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Related Experience / Projects */}
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-widest text-muted font-medium mb-3">
                Applied In Projects & Roles
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTech.projectsUsed.map((proj, pIdx) => (
                  <span
                    key={pIdx}
                    className="text-xs px-3 py-1.5 rounded-full bg-surface border border-stroke text-text-secondary flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedTech.accent }} />
                    {proj}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-4 border-t border-stroke/50">
              <button
                onClick={() => setSelectedTech(null)}
                className="px-6 py-2.5 rounded-full bg-surface border border-stroke text-xs text-text-primary hover:bg-stroke/40 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
