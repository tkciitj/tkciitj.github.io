import { FC, memo } from 'react';
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import Section from '../Layout/Section';
import { SectionId, experience, education } from '../../data/data';

const Experiences: FC = memo(() => {
  return (
    <Section className="text-white" sectionId={SectionId.Experience}>
      <div className="flex flex-col gap-y-16">
        {/* Experience Section */}
        <div className="flex flex-col gap-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a0f0df] to-[#3baaa0]">
            Work & Experience
          </h2>

          <div className="space-y-4">
            {experience.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="rounded-xl border border-[#a0f0df]/20 bg-white/5 p-6 shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#a0f0df]/50 hover:bg-white/10 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#a0f0df]/10 border border-[#a0f0df]/30 flex-shrink-0">
                    <BriefcaseIcon className="h-6 w-6 text-[#a0f0df]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-2 flex-wrap items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[#a0f0df]">
                          {item.title}
                        </h3>
                        <p className="text-sm text-neutral-400 italic">
                          {item.location}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-neutral-400 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                        {item.date}
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-neutral-300 leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="flex flex-col gap-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a0f0df] to-[#3baaa0]">
            Education
          </h2>

          <div className="space-y-4">
            {education.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="rounded-xl border border-[#a0f0df]/20 bg-white/5 p-6 shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#a0f0df]/50 hover:bg-white/10 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#a0f0df]/10 border border-[#a0f0df]/30 flex-shrink-0">
                    <AcademicCapIcon className="h-6 w-6 text-[#a0f0df]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-2 flex-wrap items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[#a0f0df]">
                          {item.title}
                        </h3>
                        <p className="text-sm text-neutral-400 italic">
                          {item.location}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-neutral-400 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                        {item.date}
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-neutral-300 leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
});

Experiences.displayName = 'Experiences';
export default Experiences;
