# 📋 Portfolio Customization Checklist

## Quick Start - What to Update

Follow these steps to make the portfolio your own:

### 1. 🎨 Basic Information
**File**: `src/data/data.tsx`

Update these sections:

```typescript
// Hero Section
export const heroData: Hero = {
  name: `Hi, I'm Your Name`, // ← UPDATE THIS
  description: ( /* ← UPDATE THIS */ )
  // ...
};

// About Section
export const aboutData: About = {
  description: `Your bio here`, // ← UPDATE THIS
  // ...
};

// Contact Information
export const contact: ContactSection = {
  headerText: 'Get In Touch',
  description: 'Your message here', // ← UPDATE THIS
  items: [
    {
      type: ContactType.Email,
      text: 'your.email@example.com', // ← UPDATE THIS
      href: 'mailto:your.email@example.com',
    },
    // ... Update all contact items
  ],
};

// Social Links
export const socialLinks: Social[] = [
  { label: 'Github', Icon: GithubIcon, href: 'https://github.com/YOUR-USERNAME' }, // ← UPDATE
  { label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://linkedin.com/in/YOUR-PROFILE' }, // ← UPDATE
  // ... Update all social links
];
```

### 2. 💼 Experience & Education
**File**: `src/data/data.tsx`

```typescript
export const experience: TimelineItem[] = [
  {
    date: 'May 2024 - July 2024', // ← UPDATE
    location: 'Your Company Name', // ← UPDATE
    title: 'Your Job Title', // ← UPDATE
    content: <p>Your job description</p>, // ← UPDATE
  },
  // Add more experiences
];

export const education: TimelineItem[] = [
  {
    date: '2020 - 2024', // ← UPDATE
    location: 'Your University', // ← UPDATE
    title: 'Your Degree', // ← UPDATE
    content: <p>Your education details</p>, // ← UPDATE
  },
];
```

### 3. 🚀 Projects/Portfolio
**File**: `src/data/data.tsx`

```typescript
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Your Project Name', // ← UPDATE
    description: 'Detailed description of your project', // ← UPDATE
    url: 'https://your-project-link.com', // ← UPDATE
    image: portfolio1, // ← UPDATE (add your image)
  },
  // Add more projects
];
```

Add project images:
1. Place images in `src/images/portfolio/`
2. Import the images in `src/data/data.tsx`
3. Reference them in portfolioItems

### 4. 💻 Skills
**File**: `src/data/data.tsx`

```typescript
export const skills: SkillGroup[] = [
  {
    name: 'Your Skill Category', // ← UPDATE
    skills: [
      { name: 'Skill Name', level: 9 }, // ← UPDATE (1-10 scale)
      { name: 'Another Skill', level: 8 },
      // Add more skills
    ],
  },
  // Add more categories
];
```

### 5. 👤 Profile Picture
**File**: `src/images/profilepic.jpg`

1. Replace the current picture with yours
2. Keep the filename as `profilepic.png` or update the import in `src/data/data.tsx`
3. Recommended size: At least 400x400px (square)
4. Format: JPG or PNG

### 6. 🎨 Customize Colors (Optional)

**Primary Color**: Change `#a0f0df` (turquoise)
- Search and replace in all components

**Secondary Color**: Change `#64d5ca` (mint)
- Search and replace in all components

**Accent Color**: Change `#3baaa0` (teal)
- Search and replace in all components

**Tailwind Config**: `tailwind.config.js`
```js
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

### 7. 📝 Interests/Focus Areas
**File**: `src/data/data.tsx`

```typescript
export const interests: Interest[] = [
  {
    name: 'Your Interest Area', // ← UPDATE
    description: 'Description of your interest', // ← UPDATE
  },
  // Add more interests
];
```

### 8. ✉️ Contact Form
**File**: `src/components/Sections/Contact/ContactForm.tsx`

If you need to set up form submissions:
- Integrate with emailjs, Formspree, or your backend
- Update the form handler in ContactForm.tsx

### 9. 🌐 SEO & Meta Tags
**File**: `src/data/data.tsx` and `src/pages/_document.tsx`

Update meta information:
```typescript
export const homePageMeta: HomepageMeta = {
  title: 'Your Name • Portfolio', // ← UPDATE
  description: 'Your portfolio description for search engines', // ← UPDATE
};
```

### 10. 📱 Responsive Adjustments

Test on different devices:
- Mobile (320px - 640px)
- Tablet (641px - 1024px)
- Desktop (1025px+)

All components are mobile-first and responsive by default.

## 🎯 Priority Order

1. **Update name and basic info** (Hero section)
2. **Add your profile picture**
3. **Update about/bio**
4. **Add your projects**
5. **Update skills and experience**
6. **Update contact information**
7. **Customize colors** (if desired)
8. **Add social media links**

## 🚀 Testing Checklist

Before deploying:
- [ ] Hero section displays correctly
- [ ] Particles are interactive (move with mouse)
- [ ] All links are working
- [ ] Contact form is functional
- [ ] Images load properly
- [ ] Mobile responsive looks good
- [ ] No console errors
- [ ] All your content is accurate

## 🐛 Common Issues & Solutions

**Issue**: Particle system not showing
- ✅ Make sure you're NOT using `ssr: false` for the hero on mobile
- ✅ Check browser console for errors
- ✅ Ensure JavaScript is enabled

**Issue**: Images not loading
- ✅ Check file paths in imports
- ✅ Ensure images are in `src/images/` folder
- ✅ Verify image filenames are correct

**Issue**: Styling not applying
- ✅ Clear `.next` folder: `npm run clean`
- ✅ Rebuild: `npm run dev`
- ✅ Hard refresh browser (Ctrl+Shift+R)

**Issue**: Build errors
- ✅ Run `npm install` to install all dependencies
- ✅ Check TypeScript errors with `npm run compile`
- ✅ Ensure all imports are correct

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Guide](https://www.typescriptlang.org/docs/)

## ✨ Pro Tips

1. **Use descriptive text**: More details in project descriptions help with SEO
2. **Update regularly**: Keep your experience and projects current
3. **Test locally**: Always test changes before pushing to production
4. **Optimize images**: Use compressed images for faster loading
5. **Keep backups**: Version control with Git

---

**You've got this! 🎉 Your portfolio is ready to impress!**
