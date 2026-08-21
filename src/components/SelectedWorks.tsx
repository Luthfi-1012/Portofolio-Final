import React, { useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import type { FeaturedProject } from '../data/portfolioData';
import { FeaturedProjectDetail } from './FeaturedProjectDetail';

gsap.registerPlugin(ScrollTrigger);

export const SelectedWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const trackContainerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const totalProjects = FEATURED_PROJECTS.length;

  const handleViewProject = useCallback((project: FeaturedProject) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setIsDetailOpen(false);
    setSelectedProject(null);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const trackContainer = trackContainerRef.current;
    if (!section) return;

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

    const ctx = gsap.context(() => {
      if (isDesktop && track && trackContainer) {
        // Calculate the total horizontal distance the track needs to travel
        const getDistance = () => {
          return track.scrollWidth - trackContainer.clientWidth + 160;
        };

        // Pin the section and smoothly translate track horizontally
        const horizontalTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            id: 'sw-horizontal-pin',
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance() * 1.1}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Header reveal on initial arrival
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
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

        // Animate each card: Card 1 enters with section, Card 2..5 rise from below as they glide in
        const validCards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        validCards.forEach((card, index) => {
          if (index === 0) {
            gsap.fromTo(
              card,
              { opacity: 0, y: 60, scale: 0.96 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 70%',
                  toggleActions: 'play none none none',
                },
              }
            );
          } else {
            // Subsequent cards rise from bottom as they scroll into view horizontally
            gsap.fromTo(
              card,
              { opacity: 0.2, y: 90, scale: 0.93 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: 'left 92%',
                  end: 'left 55%',
                  scrub: true,
                },
              }
            );
          }
        });
      } else {
        // Mobile / Tablet: staggered vertical reveals
        const validMobileCards = mobileCardsRef.current.filter(Boolean) as HTMLDivElement[];
        validMobileCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, section);

    // Refresh ScrollTrigger after initial mount layout calculation
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        className="relative z-10 bg-[#0a0a0f] border-t border-stroke/40 overflow-hidden lg:h-screen lg:flex lg:items-center py-16 lg:py-0"
      >
        {/* ── DESKTOP LAYOUT (1024px+): TRIONN-Style Horizontal Scroll ── */}
        <div className="hidden lg:flex w-full h-full items-center relative">
          {/* Left Column: Pinned Sidebar Header & CTA */}
          <div
            ref={headerRef}
            className="w-[28vw] min-w-[320px] max-w-[420px] h-[72vh] flex flex-col justify-between pl-10 xl:pl-16 pr-6 flex-shrink-0 z-20"
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
              <h2 className="text-4xl xl:text-5xl 2xl:text-6xl text-text-primary font-normal tracking-tight leading-[1.08] mb-6">
                Selected work <br />
                <span className="font-semibold text-text-primary">& explorations</span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm text-muted max-w-xs leading-relaxed font-normal">
                A selection of web applications, Web3 smart contracts, and mobile systems built from concept to launch.
              </p>
            </div>

            {/* Bottom CTA */}
            <div>
              <a
                href="#explorations"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-primary hover:text-white transition-colors"
              >
                <span className="border-b border-white/20 pb-0.5 group-hover:border-white transition-colors">
                  View all projects
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>

          {/* Right Track Area: Horizontal Scrolling Deck */}
          <div
            ref={trackContainerRef}
            className="flex-1 h-full overflow-hidden flex items-center relative"
          >
            <div
              ref={trackRef}
              className="flex flex-nowrap gap-8 xl:gap-10 pl-6 pr-40 w-max items-center py-8"
            >
              {FEATURED_PROJECTS.map((project, index) => (
                <div
                  key={project.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="sw-card w-[50vw] min-w-[520px] max-w-[680px] flex-shrink-0 group/card cursor-pointer"
                  onClick={() => handleViewProject(project)}
                >
                  <div className="rounded-3xl border border-white/[0.08] bg-[#0e0e14]/90 backdrop-blur-md p-6 xl:p-7 transition-all duration-500 hover:border-white/[0.18] hover:bg-[#12121a]/95 hover:shadow-2xl hover:shadow-black/70">
                    {/* Project Image */}
                    <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 ${
                      project.category.toLowerCase().includes('mobile')
                        ? 'bg-gradient-to-tr from-[#090b10] via-[#0f1420] to-[#0a0d14] flex items-center justify-center p-3'
                        : ''
                    }`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`transition-opacity duration-500 group-hover/card:opacity-90 ${
                          project.category.toLowerCase().includes('mobile')
                            ? 'max-h-full w-auto object-contain rounded-2xl drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]'
                            : 'w-full h-full object-cover'
                        }`}
                        loading="lazy"
                      />
                      {/* Subtle top accent gradient */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#89AACC]/50 to-transparent" />
                      {/* Vignette */}
                      {!project.category.toLowerCase().includes('mobile') && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      )}
                    </div>

                    {/* Project Info Below Image */}
                    <div className="flex flex-col">
                      {/* Category + Counter */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-4 h-px bg-white/25" />
                          <span className="text-xs text-white/50 uppercase tracking-[0.25em] font-medium">
                            {project.category}
                          </span>
                        </div>
                        <span className="text-xs text-white/30 tracking-widest font-mono font-medium">
                          {String(index + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl xl:text-3xl text-white font-medium tracking-tight mb-2.5 group-hover/card:text-white transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[13px] text-white/50 leading-relaxed mb-5 line-clamp-2 max-w-[44ch]">
                        {project.description}
                      </p>

                      {/* Footer: Tags + Explore Button */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 text-xs uppercase tracking-wider font-medium text-white/60 border border-white/10 rounded-full bg-white/[0.03]"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="px-2 py-0.5 text-xs uppercase tracking-wider font-medium text-white/35 border border-white/8 rounded-full">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* View Action */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewProject(project);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-white/80 group-hover/card:text-white group-hover/card:translate-x-1 transition-all duration-300"
                        >
                          <span className="border-b border-white/20 pb-0.5 group-hover/card:border-white">
                            Explore Project
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE / TABLET LAYOUT (<1024px) ── */}
        <div className="lg:hidden w-full max-w-[680px] mx-auto px-6 flex flex-col gap-8">
          {/* Mobile Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Selected Work
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl text-text-primary font-normal tracking-tight">
              Selected work <span className="font-semibold text-text-primary">& explorations</span>
            </h2>

            <p className="text-sm text-muted mt-2 font-normal">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          {/* Mobile Cards Stack */}
          <div className="flex flex-col gap-6">
            {FEATURED_PROJECTS.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => { mobileCardsRef.current[index] = el; }}
                className="rounded-3xl border border-white/[0.08] bg-[#0e0e14]/90 backdrop-blur-md p-5 shadow-xl cursor-pointer"
                onClick={() => handleViewProject(project)}
              >
                {/* Image */}
                <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 ${
                  project.category.toLowerCase().includes('mobile')
                    ? 'bg-gradient-to-tr from-[#090b10] via-[#0f1420] to-[#0a0d14] flex items-center justify-center p-3'
                    : ''
                }`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full ${
                      project.category.toLowerCase().includes('mobile')
                        ? 'object-contain max-h-[160px] rounded-xl'
                        : 'object-cover'
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#89AACC]/50 to-transparent" />
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/50 uppercase tracking-[0.25em] font-medium">
                      {project.category}
                    </span>
                    <span className="text-xs text-white/30 tracking-widest font-mono">
                      {String(index + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl text-white font-medium tracking-tight mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-white/50 leading-relaxed mb-4 line-clamp-3 max-w-[44ch]">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs uppercase tracking-wider font-medium text-white/60 border border-white/10 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProject(project);
                      }}
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-white font-medium"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Work Link */}
          <div className="pt-2 flex justify-center">
            <a
              href="#explorations"
              className="group relative inline-flex items-center gap-2 rounded-full p-[1.5px] transition-transform duration-300"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 text-xs uppercase tracking-wider text-text-primary">
                View all work
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Fullscreen Detail Modal */}
      {selectedProject && (
        <FeaturedProjectDetail
          project={selectedProject}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
      )}
    </>
  );
};
