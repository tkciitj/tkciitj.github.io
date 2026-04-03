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
import portfolio1 from '../images/portfolio/portfolio-1.png';
import portfolio2 from '../images/portfolio/portfolio-2.png';
import portfolio3 from '../images/portfolio/portfolio-3.png';
import portfolio4 from '../images/portfolio/portfolio-4.png';
import portfolio5 from '../images/portfolio/portfolio-5.png';
import portfolio6 from '../images/portfolio/portfolio-6.png';
import profilepic from '../images/profilepic.png';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  Interest,
  PortfolioItem,
  SkillGroup,
  Social,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Tushar Kant Chaubey • Portfolio',
  description:
    'Portfolio of Tushar Kant Chaubey - Full Stack Developer, Game Developer, and Problem Solver from IIT Jodhpur.',
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
  name: `Hi, I'm Tushar Kant Chaubey`,
  description: (
    <>
      <p className="prose-sm text-neutral-200 sm:prose-base lg:prose-lg">
        A <strong className="text-neutral-100">Full Stack & Game Developer</strong> from IIT Jodhpur, passionate about
        crafting innovative digital experiences. I specialize in{' '}
        <strong className="text-neutral-100">
          C/C++, Python, Game Development, Web Technologies, and Machine Learning
        </strong>
        , turning complex ideas into elegant solutions.
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
    'I am a passionate Engineering Science undergrad at IIT Jodhpur specializing in Computer Science & Electronics. With a strong foundation in full-stack development, game development, and machine learning, I transform complex problems into elegant, performant solutions. Always driven to learn new technologies and collaborate with talented teams on impactful projects.',
  aboutItems: [
    {label: 'Location', text: 'Jodhpur, India', Icon: MapIcon},
    {label: 'Age', text: '20', Icon: CalendarIcon},
    {label: 'Nationality', text: 'Indian', Icon: FlagIcon},
    {label: 'Interests', text: 'CyberSecurity, Game Dev, Web Dev, ML, Open Source', Icon: SparklesIcon},
    {label: 'Study', text: 'B.Tech ES (CSE+EE) - IIT Jodhpur', Icon: AcademicCapIcon},
    {label: 'Employment', text: 'Open to Opportunities', Icon: BuildingOffice2Icon},
  ],
};

/**
 * Interests section
 */
export const interests: Interest[] = [
  {
    name: 'Game Development',
    description:
      'Creating interactive and engaging 2D/3D games using Unity, C#, and game physics. Passionate about game mechanics and user experience.',
  },
  {
    name: 'Full Stack Development',
    description:
      'Building scalable web applications with modern tech stacks - React, Next.js, Node.js, and various databases.',
  },
  {
    name: 'Machine Learning',
    description:
      'Exploring ML algorithms and deep learning using TensorFlow, Keras, and scikit-learn for data-driven solutions.',
  },
  {
    name: 'Open Source Contribution',
    description: 'Contributing to meaningful projects that help the developer community and solve real-world problems.',
  },
];

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Languages & Core',
    skills: [
      {name: 'C/C++', level: 9},
      {name: 'Python', level: 7},
      {name: 'C#', level: 8},
      {name: 'Java SpringBoot', level: 8},
    ],
  },
  {
    name: 'Game Development',
    skills: [
      {name: 'Unity', level: 9},
      {name: 'SDL2', level: 8},
      {name: 'SFML', level: 8},
      {name: 'Game Physics', level: 8},
    ],
  },
  {
    name: 'Web Development',
    skills: [
      {name: 'React', level: 8},
      {name: 'SpringBoot', level: 8},
      {name: 'Flutter/Dart', level: 7},
      {name: 'Android Studio', level: 7},
    ],
  },
  {
    name: 'Machine Learning & Data',
    skills: [
      {name: 'TensorFlow', level: 7},
      {name: 'Keras', level: 7},
      {name: 'Scikit-Learn', level: 7},
      {name: 'pandas / NumPy', level: 7},
    ],
  },
  {
    name: 'Databases & Backend',
    skills: [
      {name: 'MySQL', level: 8},
      {name: 'REST APIs', level: 8},
    ],
  },
  {
    name: 'Tools & DevOps',
    skills: [
      {name: 'Git / GitHub', level: 9},
      {name: 'Bash/Shell', level: 7},
      {name: 'IntelliJ IDEA', level: 8},
      {name: 'Postman', level: 8},
    ],
  },
];

