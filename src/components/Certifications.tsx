import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Code2, Globe, Brain, X, ExternalLink, Maximize2, Sparkles } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import type { Certification } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

/* ── Category Configuration ── */
const CATEGORY_CONFIG: Record<Certification['category'], { label: string; icon: React.ElementType; color: string; bgGlow: string }> = {
  web3: { label: 'Web3', icon: Globe, color: '#89AACC', bgGlow: 'rgba(137, 170, 204, 0.12)' },
  development: { label: 'Development', icon: Code2, color: '#89AACC', bgGlow: 'rgba(137, 170, 204, 0.12)' },
  leadership: { label: 'Leadership', icon: Award, color: '#89AACC', bgGlow: 'rgba(137, 170, 204, 0.12)' },
  ai: { label: 'AI', icon: Brain, color: '#89AACC', bgGlow: 'rgba(137, 170, 204, 0.12)' },
};

type FilterKey = 'all' | Certification['category'];

/* ── Certificate Lightbox Modal Component ── */
const CertificateModal: React.FC<{
  cert: Certification | null;
  onClose: () => void;
}> = ({ cert, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cert) return;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    tl.fromTo(
      cardRef.current,
      { opacity: 0, y: 40, scale: 0.94, rotateX: 6 },
      { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.45, ease: 'power3.out' },
      '-=0.1'
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cert]);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to(cardRef.current, { opacity: 0, y: 30, scale: 0.96, duration: 0.25, ease: 'power2.in' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1');
  }, [onClose]);

  if (!cert) return null;

  const config = CATEGORY_CONFIG[cert.category];
  const IconComp = config.icon;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      onClick={handleClose}
      style={{ opacity: 0 }}
    >
      {/* Dark Blur Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal Card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/80"
        style={{
          background: 'linear-gradient(150deg, rgba(20,20,32,0.98) 0%, rgba(10,10,18,0.99) 100%)',
          opacity: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic Glow Orb behind top right */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[110px] pointer-events-none opacity-40"
          style={{ background: config.color }}
        />

        {/* Header Bar */}
        <div className="relative z-10 flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-surface/30 backdrop-blur-sm">
          <div className="flex items-center gap-3.5 min-w-0 pr-4">
            {/* Category Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
              style={{
                borderColor: `${config.color}35`,
                background: `linear-gradient(135deg, ${config.color}20, transparent)`,
              }}
            >
              <IconComp className="w-5 h-5" style={{ color: config.color }} />
            </div>

            <div className="min-w-0">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-text-primary leading-tight truncate">
                {cert.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-muted">
                <span>{cert.issuer}</span>
                <span className="w-1 h-1 rounded-full bg-muted/40" />
                <span>{cert.date}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Open full image in new tab */}
            <a
              href={cert.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-white/10 text-muted hover:text-text-primary hover:border-white/30 hover:bg-white/5 transition-all duration-200"
              title="Open full size"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            {/* Close button */}
            <button
              onClick={handleClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-white/10 text-muted hover:text-text-primary hover:border-white/30 hover:bg-white/5 transition-all duration-200"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Area — Crisp Image Display */}
        <div className="relative flex-1 min-h-[300px] max-h-[70vh] flex items-center justify-center p-4 sm:p-6 overflow-auto bg-black/40">
          <img
            src={cert.certificateUrl}
            alt={cert.title}
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/10"
            loading="eager"
          />
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between p-3.5 sm:px-6 border-t border-white/10 bg-surface/20">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border"
            style={{
              color: config.color,
              borderColor: `${config.color}30`,
              backgroundColor: `${config.color}10`,
            }}
          >
            <IconComp className="w-3 h-3" />
            {config.label}
          </span>
          <span className="text-[11px] text-muted/60 font-mono flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#89AACC]" />
            Verified Credential
          </span>
        </div>
      </div>
    </div>
  );
};

/* ── Main Certifications Section ── */
export const Certifications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  const filtered = activeFilter === 'all'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter(c => c.category === activeFilter);

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'web3', label: 'Web3' },
    { key: 'development', label: 'Development' },
    { key: 'leadership', label: 'Leadership' },
    { key: 'ai', label: 'AI' },
  ];

  /* ── GSAP ScrollTrigger Animations ── */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
          }
        );
      }

      // Filter pills stagger
      if (filtersRef.current) {
        const pills = filtersRef.current.querySelectorAll('button');
        gsap.fromTo(
          pills,
          { opacity: 0, y: 15, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
          }
        );
      }

      // Counter animation
      if (counterRef.current) {
        const proxy = { value: 0 };
        gsap.to(proxy, {
          value: CERTIFICATIONS.length,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 78%', toggleActions: 'play none none none' },
          onUpdate() {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(proxy.value));
            }
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── GSAP Card Stagger on filter change ── */
  useLayoutEffect(() => {
    const validCards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (validCards.length === 0) return;

    gsap.fromTo(
      validCards,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      }
    );
  }, [activeFilter]);

  /* ── Card hover GSAP effects ── */
  const handleCardEnter = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    gsap.to(el, {
      y: -6,
      scale: 1.015,
      duration: 0.35,
      ease: 'power2.out',
    });
    const glow = el.querySelector('.card-glow');
    if (glow) {
      gsap.to(glow, { opacity: 1, duration: 0.35 });
    }
    const img = el.querySelector('.cert-preview-img');
    if (img) {
      gsap.to(img, { scale: 1.06, duration: 0.5, ease: 'power2.out' });
    }
  }, []);

  const handleCardLeave = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    gsap.to(el, {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    });
    const glow = el.querySelector('.card-glow');
    if (glow) {
      gsap.to(glow, { opacity: 0, duration: 0.35 });
    }
    const img = el.querySelector('.cert-preview-img');
    if (img) {
      gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
    }
  }, []);

  return (
    <>
      <section
        id="certifications"
        ref={sectionRef}
        className="bg-bg py-16 md:py-24 relative z-10 border-t border-stroke/40 overflow-hidden"
      >
        {/* Ambient background glow orbs */}
        <div className="absolute top-20 -left-40 w-96 h-96 rounded-full bg-blue-600/5 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 rounded-full bg-violet-600/5 blur-[140px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">

          {/* Header */}
          <div
            ref={headerRef}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
            style={{ opacity: 0 }}
          >
            <div>
              {/* Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-normal tracking-tight">
                Earned <span className="font-semibold text-text-primary">credentials</span>
              </h2>

              {/* Subtext */}
              <p className="text-sm md:text-base text-muted max-w-md mt-3 font-normal">
                Certifications & training programs across Web3, software development, and AI.
              </p>
            </div>

            {/* Filter Pills */}
            <div ref={filtersRef} className="flex items-center gap-2 flex-wrap">
              {filters.map(f => {
                const isActive = activeFilter === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`relative text-xs uppercase tracking-wider px-5 py-2.5 rounded-full border transition-all duration-300 font-medium overflow-hidden ${
                      isActive
                        ? 'text-bg border-transparent shadow-lg shadow-white/10'
                        : 'bg-transparent text-muted border-stroke hover:text-text-primary hover:border-white/30'
                    }`}
                    style={isActive ? { background: 'linear-gradient(135deg, #89AACC, #4E85BF)' } : {}}
                  >
                    {f.label}
                    {isActive && (
                      <span className="absolute inset-0 bg-white/10 rounded-full animate-pulse pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Certifications Card Showcase (2-Column Grid on Tablet/Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {filtered.map((cert, index) => {
              const config = CATEGORY_CONFIG[cert.category];
              const IconComp = config.icon;

              return (
                <div
                  key={cert.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  onClick={() => setSelectedCert(cert)}
                  className="group relative flex flex-col sm:flex-row items-stretch gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-surface/40 hover:bg-surface/70 hover:border-[#89AACC]/40 cursor-pointer transition-all duration-300 overflow-hidden"
                >
                  {/* Left: Certificate Screenshot Thumbnail */}
                  <div className="relative w-full sm:w-44 h-36 sm:h-auto rounded-xl sm:rounded-2xl overflow-hidden bg-black/40 shrink-0 flex items-center justify-center">
                    <img
                      src={cert.certificateUrl}
                      alt={cert.title}
                      className="cert-preview-img w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Subtle gradient vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />

                    {/* Magnifier / Quick View pill overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-xl">
                        <Maximize2 className="w-3.5 h-3.5 text-[#89AACC]" />
                        Inspect
                      </span>
                    </div>
                  </div>

                  {/* Right: Content details */}
                  <div className="relative z-10 flex-1 flex flex-col justify-between py-1 min-w-0">
                    <div>
                      {/* Category Badge & Date */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#89AACC]/30 text-[#89AACC] bg-[#89AACC]/10"
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          {config.label}
                        </span>

                        <span className="font-mono text-xs text-muted">
                          {cert.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-medium text-text-primary group-hover:text-white transition-colors duration-300 leading-snug line-clamp-2">
                        {cert.title}
                      </h3>

                      {/* Issuer */}
                      <p className="text-sm text-muted mt-1.5 line-clamp-1">
                        {cert.issuer}
                      </p>
                    </div>

                    {/* Bottom CTA row */}
                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/5">
                      <span className="text-xs text-muted/70 group-hover:text-text-primary transition-colors flex items-center gap-1">
                        Click to preview
                      </span>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 text-muted group-hover:text-text-primary group-hover:border-white/30 group-hover:bg-white/5 transition-all duration-300"
                      >
                        <Maximize2 className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certificate Lightbox Preview Modal */}
      <CertificateModal
        cert={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </>
  );
};
