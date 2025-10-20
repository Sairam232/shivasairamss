# GitHub to Cloudflare Deployment Guide

## 📦 Files You Need in Your GitHub Repo

### **Required Files:**

1. **`worker.js`** - Your API code (use worker-all-features-unlocked.js content)
2. **`wrangler.toml`** - Cloudflare configuration

### **Optional Files:**

3. **`README.md`** - Documentation
4. **`.gitignore`** - Git ignore file
5. **`package.json`** - NPM scripts (optional)

---

## 🔧 Step 1: Create GitHub Repository

### Option A: Create New Repo on GitHub.com

1. Go to: **https://github.com/new**
2. Repository name: `redirect-chain-analyzer-api`
3. Description: `Professional redirect chain analyzer API with 32 endpoints`
4. Visibility: **Public** or **Private** (your choice)
5. **Don't** initialize with README (we'll add our own)
6. Click **"Create repository"**

### Option B: Use Existing Repo

Skip to Step 2 if you already have a repo.

---

## 📤 Step 2: Upload Files to GitHub

### Method 1: Using Git Command Line (Recommended)

```bash
# 1. Initialize git in your project folder
git init

# 2. Add all files
git add worker.js wrangler.toml README.md

# 3. Commit
git commit -m "Initial commit: Redirect Chain Analyzer API"

# 4. Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/redirect-chain-analyzer-api.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

### Method 2: Using GitHub Web Interface

1. Go to your GitHub repo
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop:
   - `worker.js`
   - `wrangler.toml`
   - `README.md`
4. Click **"Commit changes"**

---

## ☁️ Step 3: Deploy from GitHub to Cloudflare

### Method A: Deploy via Wrangler CLI (Easiest)

```bash
# 1. Clone your GitHub repo
git clone https://github.com/YOUR_USERNAME/redirect-chain-analyzer-api.git
cd redirect-chain-analyzer-api

# 2. Login to Cloudflare
wrangler login

# 3. Deploy
wrangler deploy

# 4. Your API is live! ✅
# https://shivasairams.swami8uds.workers.dev
```

### Method B: Auto-Deploy with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

**Then:**
1. Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add secret: `CLOUDFLARE_API_TOKEN` (get from Cloudflare dashboard)
3. Push to main branch → Auto-deploys! 🚀

---

## ✅ Step 4: Verify Deployment

```bash
# Test health endpoint
curl https://shivasairams.swami8uds.workers.dev/health

# Test API endpoint
curl -X POST https://shivasairams.swami8uds.workers.dev/api/analyze/advanced \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}'
```

---

## 🔑 Step 5: Add RapidAPI Proxy Secret (Optional)

```bash
# If using RapidAPI integration
wrangler secret put RAPIDAPI_PROXY_SECRET
# Paste your secret when prompted
```

---

## 📊 Your Complete GitHub Repo Structure

```
redirect-chain-analyzer-api/
├── .github/
│   └── workflows/
│       └── deploy.yml           (Optional: Auto-deploy)
├── worker.js                    (Main API code)
├── wrangler.toml                (Cloudflare config)
├── README.md                    (Documentation)
├── .gitignore                   (Git ignore)
└── package.json                 (Optional: NPM scripts)
```

---

## 🎯 Summary

**What you need:**
1. ✅ Copy `worker-all-features-unlocked.js` content to `worker.js`
2. ✅ Keep `wrangler.toml` as-is
3. ✅ Push both to GitHub
4. ✅ Deploy with `wrangler deploy`

**That's it!** Your API is live on Cloudflare. 🚀

---

## 💡 Pro Tips

1. **Don't commit secrets** - Use `wrangler secret put` for API keys
2. **Use .gitignore** - Ignore `node_modules/`, `.dev.vars`, etc.
3. **Auto-deploy** - Set up GitHub Actions for automatic deployments
4. **Monitor** - Check Cloudflare Workers dashboard for analytics

---

## 🆘 Troubleshooting

**Problem: Deployment fails**
```bash
# Solution: Check wrangler.toml name matches
wrangler whoami
wrangler deploy --dry-run
```

**Problem: API not accessible**
```bash
# Solution: Verify routes
wrangler deployments list
```

**Problem: GitHub push rejected**
```bash
# Solution: Pull first, then push
git pull origin main --rebase
git push origin main
```

---

## 📞 Need Help?

- Cloudflare Docs: https://developers.cloudflare.com/workers/
- Wrangler CLI: https://developers.cloudflare.com/workers/wrangler/
- GitHub Actions: https://github.com/cloudflare/wrangler-action
