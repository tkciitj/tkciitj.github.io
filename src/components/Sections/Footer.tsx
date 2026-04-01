import {ChevronUpIcon} from '@heroicons/react/24/solid';
import {FC, memo} from 'react';

import {SectionId} from '../../data/data';
import Socials from '../Socials';

const currentYear = new Date().getFullYear();

const Footer: FC = memo(() => (
  <div className="relative bg-gradient-to-t from-black to-black/50 px-4 pb-6 pt-12 sm:px-8 sm:pb-8 sm:pt-16 text-white border-t border-[#a0f0df]/10">
    {/* Scroll to Top Button */}
    <div className="absolute inset-x-0 -top-6 flex justify-center">
      <a
        aria-label="Scroll to top"
        className="rounded-full bg-[#a0f0df] p-2 shadow-lg hover:shadow-xl hover:shadow-[#a0f0df]/50 transition-all duration-300 transform hover:scale-110 sm:p-3"
        href={`/#${SectionId.Hero}`}>
        <ChevronUpIcon className="h-6 w-6 text-black sm:h-7 sm:w-7" />
      </a>
    </div>

    {/* Footer Content */}
    <div className="max-w-6xl mx-auto flex flex-col items-center gap-y-6">
      {/* Socials */}
      <div className="flex gap-x-4 text-[#a0f0df]">
        <Socials />
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <a className="text-neutral-400 hover:text-[#a0f0df] transition-colors" href={`/#${SectionId.Hero}`}>
          Home
        </a>
        <span className="text-neutral-600">•</span>
        <a className="text-neutral-400 hover:text-[#a0f0df] transition-colors" href={`/#${SectionId.About}`}>
          About
        </a>
        <span className="text-neutral-600">•</span>
        <a className="text-neutral-400 hover:text-[#a0f0df] transition-colors" href={`/#${SectionId.Projects}`}>
          Projects
        </a>
        <span className="text-neutral-600">•</span>
        <a className="text-neutral-400 hover:text-[#a0f0df] transition-colors" href={`/#${SectionId.Contact}`}>
          Contact
        </a>
      </div>

      {/* Copyright */}
      <span className="text-sm text-neutral-500">© {currentYear} • All Rights Reserved</span>
    </div>
  </div>
));

Footer.displayName = 'Footer';
export default Footer;
