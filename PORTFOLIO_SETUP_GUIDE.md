# Interactive Particle Portfolio 🎨

## Features

✨ **Interactive Particle System Homepage**
- Real-time mouse tracking with particle repulsion effect
- Animated text that scatters and flows based on mouse movement
- Smooth transitions and beautiful gradient effects
- Fully responsive and optimized for all devices

📱 **Modern Responsive Design**
- Clean, minimalist sections for About, Experience, Projects, and Skills
- Glassmorphic components with backdrop blur effects
- Smooth hover animations and transitions
- Mobile-first approach with hamburger menu

🎯 **Complete Portfolio Structure**
- **Hero Section**: Interactive particle system with your name
- **About Section**: Profile info with detailed info cards
- **Experience Section**: Work history and education timeline
- **Projects Section**: Showcase your best work with descriptions
- **Skills Section**: Technical skills with proficiency levels
- **Contact Section**: Get in touch form and contact details
- **Footer**: Navigation links and social media

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Install dependencies**
```bash
npm install
# or
yarn install
```

2. **Update Portfolio Data**
Edit `src/data/data.tsx` to add your information:
- Hero section (name, description, actions)
- About section (bio, location, education info)
- Skills (your tech stack and proficiencies)
- Experience (work history and education)
- Projects (showcase your work)
- Contact information (email, social links)

3. **Add Your Images**
- Replace `src/images/profilepic.png` with your profile picture
- Add project cover images to `src/images/portfolio/`

4. **Update Social Links**
Edit `src/data/data.tsx` socialLinks array with your social profiles

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio.

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📝 Customization

### Change Particle Colors
In `src/components/Sections/HeroInteractive.tsx`, update the ParticleSystem props:
```tsx
<ParticleSystem 
  text={name} 
  fontSize={100} 
  density={2} 
  colors={['#a0f0df', '#64d5ca', '#3baaa0']} // Your custom colors
/>
```

### Modify Color Scheme
The default theme uses:
- Primary: `#a0f0df` (turquoise)
- Secondary: `#64d5ca` (mint)
- Accent: `#3baaa0` (teal)

To change globally, find and replace these hex values throughout the components, or update in `tailwind.config.js`.

### Adjust Animation Speed
In `src/components/ParticleSystem.tsx`, modify:
- `friction`: Controls particle slowdown (default: 0.92)
- `mouseInfluence`: Controls mouse repulsion strength (default: 150)

## 🎨 Component Structure

```
src/
├── components/
│   ├── ParticleSystem.tsx          # Core particle animation engine
│   ├── Sections/
│   │   ├── HeroInteractive.tsx     # Particle-based hero section
│   │   ├── About.tsx               # About section
│   │   ├── Experiences.tsx         # Work & education
│   │   ├── Projects.tsx            # Project showcase
│   │   ├── Skills.tsx              # Skills & tech stack
│   │   ├── Contact/                # Contact section
│   │   ├── Header.tsx              # Navigation header
│   │   └── Footer.tsx              # Footer
│   └── Layout/                     # Layout wrapper components
├── pages/
│   ├── index.tsx                   # Main homepage
│   └── api/                        # API routes (if needed)
├── data/
│   ├── data.tsx                    # Portfolio content
│   └── dataDef.ts                  # Type definitions
└── globalStyles.scss               # Global styles
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect Next.js and configure build settings
5. Click Deploy

### Deploy to Other Platforms

The portfolio can be deployed to:
- **Netlify**: `npm run build` then deploy the `.next` folder
- **GitHub Pages**: Configure Next.js static export in `next.config.js`
- **Docker**: Create a Dockerfile for containerized deployment

## 📦 Key Dependencies

- **Next.js 14**: React framework for production
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Heroicons**: Beautiful icon library
- **Classnames**: Conditional CSS classes

## 🎯 Performance Optimization

- Code splitting with dynamic imports
- Image optimization
- CSS and JavaScript minification
- SEO-friendly meta tags
- Responsive images for all devices

## 🐛 Troubleshooting

### Particles not appearing?
- Ensure `ParticleSystem` is wrapped in `dynamic()` import
- Check browser console for errors
- Verify canvas element is rendering

### Styling issues?
- Clear `.next` folder: `npm run clean`
- Rebuild: `npm run dev`
- Check Tailwind CSS classes are correctly applied

### Build errors?
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors: `npm run compile`
- Clear node_modules and reinstall if needed

## 📧 support & Questions

For issues or questions:
1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review the code comments for specific implementations
3. Check browser dev tools console for error messages

## 📄 License

This portfolio template is free to use and customize for your personal use.

---

**Made with ❤️ for your perfect portfolio presence**
