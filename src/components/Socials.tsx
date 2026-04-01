import {FC, memo} from 'react';

import {socialLinks} from '../data/data';

const Socials: FC = memo(() => {
  return (
    <>
      {socialLinks.map(({label, Icon, href}) => (
        <a
          aria-label={label}
          className="group m-1 flex items-center justify-center rounded-lg bg-white/5 border border-[#a0f0df]/20 p-2.5 transition-all duration-300 hover:border-[#a0f0df]/50 hover:bg-[#a0f0df]/10 focus:outline-none focus:ring-2 focus:ring-[#a0f0df]/50"
          href={href}
          key={label}
          rel="noopener noreferrer"
          target="_blank">
          <Icon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#a0f0df] sm:h-6 sm:w-6" />
        </a>
      ))}
    </>
  );
});

Socials.displayName = 'Socials';
export default Socials;
