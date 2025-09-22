# Quick Setup Guide

## 1. Environment Setup

Create a `.env.local` file in the root directory with:

```env
# Database (replace with your PostgreSQL connection string)
DATABASE_URL="postgresql://username:password@localhost:5432/bookcatalog?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (optional - get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 2. Database Setup

### Option A: Local PostgreSQL
1. Install PostgreSQL locally
2. Create a database named `bookcatalog`
3. Update DATABASE_URL in `.env.local`

### Option B: Hosted PostgreSQL (Recommended)
1. Sign up for [Neon](https://neon.tech) or [Supabase](https://supabase.com)
2. Create a new database
3. Copy the connection string to DATABASE_URL

## 3. Run the Application

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Start development server
npm run dev
```

## 4. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env.local`

## 5. Production Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Troubleshooting

- **Database connection issues**: Check DATABASE_URL format
- **Authentication errors**: Verify NEXTAUTH_SECRET is set
- **Google OAuth not working**: Check redirect URI matches exactly
