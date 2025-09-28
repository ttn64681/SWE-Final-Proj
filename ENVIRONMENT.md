# Environment Configuration Guide

## Root-Level Configuration
All environment variables are managed at the project root level in `.env` and `set_env.sh`.

## Local Development
Run from the project root:
```bash
source set_env.sh
```

This sets up both backend and frontend environment variables.

## Production Deployment

### Vercel Deployment
1. In your Vercel dashboard, go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend-domain.com` (replace with your actual backend URL)

### Other Platforms
Set the environment variable `NEXT_PUBLIC_API_URL` to your backend URL in your deployment platform's environment configuration.

## Environment Files
- `.env` - Root environment file (committed to git)
- `set_env.sh` - Environment setup script (committed to git)

## API Configuration
The API configuration is handled in `frontend/src/config/api.ts` and automatically uses the environment variable for the base URL.
