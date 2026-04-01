import classNames from 'classnames';
import Image from 'next/image';
import { FC, memo } from 'react';

import { aboutData, SectionId } from '../../data/data';
import Section from '../Layout/Section';

const About: FC = memo(() => {
  const { profileImageSrc, description, aboutItems } = aboutData;

  return (
    <Section className="text-white" sectionId={SectionId.About}>
      <div className="flex flex-col gap-y-8">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a0f0df] to-[#3baaa0]">
          About Me
        </h2>

        <div className={classNames('grid grid-cols-1 gap-8', { 'lg:grid-cols-4': !!profileImageSrc })}>
          {/* Profile Image */}
          {!!profileImageSrc && (
            <div className="col-span-1 flex justify-center lg:justify-start">
              <div className="relative h-32 w-32 overflow-hidden rounded-2xl lg:h-48 lg:w-48 ring-2 ring-[#a0f0df]/50 shadow-2xl hover:ring-[#a0f0df] transition-all duration-300">
                <Image alt="profile" className="h-full w-full object-cover" src={profileImageSrc} />
              </div>
            </div>
          )}

          {/* Description + Info */}
          <div className={classNames('col-span-1 flex flex-col gap-y-6', { 'lg:col-span-3': !!profileImageSrc })}>
            {/* Bio */}
            <p className="text-base lg:text-lg text-neutral-300 leading-relaxed">
              {description}
            </p>

            {/* Info Items Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutItems.map(({ label, text, Icon }, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-[#a0f0df]/20 hover:border-[#a0f0df]/50 transition-all duration-300 hover:bg-white/10"
                >
                  {Icon && <Icon className="mt-1 h-5 w-5 text-[#a0f0df] flex-shrink-0" />}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">{label}</span>
                    <span className="text-sm text-neutral-400">{text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

About.displayName = 'About';
export default About;