/**
 * Projects section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Email Scheduler',
    description:
      'A sophisticated email scheduling platform that streamlines bulk communications. Handles 10,000+ emails efficiently with features for single and batch sending. Completed as part of DevLup Labs Winter of Code 2025.',
    url: '#',
    image: portfolio1,
  },
  {
    title: "Promoteo'25 App",
    description:
      'Mobile application developed to facilitate the Promoteo25 tech festival. Achieved 100+ real users and successful Play Store deployment, showcasing strong app development and user engagement capabilities.',
    url: '#',
    image: portfolio2,
  },
  {
    title: '2D Zombie Shooter (CVZ)',
    description:
      'Interactive shooting game built from scratch using C and SDL2 library. Features engaging gameplay mechanics, enemy AI, and physics-based interactions. Demonstrates proficiency in game development fundamentals.',
    url: '#',
    image: portfolio3,
  },
  {
    title: 'MountClimb2D',
    description:
      'A 2D physics-based racing game inspired by the classic Hill Climbing. Features realistic physics simulation, dynamic terrain interactions, and smooth gameplay mechanics for an immersive gaming experience.',
    url: '#',
    image: portfolio4,
  },
  {
    title: 'PixelRush2D',
    description:
      'Fast-paced 2D platformer action game with challenging level design and fluid combat mechanics. Features dynamic enemy AI, collectibles, and progressive difficulty to deliver an engaging gaming experience.',
    url: '#',
    image: portfolio5,
  },
  {
    title: 'LOR (Local Onion Router)',
    description:
      'Terminal-based replica of Tor browser showcasing onion encryption layer by layer. Educational project demonstrating decentralized routing, relay nodes, and cryptographic principles of anonymous networking.',
    url: '#',
    image: portfolio6,
  },
];

/**
 * Education & Experience
 */
export const education: TimelineItem[] = [
  {
    date: 'Aug 2023 - Present',
    location: 'Indian Institute of Technology, Jodhpur',
    title: 'B.Tech. in Engineering Science (CSE+EE)',
    content: (
      <p>
        CGPA: 7.93 • Active participant in technical clubs and hackathons • Relevant coursework: Data Structures &
        Algorithms, Database Management, Web Development, Machine Learning
      </p>
    ),
  },
  {
    date: 'Mar 2023',
    location: 'Central Public School, Kota',
    title: 'Class XII (Senior Secondary)',
    content: <p>92.00% • Strong foundation in mathematics, physics, and computer science</p>,
  },
  {
    date: 'Mar 2021',
    location: 'Central Academy, Lucknow',
    title: 'Class X (Secondary)',
    content: <p>98.00% • Demonstrated excellence across all subjects and extracurricular activities</p>,
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'May 2025 - July 2025',
    location: 'Hit11.ai (Remote)',
    title: 'Game Developer Intern',
    content: (
      <p>
        Developed the Call-Break game for the Hit11.ai fantasy sports application. Implemented game mechanics, UI
        interactions, and optimized performance for smooth gameplay experience.
      </p>
    ),
  },
  {
    date: 'May 2025 - Present',
    location: 'Career Development Cell, IIT Jodhpur',
    title: 'Web-Dev Team Representative',
    content: (
      <p>
        Leading backend development initiatives for backend development for spc.iitj.ac.in portal. Collaborating with
        cross-functional teams to deliver scalable web solutions and improve user experience.
      </p>
    ),
  },
  {
    date: 'Dec 2024 - Mar 2025',
    location: 'DevLup Labs, IIT Jodhpur',
    title: "WoC'25 Project Member",
    content: (
      <p>
        Developed a Bulk-EMail Scheduler for the Placement Cell as part of Winter of Code 2025. Enabled efficient bulk
        email communication handling and scheduling capabilities.
      </p>
    ),
  },
  {
    date: 'Nov 2024 - Jan 2025',
    location: 'IIT Jodhpur',
    title: "Assistant Head, Promoteo'25",
    content: (
      <p>
        Contributed to the development and deployment of the Promoteo25 app for the annual tech festival. Achieved 100+
        real users on Play Store Launch with strong community engagement.
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
    "Feel free to reach out to me for collaboration, opportunities, or just a friendly chat. I'm always interested in connecting with like-minded professionals!",
  items: [
    {
      type: ContactType.Email,
      text: 'b23es1033@iitj.ac.in',
      href: 'mailto:b23es1033@iitj.ac.in',
    },
    {
      type: ContactType.Github,
      text: 'tkciitj',
      href: 'https://github.com/tkciitj',
    },
    {
      type: ContactType.LinkedIn,
      text: 'tushar-kant-chaubey',
      href: 'https://www.linkedin.com/in/tushar-kant-chaubey-88a1102a3/',
    },
    {
      type: ContactType.Instagram,
      text: '@tushar_kc__13',
      href: 'https://instagram.com/tushar_kc__13',
    },
  ],
};

/**
 * Social links
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/tkciitj'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/tushar-kant-chaubey-88a1102a3/'},
  {label: 'Instagram', Icon: InstagramIcon, href: 'https://instagram.com/tushar_kc__13'},
];
