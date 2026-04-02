import dynamic from 'next/dynamic';
import {FC, memo, useEffect, useState} from 'react';

// Dynamically import particle system to avoid SSR issues
// eslint-disable-next-line react-memo/require-memo
const ParticleSystem = dynamic(() => import('../ParticleSystem'), {ssr: false});

interface ScrollIndicatorProps {}

// eslint-disable-next-line react-memo/require-memo
const ScrollIndicatorComponent: FC<ScrollIndicatorProps> = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full bg-black py-16 flex flex-col items-center justify-center min-h-32">
      {mounted && (
        <div className="relative w-full px-4 flex items-center justify-center">
          <ParticleSystem fontSize={28} text="SCROLL ↓" />
        </div>
      )}
    </div>
  );
};

ScrollIndicatorComponent.displayName = 'ScrollIndicator';

const ScrollIndicator = memo(ScrollIndicatorComponent);
export default ScrollIndicator;
