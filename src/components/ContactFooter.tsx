import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const HLS_STREAM_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const ContactFooter: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  // Initialize background video (flipped vertically)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(HLS_STREAM_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_STREAM_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Marquee Animation
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      gsap.to(marquee, {
        xPercent: -50,
        duration: 35,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const marqueeText = Array(10).fill("BUILDING THE FUTURE • ").join("");

  return (
    <footer id="contact" className="relative bg-bg pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-stroke/40">
      
      {/* Flipped HLS Background Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-50"
        />
        {/* Heavier dark overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center">
        
        {/* GSAP Marquee */}
        <div className="w-full overflow-hidden mb-12 md:mb-20 py-3 select-none">
          <div
            ref={marqueeRef}
            className="inline-block whitespace-nowrap text-5xl md:text-7xl lg:text-9xl font-bold text-text-primary/15 tracking-tight"
          >
            {marqueeText}
          </div>
        </div>

        {/* CTA Block */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <p className="text-xs text-muted uppercase tracking-[0.3em] font-medium mb-4">
            INITIATE COLLABORATION
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl text-text-primary font-normal tracking-tight mb-8">
            Have an idea? <br />
            Let's <span className="font-semibold text-text-primary">build together.</span>
          </h2>

          {/* Email button with gradient hover border ring */}
          <a
            href="mailto:luthfipratama1012@gmail.com"
            className="group relative inline-flex items-center justify-center rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <span className="relative inline-flex items-center gap-3 rounded-full border border-white/10 bg-surface px-8 md:px-10 py-4 md:py-5 text-sm md:text-base font-medium text-text-primary backdrop-blur-md transition-colors group-hover:bg-bg">
              luthfipratama1012@gmail.com
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </a>
        </div>

        {/* Footer Bar */}
        <div className="w-full pt-8 border-t border-stroke/60 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted font-normal">
          
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/m-luthfi-pratama~-167b0a387' },
              { label: 'GitHub', href: 'https://github.com/Luthfi-1012' },
              { label: 'Instagram', href: 'https://www.instagram.com/luthfi.prtma' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors flex items-center gap-0.5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-stroke">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-text-primary text-[11px] font-medium tracking-wide">
              Available for projects
            </span>
          </div>

          {/* Copyright */}
          <div>
            © {new Date().getFullYear()} M. Luthfi Pratama. All rights reserved.
          </div>

        </div>

      </div>
    </footer>
  );
};
