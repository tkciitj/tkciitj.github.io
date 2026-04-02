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
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <ParticleSystem fontSize={50} text="HI, I AM TUSHAR KANT!" />
          </div>
        )}
      </div>
    </Section>
  );
};

HeroInteractiveComponent.displayName = 'HeroInteractive';

const HeroInteractive = memo(HeroInteractiveComponent);
export default HeroInteractive;
