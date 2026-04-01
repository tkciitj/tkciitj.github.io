# 🚀 Deploy to GitHub Pages (username.github.io)

Your portfolio is now configured for **free GitHub Pages hosting** on `username.github.io`!

---

## 📋 Step-by-Step Setup

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **+ (New)** → **New repository**
3. **Important**: Name it exactly as: `USERNAME.github.io`
   - Replace `USERNAME` with your actual GitHub username
   - Example: `tushar-kant.github.io` or `tusharkant.github.io`
4. Make it **Public**
5. **Do NOT** add README, .gitignore, or license
6. Click **Create repository**

---

### Step 2: Connect Local Repository to GitHub

Open PowerShell in your portfolio folder and run:

```powershell
# Initialize git if not already done
git init

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git

# Rename branch to main if needed
git branch -M main

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Interactive particle portfolio"

# Push to GitHub
git push -u origin main
```

---

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **"Pages"** section
4. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"**
5. The workflow will automatically run

---

### Step 4: Wait for Deployment

✅ GitHub Actions will automatically:
1. Build your portfolio
2. Create the static files
3. Deploy to GitHub Pages

**Check deployment status:**
- Go to **Actions** tab in your repository
- Look for the workflow run
- When it shows ✅, your site is live!

---

## 🌐 Access Your Live Portfolio

Once deployment completes, your portfolio is live at:
```
https://USERNAME.github.io
```

Replace `USERNAME` with your GitHub username.

**Example**: 
- GitHub user: `tushar-kant`
- Live URL: `https://tushar-kant.github.io`

---

## 📝 Publishing Updates

After initial setup, every time you push to GitHub, your portfolio automatically updates!

### To publish changes:

```powershell
# Make your changes to files
# (e.g., edit src/data/data.tsx)

# Stage changes
git add .

# Commit with a message
git commit -m "Update portfolio content"

# Push to GitHub (automatic deployment!)
git push
```

That's it! Your changes go live in ~2-3 minutes.

---

## ✨ What's Configured

✅ **Static export** - Next.js builds to static HTML/CSS/JS
✅ **GitHub Actions** - Automatic build & deploy workflow
✅ **Image optimization disabled** - Required for static export
✅ **Trailing slashes** - Added for GitHub Pages compatibility
✅ **Zero cost hosting** - Free forever on `username.github.io`

---

## 🚨 Important Notes

### Image Optimization
Since GitHub Pages hosts static files, image optimization is disabled in `next.config.js`. This is expected and necessary.

### Custom Domain (Optional)
If you want to use your own domain instead of `username.github.io`:

1. Create a `CNAME` file in the root with your domain:
   ```
   yourdomain.com
   ```

2. Update GitHub Pages settings to point to your domain
3. Configure DNS records with your domain provider

### Build Troubleshooting

If deployment fails:

1. **Check Actions tab** - See what failed
2. **Check build logs** - Click on the failed workflow
3. **Common issues**:
   - Missing dependencies: Run `npm install` locally, commit `package-lock.json`
   - TypeScript errors: Run `npm run compile` to check
   - Image path issues: Use relative paths starting with `/`

---

## 📊 Deployment Workflow

Your workflow now:

```
Your Computer
     ↓ (git push)
GitHub Repository
     ↓ (GitHub Actions)
Build & Test
     ↓ (Success)
GitHub Pages
     ↓ (Deployed!)
Your Live Site 🎉
```

---

## 🔄 Future Updates

Your portfolio will **automatically update** when you:

1. Edit files locally
2. Commit changes
3. Push to GitHub

No additional steps needed - GitHub Actions handles everything!

---

## ⚙️ Manual Deployment (If Needed)

If you want to deploy without GitHub Actions:

```powershell
# Build for static export
npm run build

# This creates an 'out' folder with static files

# Commit and push
git add out/
git commit -m "Deploy static build"
git push
```

But the **automatic GitHub Actions method is recommended** - it's easier and more reliable!

---

## 📞 Troubleshooting

### Site not showing after 5 minutes?
- Check **Actions** tab - is deployment complete?
- Check **Settings > Pages** - is source set to "GitHub Actions"?
- Try hard refreshing: `Ctrl+Shift+R`

### 404 errors on pages?
- This is expected with GitHub Pages and trailing slashes
- The config is set to use trailing slashes (`next.config.js`)
- Links should work correctly

### Build failing?
```powershell
# Try locally first
npm run clean
npm install
npm run build
```

If it works locally but fails in GitHub Actions, commit the fix and push again.

---

## ✅ Checklist

- [ ] Repository named `USERNAME.github.io`
- [ ] Repository is Public
- [ ] GitHub Actions enabled in Settings > Pages
- [ ] Initial push to `main` branch complete
- [ ] Actions workflow shows ✅
- [ ] Can access `https://USERNAME.github.io`
- [ ] Portfolio displays correctly
- [ ] No 404 errors on navigation

---

## 🎉 You're Live!

Your interactive particle portfolio is now hosted on **free GitHub Pages** at `https://USERNAME.github.io`

Every change you push to GitHub automatically deploys to your live site!

**Pro tip**: Add a link to your portfolio in your GitHub profile bio! 🌟

---

**Questions?** Check the troubleshooting section or review your GitHub Actions logs for error messages.
