# 🚀 Quick Start: Deploy to GitHub Pages in 5 Minutes

## TL;DR - The 4 Commands to Deploy

```powershell
# 1. Create the repo on GitHub first: USERNAME.github.io (IMPORTANT!)

# 2. Connect your local folder to GitHub (run in portfolio folder)
git init
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git branch -M main
git add .
git commit -m "Initial portfolio deployment"
git push -u origin main

# 3. GitHub Actions automatically deploys! ✨

# 4. Access your live site at:
# https://USERNAME.github.io
```

---

## 📝 Pre-Deployment Checklist

- [ ] You have a GitHub account
- [ ] You've created repository named `USERNAME.github.io` (exact name!)
- [ ] Portfolio folder is on your computer
- [ ] You have Git installed
- [ ] You've updated your portfolio content in `src/data/data.tsx`

---

## ✨ How It Works

1. **You push code** → `git push`
2. **GitHub Actions runs** → Automatically builds your portfolio
3. **Static site generated** → Creates HTML/CSS/JavaScript files  
4. **Published** → Available at `https://USERNAME.github.io`
5. **Updates automatically** → Every push updates your live site

---

## 📍 Where is My Repository Name?

Your repository **MUST** be named exactly like this:

| Your GitHub Username | Repository Name |
|---|---|
| `tushar-kant` | `tushar-kant.github.io` |
| `john-smith` | `john-smith.github.io` |
| `dev-jane` | `dev-jane.github.io` |

---

## 🚨 Common Mistakes

❌ **Wrong**: `my-portfolio` or `portfolio`
✅ **Right**: `USERNAME.github.io`

❌ **Wrong**: Private repository
✅ **Right**: Public repository

❌ **Wrong**: Manual upload
✅ **Right**: `git push` (automatic deployment)

---

## 🔗 Your Live URL

Once deployed, your portfolio will be at:

```
https://USERNAME.github.io
```

**This is FREE and no domain registration needed!**

---

## 📚 Full Details

For complete step-by-step guide, see: `GITHUB_PAGES_SETUP.md`

---

## ✅ Verify Deployment

1. Go to your GitHub repository
2. Click **Actions** tab
3. Look for workflow (should be green ✅)
4. Visit `https://USERNAME.github.io`
5. Your portfolio should appear! 🎉

---

## 🔄 Update Your Portfolio

After initial setup, updating is super easy:

```powershell
# Edit your files (e.g., src/data/data.tsx)
# Then:
git add .
git commit -m "Update portfolio"
git push

# Your site updates automatically in ~2 minutes! 🚀
```

---

**All set? Check GITHUB_PAGES_SETUP.md for detailed instructions!**
