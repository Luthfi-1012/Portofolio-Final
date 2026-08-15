import React from 'react';
import { SIDE_PROJECTS } from '../data/portfolioData';
import { ScrollStackItem } from './ScrollStackItem';

export const ScrollStack: React.FC = () => {
  return (
    <section
      id="side-projects"
      className="relative z-10 py-20 md:py-28 border-t border-stroke/40"
    >
      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Personal Work
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-normal tracking-tight">
            Side <span className="font-display italic font-normal">projects</span>
          </h2>
          
          <p className="text-sm md:text-base text-muted max-w-lg mt-3 font-normal leading-relaxed">
            Passion projects & experiments built outside of client work — where curiosity meets code and visual craft.
          </p>
        </div>

        {/* Sticky Stacked Cards Deck */}
        <div className="relative w-full pb-12">
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
