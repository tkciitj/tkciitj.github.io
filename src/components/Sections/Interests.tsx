import { FC, memo } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import Section from '../Layout/Section';
import { SectionId } from '../../data/data';

const Interests: FC = memo(() => {
  const interestList = ['Tech Exploration', 'UI/UX Design', 'Open Source', 'Clean Architecture', 'Creative Coding'];

  return (
    <Section className="bg-grid bg-black/80 backdrop-blur-sm" sectionId={SectionId.Stats}>
      <div className="flex flex-col gap-y-10">
        <h2 className="self-center text-3xl font-bold text-mint-300">Personal Interests</h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {interestList.map((interest, index) => (
            <div
              key={interest + index}
              className="flex items-center gap-3 rounded-xl border border-mint-500/30 bg-white/5 p-4 text-white shadow-md backdrop-blur-md"
            >
              <SparklesIcon className="h-5 w-5 text-mint-300" />
              <span className="text-sm font-medium">{interest}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
});

Interests.displayName = 'Interests';
export default Interests;
