import React, { forwardRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ArrowUpRight, 
  PenTool, 
  Globe, 
  Code2, 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play 
} from 'lucide-react';
import type { SideProject } from '../data/portfolioData';
import { useSmoothScroll } from './SmoothScrollProvider';

const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface ScrollStackItemProps {
  project: SideProject;
  index: number;
  totalCards: number;
}

const getCategoryIcon = (category: string) => {
  if (category.toLowerCase().includes('figma')) {
    return <PenTool className="w-3.5 h-3.5 text-[#89AACC]" />;
  }
  if (category.toLowerCase().includes('web3')) {
    return <Globe className="w-3.5 h-3.5 text-[#89AACC]" />;
  }
  return <Code2 className="w-3.5 h-3.5 text-[#89AACC]" />;
};

export const ScrollStackItem = forwardRef<HTMLDivElement, ScrollStackItemProps>(
  ({ project, index, totalCards }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const { lenis } = useSmoothScroll();

    const mediaList = project.media && project.media.length > 0 
      ? project.media 
      : [{ type: 'image' as const, url: project.image, label: project.title }];

    const totalSlides = mediaList.length;
    const currentMedia = mediaList[currentSlideIndex] || mediaList[0];

    // Handle scroll lock and Lenis stop/start when modal is open
    useEffect(() => {
      if (isModalOpen) {
        document.body.style.overflow = 'hidden';
        lenis?.stop();
      } else {
        document.body.style.overflow = '';
        lenis?.start();
      }

      return () => {
        document.body.style.overflow = '';
        lenis?.start();
      };
    }, [isModalOpen, lenis]);

    const nextSlide = (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    // Uniform sticky top offset for clean deck stacking without text overlap
    const stickyTop = '6.5rem';

    return (
      <>
        <div
          ref={ref}
          style={{
            top: stickyTop,
            zIndex: index + 10,
          }}
          className="scroll-stack-card sticky mb-24 sm:mb-32 w-full max-w-[1100px] mx-auto"
        >
          <div className="scroll-stack-inner group relative w-full rounded-3xl overflow-hidden border border-white/15 bg-[#0b0c12] shadow-[0_30px_70px_rgba(0,0,0,0.95)] hover:border-white/30 transition-all duration-500 will-change-transform origin-top">
            {/* Subtle top card glow line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#89AACC]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Card Inner Layout */}
            <div className="flex flex-col md:flex-row min-h-[360px] md:min-h-[440px]">
              
              {/* Media / Carousel Slide Side */}
              <div className="relative w-full md:w-[54%] overflow-hidden bg-black/60 select-none group/media">
                {/* Active Slide Display */}
                <div 
                  onClick={() => setIsModalOpen(true)}
                  className="relative w-full h-64 sm:h-72 md:h-full cursor-pointer overflow-hidden"
                >
                  {currentMedia.type === 'video' ? (
                    <video
                      key={currentMedia.url}
                      src={currentMedia.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/media:scale-105"
                    />
                  ) : (
                    <img
                      key={currentMedia.url}
                      src={currentMedia.url}
                      alt={`${project.title} - ${currentMedia.label}`}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/media:scale-105"
                      loading="lazy"
                    />
                  )}

                  {/* Top Slide Badge Indicator */}
                  <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 border border-white/20 text-xs font-mono font-medium text-white backdrop-blur-md shadow-lg">
                      {currentMedia.type === 'video' ? (
                        <Play className="w-3 h-3 text-[#89AACC] fill-[#89AACC]" />
                      ) : (
                        <Maximize2 className="w-3 h-3 text-[#89AACC]" />
                      )}
                      {currentMedia.label}
                    </span>
                  </div>

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/85 border border-white/25 text-xs font-medium text-white shadow-xl backdrop-blur-md">
                      <Maximize2 className="w-3.5 h-3.5 text-[#89AACC]" />
                      Click to Expand & Inspect
                    </span>
                  </div>

                  {/* Soft side gradient into content */}
                  <div className="hidden md:block absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#0b0c12] to-transparent pointer-events-none" />
                  <div className="md:hidden absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b0c12] to-transparent pointer-events-none" />
                </div>

                {/* In-Card Slide Controls (Visible when more than 1 media slide exists) */}
                {totalSlides > 1 && (
                  <>
                    {/* Previous Button */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-white/20 transition-all shadow-lg hover:scale-110"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-white/20 transition-all shadow-lg hover:scale-110"
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Slide Dots Indicator */}
                    <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md shadow-lg">
                      {mediaList.map((_, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlideIndex(sIdx);
                          }}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            sIdx === currentSlideIndex 
                              ? 'w-6 bg-[#89AACC]' 
                              : 'w-2 bg-white/40 hover:bg-white/70'
                          }`}
                          aria-label={`Go to slide ${sIdx + 1}`}
                        />
                      ))}
                      <span className="text-xs font-mono text-zinc-400 ml-1">
                        {currentSlideIndex + 1}/{totalSlides}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Content Side */}
              <div className="flex flex-col justify-between w-full md:w-[46%] p-6 sm:p-8 md:p-10 lg:p-12 gap-6 relative z-10">
                <div className="flex flex-col gap-3 sm:gap-4">
                  
                  {/* Category eyebrow & card number */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        {getCategoryIcon(project.category)}
                      </div>
                      <span className="text-xs text-[#89AACC] uppercase tracking-[0.2em] font-mono font-medium">
                        {project.category}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400">
                      0{index + 1} / 0{totalCards}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl text-white font-medium tracking-tight leading-tight group-hover:text-white transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal max-w-[65ch]">
                    {project.description}
                  </p>
                </div>

                {/* Bottom: Tags & Action Links */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-white bg-black/60 border border-white/20 rounded-lg px-2.5 py-1 font-mono font-medium tracking-tight"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                    {/* GitHub Repo Button if available */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/15 text-xs text-zinc-300 hover:text-white hover:bg-white/15 hover:border-white/30 transition-all"
                        title="View GitHub Repository"
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Repo</span>
                      </a>
                    )}

                    {/* Inspect Details Button */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="group/btn shrink-0 relative inline-flex items-center gap-2 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
                      aria-label={`Preview ${project.title}`}
                    >
                      <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-4 sm:px-5 py-2.5 text-xs uppercase tracking-wider text-white transition-colors group-hover/btn:border-transparent group-hover/btn:bg-bg">
                        <Sparkles className="w-3.5 h-3.5 text-[#89AACC]" />
                        Inspect Details
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Portal-Mounted Lightbox Modal with Full-Screen Lock and Slide Navigation */}
        {isModalOpen && typeof document !== 'undefined' && createPortal(
          <div
            data-lenis-prevent
            className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8 select-none"
            onClick={() => setIsModalOpen(false)}
            onWheel={(e) => e.stopPropagation()}
          >
            <div
              data-lenis-prevent
              className="relative max-w-5xl w-full max-h-[92vh] bg-[#0c0d14] border border-white/20 rounded-3xl p-4 sm:p-6 md:p-7 shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-2xl hover:scale-105"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-4 pr-14">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#89AACC] font-semibold">
                    {project.category}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-xs font-mono text-zinc-400">
                    Slide {currentSlideIndex + 1} of {totalSlides}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-white tracking-tight">
                  {project.title}
                </h3>
              </div>

              {/* Media Display Area in Lightbox */}
              <div className="relative flex-1 min-h-[300px] overflow-hidden rounded-2xl bg-black/90 border border-white/10 flex items-center justify-center">
                {currentMedia.type === 'video' ? (
                  <video
                    key={`modal-${currentMedia.url}`}
                    src={currentMedia.url}
                    controls
                    autoPlay
                    loop
                    className="max-h-[60vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-full max-h-[60vh] overflow-y-auto p-2 sm:p-4 flex items-center justify-center">
                    <img
                      key={`modal-${currentMedia.url}`}
                      src={currentMedia.url}
                      alt={`${project.title} - ${currentMedia.label}`}
                      className="max-h-[58vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                    />
                  </div>
                )}

                {/* Lightbox Slide Prev/Next Arrows */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all shadow-xl hover:scale-110"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all shadow-xl hover:scale-110"
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Footer with Slide Thumbnails & Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-3 border-t border-white/10">
                {/* Slide Switcher Buttons */}
                {totalSlides > 1 ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {mediaList.map((item, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => setCurrentSlideIndex(sIdx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                          sIdx === currentSlideIndex
                            ? 'bg-[#89AACC]/20 border border-[#89AACC] text-white font-medium'
                            : 'bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {item.type === 'video' ? <Play className="w-3 h-3 text-[#89AACC]" /> : null}
                        {item.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-white bg-white/[0.06] border border-white/20 rounded-md px-2.5 py-1 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* External Links & Close */}
                <div className="flex items-center gap-2 ml-auto">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-xs text-white hover:bg-white/20 hover:border-white/40 transition-all font-medium"
                    >
                      <GitHubIcon className="w-4 h-4" />
                      View GitHub Repo
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-xs text-zinc-300 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    Close Viewer
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    );
  }
);

ScrollStackItem.displayName = 'ScrollStackItem';
