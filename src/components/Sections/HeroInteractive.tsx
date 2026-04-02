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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center">
        {mounted && (
          <>
            {/* Main particle text - centered, transparent background */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full flex items-center justify-center">
                <ParticleSystem fontSize={50} text="HI, I AM TUSHAR KANT!" />
              </div>
            </div>

            {/* Scroll indicator at bottom - smaller particles, no background patch */}
            <div className="absolute bottom-20 left-1/2 z-10 transform -translate-x-1/2 pointer-events-none">
              <ParticleSystem fontSize={28} text="SCROLL ↓" />
            </div>
          </>
        )}
      </div>
    </Section>
  );
};

HeroInteractiveComponent.displayName = 'HeroInteractive';

const HeroInteractive = memo(HeroInteractiveComponent);
export default HeroInteractive;
