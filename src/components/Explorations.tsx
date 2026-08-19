import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, Sparkles } from 'lucide-react';
import { EXPLORATIONS } from '../data/portfolioData';
import type { Exploration } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export const Explorations: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);

  const [selectedExploration, setSelectedExploration] = useState<Exploration | null>(null);

  // Separate exploration items into 2 columns (3 items per col)
  const col1Items = EXPLORATIONS.slice(0, 3);
  const col2Items = EXPLORATIONS.slice(3, 6);

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
            y: -160,
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
          { y: 80 },
          {
            y: -280,
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
      {/* Layer 1: CSS Sticky Center Title (Works reliably without overflow-hidden on parent) */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center text-center px-6 pointer-events-none z-10">
        <div className="max-w-xl mx-auto pointer-events-auto">
          
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Explorations
            </span>
            <div className="w-8 h-px bg-stroke" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-text-primary font-normal tracking-tight mb-4">
            Visual <span className="font-display italic font-normal">playground</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-8 leading-relaxed font-normal">
            Experimental 3D shaders, raymarching, physical typography, and interactive canvases.
          </p>

          {/* Dribbble button */}
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-xs uppercase tracking-wider text-text-primary backdrop-blur-md transition-colors group-hover:border-transparent group-hover:bg-bg">
              <Sparkles className="w-4 h-4 text-accent" />
              Follow on Dribbble
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>

        </div>
      </div>

      {/* Layer 2: Parallax Columns (Starts alongside the sticky header via -mt-[100vh]) */}
      <div className="relative -mt-[100vh] z-20 max-w-[1400px] mx-auto px-6 pt-24 md:pt-36 pb-36 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-40 items-start">
          
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-20 md:gap-36 pointer-events-auto will-change-transform">
            {col1Items.map((item: Exploration) => (
              <div
                key={item.id}
                onClick={() => setSelectedExploration(item)}
                style={{ transform: `rotate(${item.rotation})` }}
                className="group relative aspect-square w-full max-w-[320px] mx-auto rounded-3xl overflow-hidden border border-stroke/80 bg-surface shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-0 hover:z-30 cursor-pointer hover:border-white/30"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <span className="text-[10px] text-muted uppercase tracking-widest font-medium">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-display italic text-text-primary">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-20 md:gap-36 pointer-events-auto pt-16 md:pt-56 will-change-transform">
            {col2Items.map((item: Exploration) => (
              <div
                key={item.id}
                onClick={() => setSelectedExploration(item)}
                style={{ transform: `rotate(${item.rotation})` }}
                className="group relative aspect-square w-full max-w-[320px] mx-auto rounded-3xl overflow-hidden border border-stroke/80 bg-surface shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-0 hover:z-30 cursor-pointer hover:border-white/30"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <span className="text-[10px] text-muted uppercase tracking-widest font-medium">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-display italic text-text-primary">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedExploration && (
        <div
          className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedExploration(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedExploration(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-bg/80 border border-stroke flex items-center justify-center text-text-primary hover:bg-bg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-square md:aspect-video w-full overflow-hidden bg-black">
              <img
                src={selectedExploration.image}
                alt={selectedExploration.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs text-muted uppercase tracking-widest">
                  {selectedExploration.category}
                </span>
                <h3 className="text-3xl font-display italic text-text-primary mt-1">
                  {selectedExploration.title}
                </h3>
              </div>

              <div className="accent-gradient-border rounded-full p-[1px]">
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-bg px-5 py-2.5 text-xs text-text-primary hover:bg-surface transition-colors"
                >
                  View Details
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
