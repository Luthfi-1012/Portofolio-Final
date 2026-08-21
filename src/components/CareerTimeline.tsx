import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CareerTimeline.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Types ── */
export interface Milestone {
  period: string;
  isCurrent?: boolean;
  role: string;
  company: string;
  description: string;
}

export interface CareerTimelineProps {
  milestones: Milestone[];
  lineColor?: string;
  dotColor?: string;
  accentColor?: string;
  className?: string;
}

/* ── Component ── */
export const CareerTimeline: React.FC<CareerTimelineProps> = ({
  milestones,
  lineColor = 'rgba(255,255,255,0.07)',
  dotColor = '#89AACC',
  accentColor = '#89AACC',
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const milestonesRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Center line grow-down ── */
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      /* ── Per-milestone reveal ── */
      milestones.forEach((_, i) => {
        const card = milestonesRef.current[i];
        const dot = dotsRef.current[i];
        if (!card) return;

        // Determine slide direction: odd items come from right, even from left (desktop)
        const isLeft = i % 2 === 0;
        const xShift = window.innerWidth >= 768 ? (isLeft ? -30 : 30) : 0;

        gsap.fromTo(
          card,
          { opacity: 0, y: 30, x: xShift },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );

        // Dot pulse on reveal
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 78%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      /* ── Active dot — closest to viewport center gets a ring ── */
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: () => {
          const viewCenter = window.innerHeight / 2;
          let closestIdx = -1;
          let closestDist = Infinity;

          milestonesRef.current.forEach((el, i) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const elCenter = rect.top + rect.height / 2;
            const dist = Math.abs(elCenter - viewCenter);
            if (dist < closestDist) {
              closestDist = dist;
              closestIdx = i;
            }
          });

          dotsRef.current.forEach((dot, i) => {
            if (!dot) return;
            if (i === closestIdx && closestDist < window.innerHeight * 0.4) {
              dot.classList.add('ct-dot-active');
            } else {
              dot.classList.remove('ct-dot-active');
            }
          });
        },
      });
    }, section);

    // Refresh after load
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 600);

    return () => {
      ctx.revert();
      window.removeEventListener('load', onLoad);
      clearTimeout(refreshTimer);
    };
  }, [milestones]);

  return (
    <section
      id="career"
      ref={sectionRef}
      className={`career-timeline-section ${className}`}
    >
      <div className="ct-container">
        {/* ── Timeline ── */}
        <div className="ct-timeline">
          {/* Center vertical line */}
          <div
            ref={lineRef}
            className="ct-line"
            style={{ backgroundColor: lineColor }}
          />

          {/* Milestones */}
          {milestones.map((ms, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div
                key={i}
                ref={(el) => { milestonesRef.current[i] = el; }}
                className={`ct-milestone ${isLeft ? 'ct-left' : 'ct-right'}`}
              >
                {/* Dot on line */}
                <div
                  ref={(el) => { dotsRef.current[i] = el; }}
                  className={`ct-dot ${ms.isCurrent ? 'ct-dot-current' : ''}`}
                  style={{
                    backgroundColor: dotColor,
                    boxShadow: `0 0 12px ${dotColor}60`,
                  }}
                />

                {/* Content card */}
                <div className="ct-content">
                  <span
                    className="ct-period"
                    style={{ color: accentColor }}
                  >
                    {ms.period}
                    {ms.isCurrent && (
                      <span className="ct-current-badge">CURRENT</span>
                    )}
                  </span>
                  <h3 className="ct-role">{ms.role}</h3>
                  <p className="ct-company">{ms.company}</p>
                  <p className="ct-desc">{ms.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
