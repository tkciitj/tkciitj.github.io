import dynamic from 'next/dynamic';
import {FC, memo, useEffect, useState} from 'react';

import {SectionId} from '../../data/data';
import Section from '../Layout/Section';

// Dynamically import particle system to avoid SSR issues
// eslint-disable-next-line react-memo/require-memo
const ParticleSystem = dynamic(() => import('../ParticleSystem'), {ssr: false});

interface HeroInteractiveProps {}

// eslint-disable-next-line react-memo/require-memo
const HeroInteractiveComponent: FC<HeroInteractiveProps> = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Small delay to allow particles to initialize
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#1a1a2e] to-[#0f0f0f]">
        {/* Particle Background */}
        <div className="absolute inset-0 z-0">
          <ParticleSystem density={8} fontSize={120} interactive={true} text="HI i am tushar kant" />
        </div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 z-5 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Info text - fade in after particles load */}
        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-between px-4 py-8 transition-opacity duration-1000 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}>
          {/* Top info */}
          <div className="pt-20">
            <p className="text-center text-sm sm:text-base text-gray-400">
              Click anywhere to create a black hole effect
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce pb-8">
            <a
              aria-label="Scroll to next section"
              className="flex flex-col items-center gap-2 text-[#a0f0df] hover:text-[#64d5ca] transition-colors"
              href={`/#${SectionId.About}`}>
              <span className="text-sm font-semibold">Scroll</span>
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

HeroInteractiveComponent.displayName = 'HeroInteractive';

const HeroInteractive = memo(HeroInteractiveComponent);
export default HeroInteractive;
