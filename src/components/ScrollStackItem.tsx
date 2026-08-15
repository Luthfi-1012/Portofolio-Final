import React, { forwardRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { SideProject } from '../data/portfolioData';

interface ScrollStackItemProps {
  project: SideProject;
  index: number;
  totalCards: number;
}

export const ScrollStackItem = forwardRef<HTMLDivElement, ScrollStackItemProps>(
  ({ project, index, totalCards }, ref) => {
    // Dynamic sticky top offset to create luxury card deck layering effect
    const stickyTop = `${6.5 + index * 1.25}rem`;

    return (
      <div
        ref={ref}
        style={{
          top: stickyTop,
          zIndex: index + 10,
        }}
        className="sticky mb-12 sm:mb-16 w-full max-w-[1100px] mx-auto transition-transform duration-300"
      >
        <div className="group relative w-full rounded-3xl overflow-hidden border border-white/10 bg-[#121218]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:border-white/20 transition-all duration-300">
          {/* Subtle top card glow line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Card Inner Layout */}
          <div className="flex flex-col md:flex-row min-h-[340px] md:min-h-[420px]">
            {/* Image Side */}
            <div className="relative w-full md:w-[54%] overflow-hidden bg-black/40">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 sm:h-64 md:h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Soft side gradient into content */}
              <div className="hidden md:block absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#121218] to-transparent" />
              <div className="md:hidden absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#121218] to-transparent" />
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-between w-full md:w-[46%] p-6 sm:p-8 md:p-10 lg:p-12 gap-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                {/* Category eyebrow & card number */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-px bg-stroke" />
                    <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.25em] font-medium">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-muted/60">
                    0{index + 1} / 0{totalCards}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl text-text-primary font-normal tracking-tight leading-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Bottom: Tags & Link Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-stroke/40">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-xs text-muted/90 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1 font-medium uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link button */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn shrink-0 relative inline-flex items-center gap-2 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
                  >
                    <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 text-xs uppercase tracking-wider text-text-primary transition-colors group-hover/btn:border-transparent group-hover/btn:bg-bg">
                      View Project
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ScrollStackItem.displayName = 'ScrollStackItem';
