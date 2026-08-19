import React, { forwardRef, useState } from 'react';
import { ArrowUpRight, PenTool, Globe, Code2, Sparkles, Maximize2, X } from 'lucide-react';
import type { SideProject } from '../data/portfolioData';

interface ScrollStackItemProps {
  project: SideProject;
  index: number;
  totalCards: number;
}

const getCategoryIcon = (category: string) => {
  if (category.toLowerCase().includes('figma')) {
    return <PenTool className="w-3.5 h-3.5 text-[#e879f9]" />;
  }
  if (category.toLowerCase().includes('web3')) {
    return <Globe className="w-3.5 h-3.5 text-[#38bdf8]" />;
  }
  return <Code2 className="w-3.5 h-3.5 text-[#4ade80]" />;
};

export const ScrollStackItem = forwardRef<HTMLDivElement, ScrollStackItemProps>(
  ({ project, index, totalCards }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <div className="flex flex-col md:flex-row min-h-[340px] md:min-h-[420px]">
              
              {/* Image / Media Side */}
              <div 
                onClick={() => setIsModalOpen(true)}
                className="relative w-full md:w-[54%] overflow-hidden bg-black/50 cursor-pointer group/img"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 sm:h-64 md:h-full object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-white/20 text-xs font-medium text-white shadow-xl backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5 text-[#89AACC]" />
                    View Full Mockup
                  </span>
                </div>

                {/* Soft side gradient into content */}
                <div className="hidden md:block absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#0e0f16] to-transparent pointer-events-none" />
                <div className="md:hidden absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0e0f16] to-transparent pointer-events-none" />
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
                      <span className="text-[10.5px] sm:text-xs text-[#89AACC] uppercase tracking-[0.2em] font-mono font-medium">
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
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Bottom: Tags & Link Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10.5px] sm:text-xs text-white bg-black/60 border border-white/20 rounded-lg px-2.5 py-1 font-mono font-medium tracking-tight"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="group/btn shrink-0 relative inline-flex items-center gap-2 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
                      aria-label={`Preview ${project.title}`}
                    >
                      <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 text-xs uppercase tracking-wider text-white transition-colors group-hover/btn:border-transparent group-hover/btn:bg-bg">
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

        {/* Lightbox Modal for Full Mockup View */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] bg-[#0e0f16] border border-white/20 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-lg"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-4 pr-12">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#89AACC]">
                    {project.category}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-[11px] font-mono text-zinc-400">0{index + 1} / 0{totalCards}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                  {project.title}
                </h3>
              </div>

              {/* Scrollable Image Area */}
              <div className="flex-1 overflow-y-auto rounded-2xl bg-black/80 border border-white/10 p-2 sm:p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto rounded-xl object-contain shadow-2xl"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-3 border-t border-white/10">
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
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-xs text-white hover:bg-white/20 transition-colors"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

ScrollStackItem.displayName = 'ScrollStackItem';
