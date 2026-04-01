import { DevicePhoneMobileIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, memo } from 'react';

import { contact, SectionId } from '../../../data/data';
import { ContactType, ContactValue } from '../../../data/dataDef';
import FacebookIcon from '../../Icon/FacebookIcon';
import GithubIcon from '../../Icon/GithubIcon';
import InstagramIcon from '../../Icon/InstagramIcon';
import LinkedInIcon from '../../Icon/LinkedInIcon';
import TwitterIcon from '../../Icon/TwitterIcon';
import Section from '../../Layout/Section';
import ContactForm from './ContactForm';

const ContactValueMap: Record<ContactType, ContactValue> = {
  [ContactType.Email]: { Icon: EnvelopeIcon, srLabel: 'Email' },
  [ContactType.Phone]: { Icon: DevicePhoneMobileIcon, srLabel: 'Phone' },
  [ContactType.Location]: { Icon: MapPinIcon, srLabel: 'Location' },
  [ContactType.Github]: { Icon: GithubIcon, srLabel: 'Github' },
  [ContactType.LinkedIn]: { Icon: LinkedInIcon, srLabel: 'LinkedIn' },
  [ContactType.Facebook]: { Icon: FacebookIcon, srLabel: 'Facebook' },
  [ContactType.Twitter]: { Icon: TwitterIcon, srLabel: 'Twitter' },
  [ContactType.Instagram]: { Icon: InstagramIcon, srLabel: 'Instagram' },
};

const Contact: FC = memo(() => {
  const { headerText, description, items } = contact;

  return (
    <Section
      className="text-white"
      sectionId={SectionId.Contact}
    >
      <div className="flex flex-col gap-y-10">
        {/* Heading */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a0f0df] to-[#3baaa0]">
            {headerText}
          </h2>
          <p className="text-base text-neutral-300 max-w-2xl">
            {description}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Links */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-lg font-semibold text-[#a0f0df] mb-2">Contact Info</h3>
            <dl className="flex flex-col space-y-3">
              {items.map(({ type, text, href }) => {
                const { Icon, srLabel } = ContactValueMap[type];
                return (
                  <div key={srLabel}>
                    <dt className="sr-only">{srLabel}</dt>
                    <dd>
                      <a
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-[#a0f0df]/20 text-neutral-300 transition-all duration-300 hover:border-[#a0f0df]/50 hover:bg-white/10 hover:text-[#a0f0df] focus:outline-none focus:ring-2 focus:ring-[#a0f0df]/50"
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon className="h-5 w-5 flex-shrink-0 text-[#a0f0df]" />
                        <span className="text-sm sm:text-base break-all">{text}</span>
                      </a>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-lg font-semibold text-[#a0f0df] mb-2">Send a Message</h3>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-[#a0f0df]/20 shadow-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});

Contact.displayName = 'Contact';
export default Contact;
