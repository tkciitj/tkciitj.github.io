import {CheckCircleIcon} from '@heroicons/react/24/solid';
import {FC, memo} from 'react';

import {SectionId,skills} from '../../data/data';
import Section from '../Layout/Section';

const Skills: FC = memo(() => {
  return (
    <Section className="text-white" sectionId={SectionId.Skills}>
      <div className="flex flex-col gap-y-12">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a0f0df] to-[#3baaa0]">
          Technical Skills & Tools
        </h2>

        {/* Skills Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {skills.map((group, index) => (
            <div
              className="rounded-2xl border border-[#a0f0df]/20 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#a0f0df]/50 hover:bg-white/10 hover:shadow-xl"
              key={`${group.name}-${index}`}>
              {/* Group Title */}
              <h3 className="mb-6 text-xl font-semibold text-[#a0f0df]">{group.name}</h3>

              {/* Skills List */}
              <ul className="space-y-4">
                {group.skills.map((skill, i) => (
                  <li className="flex items-center justify-between" key={`${skill.name}-${i}`}>
                    <div className="flex items-center gap-3 flex-1">
                      <CheckCircleIcon className="h-5 w-5 text-[#a0f0df] flex-shrink-0" />
                      <span className="text-sm sm:text-base text-neutral-200">{skill.name}</span>
                    </div>

                    {/* Level Indicator */}
                    <div className="flex items-center gap-2">
                      <div className="w-16 sm:w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#a0f0df] to-[#3baaa0] rounded-full transition-all duration-500"
                          style={{width: `${(skill.level / 10) * 100}%`}}
                        />
                      </div>
                      <span className="text-xs text-neutral-400 min-w-6 text-right">{skill.level}/10</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
});

Skills.displayName = 'Skills';
export default Skills;
