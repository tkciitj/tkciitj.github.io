import classNames from 'classnames';
import { FC, memo, PropsWithChildren } from 'react';

import { SectionId } from '../../data/data';

const Section: FC<
  PropsWithChildren<{
    sectionId: SectionId;
    sectionTitle?: string;
    noPadding?: boolean;
    className?: string;
  }>
> = memo(({ children, sectionId, noPadding = false, className }) => {
  return (
    <section
      id={sectionId}
      className={classNames(
        'transition-all duration-500 ease-in-out',
        {
          'px-4 py-16 md:py-24 lg:px-8': !noPadding,
        },
        className
      )}
    >
      <div
        className={classNames(
          'mx-auto max-w-6xl transition-all duration-500',
          {
            'px-6 md:px-12': !noPadding,
          }
        )}
      >
        {children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';
export default Section;
