# Vercel Deployment Guide

This guide will help you deploy the Skopeo website to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Git repository (GitHub, GitLab, or Bitbucket)
3. Node.js 18+ installed locally

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new one
   - Choose your Git repository
   - Confirm build settings

5. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push your code to Git**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to [vercel.com/dashboard](https://vercel.com/dashboard)**

3. **Click "New Project"**

4. **Import your Git repository**

5. **Configure build settings**:
   - Build Command: `npm run build:vercel`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Deploy**

## Environment Variables

If you need to set environment variables:

1. **Via CLI**:
   ```bash
   vercel env add VARIABLE_NAME
   ```

2. **Via Dashboard**:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add your variables

## Project Structure for Vercel

```
├── api/
│   └── index.ts          # Vercel serverless function entry point
├── client/               # React frontend
├── server/               # Express server (for local development)
├── dist/                 # Build output (created during build)
├── vercel.json           # Vercel configuration
├── .vercelignore         # Files to ignore during deployment
└── package.json          # Dependencies and scripts
```

## Build Process

The deployment uses the `build:vercel` script which:
1. Builds the React frontend with Vite
2. Bundles the API serverless function with esbuild
3. Outputs everything to the `dist/` directory

## API Endpoints

After deployment, your API will be available at:
- `https://your-domain.vercel.app/api/health` - Health check
- `https://your-domain.vercel.app/api/status` - Status endpoint

## Troubleshooting

### Build Failures
- Check that all dependencies are in `dependencies` (not `devDependencies`)
- Ensure TypeScript compilation passes: `npm run check`
- Verify build works locally: `npm run build:vercel`

### Runtime Errors
- Check Vercel function logs in the dashboard
- Verify environment variables are set correctly
- Ensure all imports are properly resolved

### Static Files Not Loading
- Check that the build output includes the `public/` directory
- Verify `vercel.json` routes are configured correctly

## Local Development

To test the Vercel build locally:

```bash
# Build the project
npm run build:vercel

# Test the built application
npm start
```

## Custom Domain

To add a custom domain:
1. Go to your project settings in Vercel dashboard
2. Navigate to "Domains"
3. Add your domain and follow DNS configuration instructions
