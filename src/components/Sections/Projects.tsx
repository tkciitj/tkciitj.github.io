import {ArrowUpRightIcon} from '@heroicons/react/24/outline';
import Image from 'next/image';
import {FC, memo} from 'react';

import {portfolioItems, SectionId} from '../../data/data';
import Section from '../Layout/Section';

const Projects: FC = memo(() => {
  return (
    <Section className="text-white" sectionId={SectionId.Projects}>
      <div className="flex flex-col gap-y-10">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a0f0df] to-[#3baaa0]">
          Featured Projects
        </h2>

        {/* Projects Grid */}
        <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((project, index) => (
            <a
              className="group rounded-xl overflow-hidden border border-[#a0f0df]/20 bg-white/5 backdrop-blur-md shadow-md transition-all duration-300 hover:border-[#a0f0df]/50 hover:bg-white/10 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              href={project.url && project.url !== '#' ? project.url : undefined}
              key={`${project.title}-${index}`}
              rel={project.url && project.url !== '#' ? 'noopener noreferrer' : undefined}
              target={project.url && project.url !== '#' ? '_blank' : undefined}>
              {/* Project Image/Cover */}
              {project.image && (
                <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-[#a0f0df]/20 to-[#3baaa0]/20">
                  <Image
                    alt={project.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    src={project.image}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
                </div>
              )}

              {/* Project Content */}
              <div className="p-5 flex flex-col gap-3">
                {/* Title */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-[#a0f0df] group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  {project.url && project.url !== '#' && (
                    <ArrowUpRightIcon className="h-5 w-5 text-[#a0f0df] opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3">{project.description}</p>

                {/* View Link */}
                {project.url && project.url !== '#' && (
                  <span className="text-xs font-medium text-[#a0f0df] group-hover:underline">View Project</span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
});

Projects.displayName = 'Projects';
export default Projects;
