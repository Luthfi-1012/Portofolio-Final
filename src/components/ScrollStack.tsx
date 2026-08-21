import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SIDE_PROJECTS } from '../data/portfolioData';
import { ScrollStackItem } from './ScrollStackItem';

gsap.registerPlugin(ScrollTrigger);

export const ScrollStack: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const deck = deckRef.current;
    if (!section || !deck) return;

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

      // 2. Animate subtle scale, dim, and brightness of inactive cards as next card stacks on top
      if (!isReducedMotion && isDesktop) {
        const cardElements = deck.querySelectorAll<HTMLElement>('.scroll-stack-card');

        cardElements.forEach((cardEl, idx) => {
          if (idx === cardElements.length - 1) return; // last card stays at 100%
          const nextCardEl = cardElements[idx + 1];
          const innerEl = cardEl.querySelector<HTMLElement>('.scroll-stack-inner');

          if (innerEl && nextCardEl) {
            gsap.fromTo(
              innerEl,
              { scale: 1, opacity: 1, filter: 'brightness(1)' },
              {
                scale: 0.95,
                opacity: 0.5,
                filter: 'brightness(0.6)',
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: nextCardEl,
                  start: 'top 85%',
                  end: 'top 40%',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              }
            );
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="side-projects"
      ref={sectionRef}
      className="relative z-10 py-20 md:py-28 border-t border-stroke/40"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div ref={headerRef} className="mb-14 md:mb-20" style={{ opacity: 0 }}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-normal tracking-tight">
            Side <span className="font-semibold text-text-primary">projects</span>
          </h2>
          
          <p className="text-sm md:text-base text-muted max-w-lg mt-3 font-normal leading-relaxed">
            Passion projects & experiments built outside of client work — where curiosity meets code and visual craft.
          </p>
        </div>

        {/* Sticky Stacked Cards Deck */}
        <div ref={deckRef} className="relative w-full pb-12">
          {SIDE_PROJECTS.map((project, index) => (
            <ScrollStackItem
              key={project.id}
              project={project}
              index={index}
              totalCards={SIDE_PROJECTS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
