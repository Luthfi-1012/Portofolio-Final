import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProfileCard } from './ProfileCard';

gsap.registerPlugin(ScrollTrigger);

/* ── Types ── */
export interface AboutStat {
  value: number;
  suffix: string;
  label: string;
}

export interface AboutSectionProps {
  avatarUrl: string;
  heading: string;
  /** Paragraphs with **keyword** markdown for lime-highlighted words */
  paragraphs: string[];
  sideLabel?: string;
  stats: AboutStat[];
  accentColor?: string;
}

/* ── Helpers ── */
function renderParagraph(text: string): React.ReactNode {
  // Split on **...** and render highlighted keywords using serif italic typography & full white contrast
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={i}
        className="font-display italic text-[1.12em] text-text-primary tracking-normal font-normal inline-block px-0.5"
      >
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

/* ── Component ── */
export const AboutSection: React.FC<AboutSectionProps> = ({
  avatarUrl,
  heading,
  paragraphs,
  sideLabel = 'EST. 2017 — BANDUNG',
  stats,
  accentColor = 'rgba(160, 170, 220, 0.75)',
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const parasRef = useRef<HTMLDivElement | null>(null);
  const photoWrapRef = useRef<HTMLDivElement | null>(null);
  const statsRowRef = useRef<HTMLDivElement | null>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  /* ── GSAP ScrollTrigger Animations ── */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Header "(01) ABOUT" fade in
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Heading slide-up + fade
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 3. Paragraphs stagger
      if (parasRef.current) {
        const paras = parasRef.current.querySelectorAll('.about-para');
        if (paras.length > 0) {
          gsap.fromTo(
            paras,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              delay: 0.3,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }

      // 4. ProfileCard wrapper fade + scale (animate WRAPPER only, not inner card)
      if (photoWrapRef.current) {
        gsap.fromTo(
          photoWrapRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 5. Stats counter animation — triggered separately when stats row enters
      if (statsRowRef.current) {
        stats.forEach((stat, i) => {
          const el = counterRefs.current[i];
          if (!el) return;

          const proxy = { value: 0 };
          gsap.to(proxy, {
            value: stat.value,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRowRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onUpdate() {
              el.textContent = String(Math.round(proxy.value));
            },
          });
        });
      }
    }, section);

    // Refresh ScrollTrigger after fonts / images load
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    // Extra delayed refresh for svh-based ProfileCard height settling
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 800);

    return () => {
      ctx.revert();
      window.removeEventListener('load', onLoad);
      clearTimeout(refreshTimer);
    };
  }, [stats]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 py-20 md:py-28 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="flex items-center gap-3 mb-14 md:mb-20 opacity-0">
          <span
            className="font-mono text-xs font-medium tracking-wider text-[#a0aadc]"
          >
            (01)
          </span>
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
            ABOUT
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#a0aadc]/60" />
          <div className="flex-1 h-px bg-stroke/50" />
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-12 items-start">

          {/* Left: Photo (ProfileCard) */}
          <div className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-start">
            <div ref={photoWrapRef} className="relative opacity-0 w-full max-w-[380px]">

              {/* Decorative vertical side label */}
              {sideLabel && (
                <div className="hidden md:block absolute -right-8 lg:-right-10 top-1/2 -translate-y-1/2 z-20">
                  <span
                    className="font-mono text-[10px] text-muted/50 uppercase tracking-[0.25em] whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {sideLabel}
                  </span>
                </div>
              )}

              <ProfileCard
                avatarUrl={avatarUrl}
                iconUrl="/assets/profilecard/iconpattern.png"
                grainUrl="/assets/profilecard/grain.webp"
                showUserInfo={false}
                name=""
                title=""
                behindGlowColor="rgba(160, 170, 220, 0.4)"
                behindGlowSize="45%"
                innerGradient="linear-gradient(145deg, rgba(15,15,25,0.9) 0%, rgba(60,65,100,0.25) 100%)"
                enableTilt={true}
                className="about-profile-card"
              />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-center">

            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-[2.6rem] md:text-[3rem] lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-text-primary mb-8 md:mb-10 opacity-0"
            >
              {heading}
            </h2>

            {/* Paragraphs */}
            <div ref={parasRef} className="flex flex-col gap-5 md:gap-6">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="about-para text-[17px] md:text-[18px] text-muted leading-[1.75] font-normal opacity-0"
                >
                  {renderParagraph(p)}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div
          ref={statsRowRef}
          className="mt-20 md:mt-28 pt-10 md:pt-12 border-t border-stroke/40"
        >
          <div className="grid grid-cols-3 gap-6 md:gap-10">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-start">
                <div className="text-[2.8rem] md:text-[3.2rem] lg:text-[3.5rem] font-bold leading-none tracking-tight text-text-primary mb-2">
                  <span
                    ref={(el) => { counterRefs.current[i] = el; }}
                  >
                    0
                  </span>
                  {stat.suffix && (
                    <span className="text-[#a0aadc] ml-0.5">{stat.suffix}</span>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.2em] font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
