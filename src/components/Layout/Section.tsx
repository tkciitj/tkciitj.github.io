import classNames from 'classnames';
import {FC, memo, PropsWithChildren} from 'react';

import {SectionId} from '../../data/data';

const Section: FC<
  PropsWithChildren<{
    sectionId: SectionId;
    sectionTitle?: string;
    noPadding?: boolean;
    className?: string;
  }>
> = memo(({children, sectionId, noPadding = false, className}) => {
  return (
    <section
      className={classNames(
        'transition-all duration-500 ease-in-out w-full',
        {
          'px-4 py-16 md:py-24 lg:px-8': !noPadding,
        },
        className,
      )}
      id={sectionId}>
      <div
        className={classNames('mx-auto transition-all duration-500', {
          'max-w-6xl px-6 md:px-12': !noPadding,
          'w-full': noPadding,
        })}>
        {children}
      </div>
    </section>
  );
});

Section.displayName = 'Section';
export default Section;
