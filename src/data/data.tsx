import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import StackOverflowIcon from '../components/Icon/StackOverflowIcon';
import TwitterIcon from '../components/Icon/TwitterIcon';

import profilepic from '../images/profilepic.jpg';
import portfolio1 from '../images/portfolio/portfolio-1.jpg';
import portfolio2 from '../images/portfolio/portfolio-2.jpg';
import portfolio3 from '../images/portfolio/portfolio-3.jpg';
import portfolio4 from '../images/portfolio/portfolio-4.jpg';

import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TimelineItem,
  Interest,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Tushar Kant • Portfolio',
  description:
    'Portfolio of Tushar Kant - Full Stack Developer, Open Source Enthusiast, and Problem Solver.',
};

/**
 * Section IDs – must match exactly with page components
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Experience: 'experience',
  Skills: 'skills',
  Projects: 'projects',
  Resume: 'resume',
  Contact: 'contact',
  Interests: 'interests',
  Stats: 'stats',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: profilepic,
  name: `Hi, I'm Tushar Kant`,
  description: (
    <>
      <p className="prose-sm text-neutral-200 sm:prose-base lg:prose-lg">
        A <strong className="text-neutral-100">Full Stack Developer</strong> passionate about crafting beautiful, 
        performant web experiences. I specialize in <strong className="text-neutral-100">React, Next.js, and Node.js</strong>, 
        turning ideas into elegant digital solutions.
      </p>
    </>
  ),
  actions: [
    {
      href: '/assets/resume.pdf',
      text: 'Download Resume',
      primary: true,
      Icon: ArrowDownTrayIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Get in Touch',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description:
    'I am a Computer Science undergrad with a passion for creating impactful digital experiences. With expertise in full-stack development and a eye for design, I transform complex problems into elegant, user-centric solutions. Always eager to learn new technologies and collaborate with talented teams.',
  aboutItems: [
    { label: 'Location', text: 'India', Icon: MapIcon },
    { label: 'Age', text: '22', Icon: CalendarIcon },
    { label: 'Nationality', text: 'Indian', Icon: FlagIcon },
    { label: 'Interests', text: 'Web Dev, Open Source, Design', Icon: SparklesIcon },
    { label: 'Study', text: 'BTech CS - IIIT Bhubaneswar', Icon: AcademicCapIcon },
    { label: 'Employment', text: 'Open to Opportunities', Icon: BuildingOffice2Icon },
  ],
};

/**
 * Interests section
 */
export const interests: Interest[] = [
  {
    name: 'Full Stack Development',
    description: 'Building scalable, performant web applications from frontend to backend using modern tech stacks.',
  },
  {
    name: 'Open Source Contribution',
    description: 'Contributing to meaningful projects that help developers and communities solve real-world problems.',
  },
  {
    name: 'UI/UX Design',
    description: 'Creating beautiful, intuitive user experiences with attention to detail and accessibility.',
  },
  {
    name: 'Cloud & DevOps',
    description: 'Deploying and managing applications on cloud platforms with CI/CD pipelines.',
  },
];

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Frontend Development',
    skills: [
      { name: 'React / Next.js', level: 9 },
      { name: 'TypeScript / JavaScript', level: 9 },
      { name: 'TailwindCSS / SCSS', level: 9 },
      { name: 'Responsive Design', level: 9 },
      { name: 'Redux / State Management', level: 8 },
    ],
  },
  {
    name: 'Backend Development',
    skills: [
      { name: 'Node.js / Express', level: 8 },
      { name: 'REST APIs', level: 9 },
      { name: 'Authentication & Security', level: 8 },
      { name: 'Database Design', level: 8 },
    ],
  },
  {
    name: 'Databases & Tools',
    skills: [
      { name: 'MongoDB / Firebase', level: 8 },
      { name: 'PostgreSQL', level: 7 },
      { name: 'Git / GitHub', level: 9 },
      { name: 'Vercel / Netlify', level: 8 },
    ],
  },
  {
    name: 'Soft Skills',
    skills: [
      { name: 'Problem Solving', level: 9 },
      { name: 'Communication', level: 8 },
      { name: 'Team Collaboration', level: 8 },
      { name: 'Project Management', level: 7 },
    ],
  },
];

/**
 * Projects section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'StudyNotion',
    description: 'A comprehensive ed-tech platform enabling course creation and student enrollment. Features include video streaming, progress tracking, and payment integration using Stripe. Built with MERN stack + TailwindCSS.',
    url: 'https://studynotion.vercel.app/',
    image: portfolio1,
  },
  {
    title: 'Project Name',
    description: 'Placeholder for your next amazing project. Replace with your actual project details, technologies used, and live demo link.',
    url: '#',
    image: portfolio2,
  },
  {
    title: 'Project Name',
    description: 'Placeholder for your next amazing project. Replace with your actual project details, technologies used, and live demo link.',
    url: '#',
    image: portfolio3,
  },
  {
    title: 'Project Name',
    description: 'Placeholder for your next amazing project. Replace with your actual project details, technologies used, and live demo link.',
    url: '#',
    image: portfolio4,
  },
];

/**
 * Education & Experience
 */
export const education: TimelineItem[] = [
  {
    date: '2022 - 2026',
    location: 'IIIT Bhubaneswar',
    title: 'Bachelor of Technology in Computer Science',
    content: (
      <p>CGPA: 8.5+ • Relevant coursework: Data Structures, Algorithms, DBMS, Operating Systems, Web Development, Computer Networks</p>
    ),
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'May 2024 - July 2024',
    location: 'Tech Startup (Remote)',
    title: 'Full Stack Developer Intern',
    content: (
      <p>
        Collaborated with the product team to build and optimize internal dashboards using React and Node.js. 
        Integrated third-party APIs, improved performance by 40%, and maintained 95% code coverage with automated tests.
      </p>
    ),
  },
  {
    date: 'Jan 2024 - Apr 2024',
    location: 'Your Previous Company',
    title: 'Position Name',
    content: (
      <p>
        Describe your role, technologies used, and key accomplishments in this section. Replace with your actual experience.
      </p>
    ),
  },
];

/**
 * Contact section
 */
export const contact: ContactSection = {
  headerText: 'Get In Touch',
  description:
    'I\'m always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!',
  items: [
    {
      type: ContactType.Email,
      text: 'your.email@example.com',
      href: 'mailto:your.email@example.com',
    },
    {
      type: ContactType.Github,
      text: 'your-github-username',
      href: 'https://github.com/your-username',
    },
    {
      type: ContactType.LinkedIn,
      text: 'your-linkedin-profile',
      href: 'https://www.linkedin.com/in/your-profile',
    },
    {
      type: ContactType.Instagram,
      text: '@your-instagram-handle',
      href: 'https://instagram.com/your-handle',
    },
  ],
};

/**
 * Social links
 */
export const socialLinks: Social[] = [
  { label: 'Github', Icon: GithubIcon, href: 'https://github.com/tusharkant-code' },
  {
    label: 'Stack Overflow',
    Icon: StackOverflowIcon,
    href: 'https://stackoverflow.com/users/your-id',
  },
  { label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://linkedin.com/in/tusharkant' },
  { label: 'Instagram', Icon: InstagramIcon, href: 'https://instagram.com/dev.tushar' },
  { label: 'Twitter', Icon: TwitterIcon, href: 'https://twitter.com/devtushar' },
];
