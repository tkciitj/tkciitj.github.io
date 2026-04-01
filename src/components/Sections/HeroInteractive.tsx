import dynamic from 'next/dynamic';
import {FC, memo, useEffect, useState} from 'react';

import {heroData, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import Socials from '../Socials';

// Dynamically import particle system to avoid SSR issues
// eslint-disable-next-line react-memo/require-memo
const ParticleSystem = dynamic(() => import('../ParticleSystem'), {ssr: false});

interface HeroInteractiveProps {}

// eslint-disable-next-line react-memo/require-memo
const HeroInteractiveComponent: FC<HeroInteractiveProps> = () => {
  const {name, description, actions} = heroData;
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
          <ParticleSystem density={2} fontSize={100} interactive={true} text={name} />
        </div>

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 z-5 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Content - fade in after particles load */}
        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center px-4 transition-opacity duration-1000 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}>
          <div className="text-center max-w-3xl mx-auto">
            {/* Main title with glow effect */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#a0f0df] via-[#64d5ca] to-[#3baaa0] drop-shadow-xl animate-pulse">
              {name}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>

            {/* Socials */}
            <div className="flex gap-x-4 text-[#a0f0df] justify-center mb-8">
              <Socials />
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {actions.map(({href, text, primary, Icon}) => (
                <a
                  className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
                    primary
                      ? 'bg-gradient-to-r from-[#a0f0df] to-[#64d5ca] text-black hover:shadow-lg hover:shadow-[#a0f0df]/50'
                      : 'border-2 border-[#a0f0df]/50 text-[#a0f0df] hover:border-[#a0f0df] hover:bg-[#a0f0df]/10'
                  }`}
                  href={href}
                  key={text}>
                  {text}
                  {Icon && <Icon className="h-5 w-5" />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
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
    </Section>
  );
};

HeroInteractiveComponent.displayName = 'HeroInteractive';

const HeroInteractive = memo(HeroInteractiveComponent);
export default HeroInteractive;
