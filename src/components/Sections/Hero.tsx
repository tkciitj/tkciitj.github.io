import { ChevronDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, memo } from 'react';

import { heroData, SectionId } from '../../data/data';
import Section from '../Layout/Section';
import Socials from '../Socials';

const Hero: FC = memo(() => {
  const { name, description, actions } = heroData;

  return (
    <Section noPadding sectionId={SectionId.Hero}>
      <div className="relative flex h-screen w-full items-center justify-center bg-grid bg-black/60 backdrop-blur-xl">
        <div className="z-10 max-w-screen-lg px-4 lg:px-0">
          <div className="flex flex-col items-center gap-y-6 rounded-3xl bg-white/5 px-8 py-10 text-center shadow-xl ring-1 ring-mint-300/20 backdrop-blur-xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-mint-300 sm:text-5xl lg:text-7xl">
              {name}
            </h1>
            <div className="prose prose-invert max-w-xl text-neutral-300 sm:text-lg">{description}</div>

            <div className="flex gap-x-4 text-mint-300">
              <Socials />
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {actions.map(({ href, text, primary, Icon }) => (
                <a
                  key={text}
                  href={href}
                  className={classNames(
                    'inline-flex items-center gap-2 rounded-full border-2 px-6 py-2 text-sm font-semibold transition-all duration-200',
                    primary
                      ? 'border-mint-400 bg-mint-500/10 text-mint-300 hover:bg-mint-400/10 hover:text-white focus:ring-mint-300'
                      : 'border-white text-white hover:bg-white/10 hover:text-mint-200 focus:ring-white',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black'
                  )}>
                  {text}
                  {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6" />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Down Arrow */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <a
            className="rounded-full bg-white/10 p-2 ring-2 ring-mint-300 hover:ring-white focus:outline-none focus:ring-2"
            href={`/#${SectionId.About}`}>
            <ChevronDownIcon className="h-6 w-6 text-mint-200" />
          </a>
        </div>
      </div>
    </Section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
