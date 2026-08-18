import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';

const ROLES = ["Developer", "PM", "Web3", "Leader"];
const HLS_STREAM_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState<number>(0);

  // Initialize HLS Video Player
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

  // Cycle role every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Timeline (with fromTo to guarantee 100% visibility)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.1 }
      );

      tl.fromTo(
        '.blur-in',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
        '-=0.8'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent text-center px-6"
    >
      {/* Background Ambient Glow + HLS Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle radial ambient atmosphere */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-purple-950/20 via-blue-950/15 to-transparent blur-3xl rounded-full" />

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-65 mix-blend-screen"
        />
        
        {/* Dark overlay & bottom fade gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0a0a0f]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
      </div>

      {/* Hero Content (centered, z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center pt-24 md:pt-32 pb-16">
        
        {/* Eyebrow */}
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 font-medium">
          PORTFOLIO '26
        </p>

        {/* Name */}
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 select-none">
          Luthfi Pratama
        </h1>

        {/* Role line */}
        <div className="blur-in text-lg md:text-2xl text-text-primary/90 font-light mb-6">
          <span>A </span>
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block underline decoration-stroke/60 underline-offset-4"
          >
            {ROLES[roleIndex]}
          </span>
          <span> based in Jakarta.</span>
        </div>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12 font-normal leading-relaxed">
          Building robust web applications and leading teams to deliver impactful software solutions.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          
          {/* Button 1: "See Works" */}
          <a
            href="#work"
            className="group relative inline-flex items-center justify-center rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative rounded-full bg-text-primary text-bg font-medium text-sm px-7 py-3.5 transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
              See Works
            </span>
          </a>

          {/* Button 2: "Reach out..." */}
          <a
            href="mailto:luthfipratama1012@gmail.com"
            className="group relative inline-flex items-center justify-center rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative rounded-full border-2 border-stroke bg-bg text-text-primary font-medium text-sm px-7 py-3.5 transition-colors duration-300 group-hover:border-transparent">
              Reach out...
            </span>
          </a>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.2em] font-medium">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke/60 relative overflow-hidden">
          <div className="w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
