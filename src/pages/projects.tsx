import {ArrowUpRightIcon} from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import {FC, memo, useCallback, useState} from 'react';

import Page from '../components/Layout/Page';
import Section from '../components/Layout/Section';
import ProjectModal from '../components/ProjectModal';
import Footer from '../components/Sections/Footer';
import {homePageMeta, portfolioItems, SectionId} from '../data/data';
import type {PortfolioItem} from '../data/dataDef';

// Dynamically load Header without SSR for smoother hydration
// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../components/Sections/Header'), {ssr: false});

const ProjectsPage: FC = memo(() => {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const handleProjectSelect = useCallback((project: PortfolioItem) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <Page description={homePageMeta.description} title={`${homePageMeta.title} - Projects`}>
      <div className="relative w-full text-white bg-black">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="w-full">
          <Section className="text-white" sectionId={SectionId.Projects}>
            <div className="flex flex-col gap-y-10">
              {/* Navigation */}
              <div className="flex items-center gap-2 mb-4">
                <Link className="text-[#a0f0df] hover:text-[#64d5ca] transition-colors" href="/">
                  Home
                </Link>
                <span className="text-neutral-500">/</span>
                <span className="text-neutral-400">Projects</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a0f0df] to-[#3baaa0]">
                All Projects
              </h1>

              {/* Projects Grid */}
              <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((project, index) => (
                  <div
                    className="group rounded-xl overflow-hidden border border-[#a0f0df]/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-[#a0f0df]/50 hover:bg-white/10 hover:-translate-y-2 cursor-pointer flex flex-col h-full"
                    key={`${project.title}-${index}`}>
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
                    <div className="p-5 flex flex-col gap-3 flex-grow">
                      {/* Title */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold text-[#a0f0df] group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        {project.url && project.url !== '#' && (
                          <ArrowUpRightIcon className="h-5 w-5 text-[#a0f0df] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3 flex-grow">
                        {project.description}
                      </p>

                      {/* Buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          className="flex-1 px-3 py-2 bg-[#a0f0df]/20 border border-[#a0f0df]/50 rounded-lg text-[#a0f0df] text-sm font-medium hover:bg-[#a0f0df]/30 transition-colors"
                          onClick={() => handleProjectSelect(project)}>
                          See More
                        </button>
                        {project.url && project.url !== '#' && (
                          <a
                            className="flex-1 px-3 py-2 bg-[#a0f0df] text-black rounded-lg text-sm font-medium hover:bg-[#64d5ca] transition-colors"
                            href={project.url}
                            rel="noopener noreferrer"
                            target="_blank">
                            Visit
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </main>
      </div>

      {/* Project Modal - Only on this page */}
      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={handleCloseModal}
        project={
          selectedProject
            ? {
                contributors: selectedProject.contributors || [],
                description: selectedProject.description,
                githubUrl: selectedProject.githubUrl,
                idea: selectedProject.idea || 'Details coming soon...',
                liveUrl: selectedProject.liveUrl,
                techStack: selectedProject.techStack || [],
                title: selectedProject.title,
              }
            : null
        }
      />

      <Footer />
    </Page>
  );
});

ProjectsPage.displayName = 'ProjectsPage';
export default ProjectsPage;
