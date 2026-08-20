import React from 'react';

interface TechItem {
  name: string;
  svg: React.ReactNode;
}

const TECH_ITEMS: TechItem[] = [
  {
    name: 'React.js',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Laravel',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0 text-[#FF2D20]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.2 6.5l-8.5-4.9c-.4-.2-.9-.2-1.3 0L2.8 6.5c-.5.3-.8.8-.8 1.4v9.8c0 .6.3 1.1.8 1.4l8.5 4.9c.2.1.5.2.7.2s.5-.1.7-.2l8.5-4.9c.5-.3.8-.8.8-1.4V7.9c0-.6-.3-1.1-.8-1.4zm-9.2 13.9L4 15.9V8.8l8 4.6v7zm1-8.2L5.2 7.7 12 3.8l6.8 3.9-6.8 4.5zm7 3.7l-6 3.5v-7l6-3.5v7z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0 rounded-[3px]" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3" fill="#3178C6" />
        <path d="M11.75 14.25H9.25V20H7.5V14.25H5V12.75H11.75V14.25ZM18.5 15.5C18.5 14.5 17.75 13.75 16.5 13.5L15.25 13.25C14.5 13 14 12.75 14 12.25C14 11.75 14.5 11.25 15.25 11.25C16 11.25 16.5 11.5 16.75 12H18.25C18 10.75 16.75 10 15.25 10C13.5 10 12.25 11 12.25 12.5C12.25 13.75 13 14.25 14.25 14.5L15.5 14.75C16.25 15 16.75 15.25 16.75 15.75C16.75 16.25 16.25 16.75 15.25 16.75C14.25 16.75 13.5 16.25 13.25 15.5H11.75C12 17 13.25 18 15.25 18C17 18 18.5 17 18.5 15.5Z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
      </svg>
    ),
  },
  {
    name: 'Flutter',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372z" fill="#02569B" />
        <path d="M14.314 11.286L8.143 17.457 14.314 23.63h7.372l-6.171-6.173 6.171-6.171h-7.372z" fill="#0175C2" />
        <path d="M14.314 11.286L10.229 15.371l4.085 4.086 4.086-4.086-4.086-4.085z" fill="#29B6F6" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.666 17.666l-5.334-7.5v7.5H10.5V6.334h1.834l5.332 7.5v-7.5h1.834v11.332h-1.834z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: 'MySQL',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0 text-[#4479A1]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.477 3 2 6.582 2 11c0 2.72 1.688 5.12 4.256 6.54L5.5 21l4.28-1.712C10.49 19.38 11.23 19.4 12 19.4c5.523 0 10-3.582 10-8s-4.477-8-10-8zm-2.5 11c-1.38 0-2.5-1.12-2.5-2.5S8.12 9 9.5 9s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm5 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0 text-[#5FA04E]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.05a1.8 1.8 0 0 0-.9.25l-7.8 4.5a1.8 1.8 0 0 0-.9 1.56v9a1.8 1.8 0 0 0 .9 1.56l7.8 4.5a1.8 1.8 0 0 0 1.8 0l7.8-4.5a1.8 1.8 0 0 0 .9-1.56v-9a1.8 1.8 0 0 0-.9-1.56l-7.8-4.5a1.8 1.8 0 0 0-.9-.25zm0 2.1l7 4.04-7 4.04-7-4.04 7-4.04zm-8 6.1l7 4.04v8.08l-7-4.04v-8.08zm16 0v8.08l-7 4.04v-8.08l7-4.04z" />
      </svg>
    ),
  },
  {
    name: 'Git',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="#F05032">
        <path d="M23.546 10.93L13.067.452c-.6-.6-1.58-.6-2.18 0L8.7 2.64l3.05 3.05c.64-.22 1.4-.07 1.9.43.5.5.65 1.26.43 1.9l3.05 3.05c.64-.22 1.4-.07 1.9.43.7.7.7 1.84 0 2.54-.7.7-1.84.7-2.54 0-.5-.5-.65-1.26-.43-1.9L13 9.09v6.83c.2.1.38.24.53.39.7.7.7 1.84 0 2.54-.7.7-1.84.7-2.54 0-.7-.7-.7-1.84 0-2.54.15-.15.33-.29.53-.39V9.09c-.2-.1-.38-.24-.53-.39-.5-.5-.65-1.26-.43-1.9L7.51 3.75.454 10.8c-.6.6-.6 1.58 0 2.18l10.48 10.48c.6.6 1.58.6 2.18 0l10.43-10.43c.6-.6.6-1.58 0-2.1z" />
      </svg>
    ),
  },
  {
    name: 'Postman',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#FF6C37" />
        <path d="M22.5 9.5L14.2 14.8c-.4-.5-.9-.8-1.5-.9l-3.3-1.9c.7-.6 1.7-1 2.8-1 2.3 0 4.3 1.3 5.3 3.2l5-4.7z" fill="white" />
        <path d="M12.5 15.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Vite',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 32 32" fill="none">
        <path d="M29.5 4.5L16.8 28.2a1 1 0 0 1-1.8 0L2.5 4.5a1 1 0 0 1 .9-1.5h25.2a1 1 0 0 1 .9 1.5z" fill="url(#viteGradientOfficial)" />
        <path d="M20.5 3L11.2 15h4.2l-3.2 11 11.2-13.8h-4.5L20.5 3z" fill="#FFD62E" />
        <defs>
          <linearGradient id="viteGradientOfficial" x1="2" y1="3" x2="30" y2="29" gradientUnits="userSpaceOnUse">
            <stop stopColor="#41D1FF" />
            <stop offset="1" stopColor="#BD34FE" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'PHP',
    svg: (
      <svg className="w-5 h-5 flex-shrink-0 text-[#777BB4]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-5.2 14.5H5.1l.8-4.8h1.7c.8 0 1.4.2 1.8.6.4.4.6 1 .6 1.7 0 .8-.3 1.4-.8 1.9-.5.4-1.3.6-2.4.6zm6.5 0h-1.7l.8-4.8h1.7c.8 0 1.4.2 1.8.6.4.4.6 1 .6 1.7 0 .8-.3 1.4-.8 1.9-.5.4-1.3.6-2.4.6zm6.5-2.8c-.3.9-.8 1.6-1.5 2.1-.7.5-1.6.7-2.7.7h-2.3l1.3-7.5h2.3c1.1 0 2 .2 2.6.7.6.5.9 1.2.9 2.1 0 .7-.2 1.3-.6 1.9z" />
      </svg>
    ),
  },
];

export const TechMarquee: React.FC = () => {
  // Duplicate array 3 times for seamless infinite loop
  const marqueeList = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <section className="relative z-10 py-6 sm:py-8 overflow-hidden bg-transparent">
      {/* Marquee Track Container with Edge Gradient Masks */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="flex w-max items-center gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused] cursor-default py-1">
          {marqueeList.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="group/item flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Official Brand SVG Icon */}
              <div className="transition-transform duration-300 group-hover/item:scale-110 flex items-center justify-center">
                {item.svg}
              </div>

              {/* Clean Tech Name */}
              <span className="text-xs sm:text-[13px] font-medium text-white/80 group-hover/item:text-white transition-colors tracking-wide">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
