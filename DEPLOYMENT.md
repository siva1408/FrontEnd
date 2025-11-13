# GitHub Pages Deployment Guide for siva.dev

## Quick Deployment Steps

Since your code is currently on the `claude/create-siva-dev-portfolio-011CV69jTevAS5zHcsuRg6Lq` branch, you need to merge it to your main branch and enable GitHub Pages. Here's how:

---

## Method 1: Deploy via Pull Request (Recommended)

### Step 1: Create a Pull Request
1. Go to your GitHub repository: `https://github.com/siva1408/FrontEnd`
2. You should see a banner saying "claude/create-siva-dev-portfolio... had recent pushes"
3. Click **"Compare & pull request"**
4. Set the base branch to `main` (or `master` if that's your default)
5. Add a title: "Add siva.dev portfolio landing page"
6. Click **"Create pull request"**

### Step 2: Merge the Pull Request
1. Review the changes in the PR
2. Click **"Merge pull request"**
3. Click **"Confirm merge"**
4. Optionally, delete the claude/ branch after merging

### Step 3: Enable GitHub Pages
1. Go to your repository **Settings**
2. Scroll down to **"Pages"** in the left sidebar
3. Under **"Source"**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
4. Click **"Save"**

### Step 4: Access Your Site
- Your site will be live at: `https://siva1408.github.io/FrontEnd/`
- It may take 1-2 minutes to deploy
- Check the Actions tab to see deployment progress

---

## Method 2: Manual Git Commands (Alternative)

If you prefer using Git commands:

```bash
# Fetch all branches
git fetch origin

# Create/checkout main branch
git checkout -b main origin/main || git checkout main

# Merge the claude branch
git merge claude/create-siva-dev-portfolio-011CV69jTevAS5zHcsuRg6Lq

# Push to main
git push origin main
```

Then follow **Step 3** above to enable GitHub Pages.

---

## Method 3: Quick Deploy with gh CLI (If installed)

```bash
# Install gh CLI if not installed
# On macOS: brew install gh
# On Linux: See https://github.com/cli/cli/blob/trunk/docs/install_linux.md

# Authenticate
gh auth login

# Create main branch if it doesn't exist
git checkout -b main
git push -u origin main

# Enable GitHub Pages
gh repo edit --enable-pages --pages-branch main
```

---

## Troubleshooting

### Issue: "main branch doesn't exist"
**Solution**: If this is a new repository, create the main branch first:
```bash
git checkout -b main
git push -u origin main
```

### Issue: GitHub Pages not showing content
**Solution**:
- Check that `index.html` is in the root directory ✓ (it is!)
- Wait 1-2 minutes for deployment
- Check the Actions tab for any errors
- Verify GitHub Pages is enabled in Settings

### Issue: 404 Page Not Found
**Solution**:
- Make sure the branch is set to `main` in Pages settings
- Ensure the folder is set to `/ (root)`
- Clear your browser cache

---

## Custom Domain Setup (Optional)

Want to use `siva.dev` instead of `siva1408.github.io/FrontEnd`?

### Step 1: Add CNAME Record
1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Add a **CNAME** record:
   - Name/Host: `www`
   - Value: `siva1408.github.io`
3. Add an **A** record for apex domain:
   - Name/Host: `@`
   - Value: GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

### Step 2: Configure GitHub Pages
1. In repository Settings → Pages
2. Under "Custom domain", enter: `siva.dev`
3. Click **"Save"**
4. Wait for DNS check to complete
5. Enable **"Enforce HTTPS"** (recommended)

---

## Alternative Deployment Options

If GitHub Pages isn't suitable, try these alternatives:

### Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Deploy!
- Your site will be at: `your-site-name.netlify.app`

### Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Deploy!

### Cloudflare Pages
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub account
3. Select your repository
4. Deploy!

---

## Verification Checklist

- [ ] Code is merged to main branch
- [ ] GitHub Pages is enabled in Settings
- [ ] index.html is in the root directory
- [ ] Site is accessible at GitHub Pages URL
- [ ] All animations and styles are working
- [ ] Mobile responsive design is working

---

## Need Help?

- GitHub Pages Documentation: https://docs.github.com/pages
- Check repository Actions tab for deployment logs
- Ensure GitHub Pages is enabled for public repositories (or GitHub Pro for private)

---

**Your portfolio will be live soon! 🚀**
