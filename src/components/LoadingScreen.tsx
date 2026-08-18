import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ["Develop", "Build", "Innovate", "Lead"];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isSplitting, setIsSplitting] = useState<boolean>(false);
  const [contentFaded, setContentFaded] = useState<boolean>(false);

  // Counter using requestAnimationFrame with smooth acceleration
  useEffect(() => {
    const startTime = performance.now();
    const duration = 2300; // Smooth, elegant pacing for full 4-word cycle

    let animationFrameId: number;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth custom ease: cubic ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easedProgress * 100);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setCount(100);
        // Step 1: Fade out center text & numbers
        setTimeout(() => {
          setContentFaded(true);
        }, 180);

        // Step 2: Trigger curtain split animation
        setTimeout(() => {
          setIsSplitting(true);
        }, 400);

        // Step 3: Complete and unmount after curtain animation
        setTimeout(() => {
          onComplete();
        }, 1250);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onComplete]);

  // Cycle words every 575ms (smoothly display all 4 words during 2300ms)
  useEffect(() => {
    if (contentFaded) return;
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 575);

    return () => clearInterval(wordInterval);
  }, [contentFaded]);

  // Luxury curtain easing
  const curtainEase = [0.85, 0, 0.15, 1] as const;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden">
      {/* ── LEFT CURTAIN PANEL ── */}
      <motion.div
        initial={{ x: '0%' }}
        animate={isSplitting ? { x: '-100%' } : { x: '0%' }}
        transition={{ duration: 1.15, ease: curtainEase }}
        className="absolute top-0 left-0 w-1/2 h-full bg-[#0a0a0a] border-r border-stroke/50 shadow-[20px_0_50px_rgba(0,0,0,0.9)] z-20 flex flex-col justify-between p-8 md:p-14 overflow-hidden"
      >
        {/* Subtle background gradient glow */}
        <div className="absolute inset-0 bg-radial-gradient from-surface/20 to-transparent pointer-events-none" />

        {/* Top Left Header */}
        <motion.div
          animate={contentFaded ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          PORTFOLIO
        </motion.div>

        {/* Bottom Left decorative indicator */}
        <motion.div
          animate={contentFaded ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[11px] text-muted tracking-widest uppercase font-mono">
            INITIALIZING
          </span>
        </motion.div>
      </motion.div>

      {/* ── RIGHT CURTAIN PANEL ── */}
      <motion.div
        initial={{ x: '0%' }}
        animate={isSplitting ? { x: '100%' } : { x: '0%' }}
        transition={{ duration: 1.15, ease: curtainEase }}
        className="absolute top-0 right-0 w-1/2 h-full bg-[#0a0a0a] border-l border-stroke/50 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] z-20 flex flex-col justify-between p-8 md:p-14 overflow-hidden"
      >
        {/* Top Right Label */}
        <motion.div
          animate={contentFaded ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-muted uppercase tracking-[0.2em] text-right font-medium"
        >
          2026 EDITION
        </motion.div>

        {/* Bottom Right: Big Counter */}
        <motion.div
          animate={contentFaded ? { opacity: 0, scale: 0.9, y: 15 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex justify-end items-end"
        >
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none tracking-tighter">
            {String(count).padStart(3, "0")}
          </div>
        </motion.div>
      </motion.div>

      {/* ── CENTER FLOATING CONTENT (Words & Seam Glow) ── */}
      <motion.div
        animate={contentFaded ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Center Word Reveal with Mask */}
        <div className="h-28 md:h-36 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ y: 30, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -30, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/90 tracking-tight"
            >
              {WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Center Split Seam Line / Accent Glow when loading reaches 100% */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={
            count === 100 && !isSplitting
              ? { scaleY: 1, opacity: 1 }
              : { scaleY: 0, opacity: 0 }
          }
          transition={{ duration: 0.2 }}
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#89AACC] to-transparent shadow-[0_0_15px_#89AACC]"
        />
      </motion.div>

      {/* ── BOTTOM PROGRESS BAR ── */}
      <motion.div
        animate={contentFaded ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-stroke/30 z-30"
      >
        <div
          className="h-full accent-gradient transition-transform duration-75 ease-linear origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: '0 0 12px rgba(137, 170, 204, 0.6)',
          }}
        />
      </motion.div>
    </div>
  );
};
