import React, { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  isReducedMotion: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  isReducedMotion: false,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    // 1. Respect prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hasReducedMotion = reducedMotionQuery.matches;
    setIsReducedMotion(hasReducedMotion);

    if (hasReducedMotion) {
      // In reduced motion mode: disable Lenis, ensure ScrollTrigger operates in passive/standard mode
      ScrollTrigger.config({ ignoreMobileResize: true });
      return;
    }

    // 2. Initialize Lenis with calmer, more controlled scroll pacing
    const lenis = new Lenis({
      duration: 1.4, // weighted, smooth easing
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.68, // reduced speed per wheel notch for a steady, relaxed scroll
      touchMultiplier: 1.1,
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // 3. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 4. Listen for reduced motion changes at runtime
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) {
        lenis.destroy();
        gsap.ticker.remove(tickerCallback);
        setLenisInstance(null);
      }
    };
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    // 5. Cleanup logic on unmount
    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, isReducedMotion }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
