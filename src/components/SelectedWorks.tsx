import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export const SelectedWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Staggered card reveal
      const validCards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Gentle image-only parallax inside overflow-hidden container (desktop only, no reduced motion)
      if (!isReducedMotion && isDesktop) {
        imagesRef.current.forEach((img, i) => {
          const card = cardsRef.current[i];
          if (!img || !card) return;

          gsap.fromTo(
            img,
            { yPercent: -8, scale: 1.12 },
            {
              yPercent: 8,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="bg-bg/70 backdrop-blur-sm py-16 md:py-24 relative z-10 border-t border-stroke/40"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
          style={{ opacity: 0 }}
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Selected Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-normal tracking-tight">
              Featured <span className="font-display italic font-normal">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-md mt-3 font-normal">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          {/* View all work button (desktop only) */}
          <div className="hidden md:inline-flex">
            <a
              href="#explorations"
              className="group relative inline-flex items-center gap-2 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-xs uppercase tracking-wider text-text-primary transition-colors group-hover:border-transparent group-hover:bg-bg">
                View all work
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project: Project, index: number) => (
            <div
              key={project.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`${project.colSpan} group relative rounded-3xl overflow-hidden border border-stroke bg-surface cursor-pointer will-change-transform ${project.aspectRatio || 'aspect-[16/10]'}`}
              style={{ opacity: 0 }}
            >
              {/* Parallax Background Image Container */}
              <div className="w-full h-full overflow-hidden">
                <img
                  ref={(el) => { imagesRef.current[index] = el; }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out will-change-transform"
                  loading="lazy"
                />
              </div>

              {/* Default Content gradient shadow at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-8 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                <span className="text-xs text-muted uppercase tracking-widest font-medium mb-1">
                  {project.category}
                </span>
                <h3 className="text-2xl md:text-3xl text-text-primary font-medium tracking-tight">
                  {project.title}
                </h3>
              </div>

              {/* Hover Backdrop Overlay */}
              <div className="absolute inset-0 bg-bg/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-lg flex flex-col items-center justify-center p-6 text-center">
                <span className="text-xs text-muted uppercase tracking-[0.25em] mb-4">
                  {project.category}
                </span>

                {/* Hover Label Pill with animated gradient border */}
                <div className="accent-gradient-border-animated rounded-full p-[1.5px] shadow-2xl transition-transform duration-300 group-hover:scale-105">
                  <div className="rounded-full bg-text-primary px-6 py-3 text-bg font-medium text-sm sm:text-base flex items-center gap-2">
                    <span>View — </span>
                    <span className="font-display italic font-normal text-lg">
                      {project.title}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Work Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <a
            href="#explorations"
            className="group relative inline-flex items-center gap-2 rounded-full p-[1.5px] transition-transform duration-300"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-xs uppercase tracking-wider text-text-primary">
              View all work
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </div>

      </div>
    </section>
  );
};
