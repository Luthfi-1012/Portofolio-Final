import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { JOURNAL_ENTRIES } from '../data/portfolioData';
import type { JournalEntry } from '../data/portfolioData';

export const Journal: React.FC = () => {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24 relative z-10 border-t border-stroke/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Journal
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-normal tracking-tight">
              Recent <span className="font-display italic font-normal">thoughts</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-md mt-3 font-normal">
              Essays, case studies, and notes on interactive design & code.
            </p>
          </div>

          {/* View all button */}
          <div className="hidden md:inline-flex">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-xs uppercase tracking-wider text-text-primary transition-colors group-hover:border-transparent group-hover:bg-bg">
                View all articles
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </div>
        </motion.div>

        {/* Journal Entries List (Horizontal Pills) */}
        <div className="flex flex-col gap-4 md:gap-5">
          {JOURNAL_ENTRIES.map((entry: JournalEntry, index: number) => (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:px-6 sm:py-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[28px] sm:rounded-full transition-all duration-300 cursor-pointer hover:border-stroke/80 hover:shadow-lg hover:shadow-black/20"
            >
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                {/* Thumbnail Image */}
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border border-stroke/60">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Title & Metadata */}
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-medium text-text-primary group-hover:text-white transition-colors line-clamp-1">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                    <span>{entry.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-muted/40" />
                    <span>{entry.date}</span>
                  </div>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="self-end sm:self-center shrink-0">
                <div className="w-10 h-10 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted group-hover:text-text-primary group-hover:border-white/30 transition-all duration-300 group-hover:scale-110">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
