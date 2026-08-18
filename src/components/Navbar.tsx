import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setCurrentSection(sectionId);

    if (onNavigate) {
      onNavigate(sectionId);
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 transition-all duration-300 pointer-events-none">
      <nav
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-all duration-300 ${
          isScrolled ? 'shadow-md shadow-black/40 border-white/20 bg-surface/90' : ''
        }`}
      >
        {/* 1. Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="group relative flex items-center justify-center rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110"
          aria-label="Home"
        >
          <div className="absolute inset-0 rounded-full accent-gradient transition-all duration-500 group-hover:rotate-180" />
          <div className="relative w-9 h-9 rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] font-semibold text-text-primary tracking-tighter">
              LP
            </span>
          </div>
        </a>

        {/* 2. Divider (hidden on mobile) */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-1.5" />

        {/* 3. Nav Links */}
        <div className="flex items-center space-x-1">
          {[
            { id: 'home', label: 'Home' },
            { id: 'work', label: 'Work' },
            { id: 'journal', label: 'Resume' },
          ].map((item) => {
            const isActive = currentSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-medium ${
                  isActive
                    ? 'text-text-primary bg-stroke/60 shadow-inner'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5" />

        {/* 5. "Say hi" button with hover accent gradient border ring */}
        <a
          href="mailto:luthfipratama1012@gmail.com"
          className="group relative inline-flex items-center rounded-full p-[1px] text-xs sm:text-sm font-medium transition-transform duration-200 hover:scale-105"
        >
          {/* Animated gradient border behind on hover */}
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
          <span className="absolute -inset-[1px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Inner Content */}
          <span className="relative inline-flex items-center gap-1 rounded-full bg-surface px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary transition-colors group-hover:bg-bg">
            Say hi
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
      </nav>
    </header>
  );
};
