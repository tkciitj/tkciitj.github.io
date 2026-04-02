import {XMarkIcon} from '@heroicons/react/24/outline';
import {FC, memo} from 'react';

interface ProjectDetails {
  title: string;
  description: string;
  idea: string;
  techStack: string[];
  contributors: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetails | null;
}

const ProjectModalComponent: FC<ProjectModalProps> = memo(({isOpen, onClose, project}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-[#a0f0df]/20 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a2e] shadow-2xl">
        {/* Close Button */}
        <button
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={onClose}>
          <XMarkIcon className="w-6 h-6 text-[#a0f0df]" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Title */}
          <h2 className="mb-4 text-3xl font-bold text-[#a0f0df]">{project.title}</h2>

          {/* Description */}
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold text-[#64d5ca]">Description</h3>
            <p className="leading-relaxed text-neutral-300">{project.description}</p>
          </div>

          {/* Idea */}
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold text-[#64d5ca]">Idea</h3>
            <p className="leading-relaxed text-neutral-300">{project.idea}</p>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-semibold text-[#64d5ca]">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  className="rounded-full border border-[#a0f0df]/30 bg-[#a0f0df]/10 px-3 py-1 text-sm text-[#a0f0df]"
                  key={idx}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contributors */}
          <div className="mb-6">
            <h3 className="mb-2 text-lg font-semibold text-[#64d5ca]">Contributors</h3>
            <p className="text-neutral-300">{project.contributors.join(', ')}</p>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.githubUrl && (
              <a
                className="rounded-lg bg-[#a0f0df] px-6 py-2 font-semibold text-black hover:bg-[#64d5ca] transition-colors"
                href={project.githubUrl}
                rel="noopener noreferrer"
                target="_blank">
                View Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                className="rounded-lg border border-[#a0f0df] px-6 py-2 font-semibold text-[#a0f0df] hover:bg-[#a0f0df]/10 transition-colors"
                href={project.liveUrl}
                rel="noopener noreferrer"
                target="_blank">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectModalComponent.displayName = 'ProjectModal';

const ProjectModal = memo(ProjectModalComponent);
export default ProjectModal;
