import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../data/portfolioData';
import type { StatItem } from '../data/portfolioData';

export const Stats: React.FC = () => {
  return (
    <section className="bg-bg py-16 md:py-24 border-y border-stroke/50 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STATS.map((stat: StatItem, index: number) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col justify-between p-8 bg-surface/40 rounded-3xl border border-stroke/60 hover:border-stroke transition-all duration-300 hover:bg-surface/70 group"
            >
              <div>
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary tracking-tight mb-4 group-hover:text-white transition-colors">
                  {stat.value}
                </div>
                <h3 className="text-lg md:text-xl font-medium text-text-primary mb-2">
                  {stat.label}
                </h3>
              </div>

              <p className="text-xs md:text-sm text-muted leading-relaxed mt-4 pt-4 border-t border-stroke/40 font-normal">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
