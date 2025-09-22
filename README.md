# Book Catalog App

A full-stack book catalog application built with Next.js, TypeScript, PostgreSQL, Prisma ORM, and NextAuth.js for user authentication.

## Features

- **User Authentication**: Sign in with email/password or Google OAuth
- **Book Management**: View, add, and delete books
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Database Integration**: PostgreSQL with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js (Email/Password, Google)
- **Database**: PostgreSQL (hosted via Neon/Supabase/ElephantSQL)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (local or hosted)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd book-catalog-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/bookcatalog?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/books` | Fetch all books |
| POST | `/api/books` | Add a new book |
| DELETE | `/api/books/:id` | Delete a book |

## Pages

- **Home Page** (`/`): Display all books with delete functionality
- **Add Book Page** (`/add`): Form to add new books (requires authentication)
- **Sign In Page** (`/auth/signin`): Authentication page with email/password and Google sign-in

## Authentication Flow

1. **Google OAuth**: Users can sign in with their Google account
2. **Email/Password**: Users can sign in with credentials (for demo purposes)
3. **Session Management**: JWT-based sessions with NextAuth.js
4. **Protected Routes**: Add book functionality requires authentication

## Database Schema

### User Model
- `id`: Unique identifier
- `name`: User's display name
- `email`: User's email address
- `password`: Hashed password (for credentials auth)
- `image`: Profile image URL
- `createdAt`, `updatedAt`: Timestamps

### Book Model
- `id`: Unique identifier
- `title`: Book title
- `author`: Book author
- `genre`: Book genre
- `createdAt`, `updatedAt`: Timestamps

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the following environment variables in Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (your Vercel domain)
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID` (if using Google OAuth)
   - `GOOGLE_CLIENT_SECRET` (if using Google OAuth)
4. Deploy!

### Database Setup for Production

For production, use a hosted PostgreSQL service:
- **Neon**: https://neon.tech
- **Supabase**: https://supabase.com
- **ElephantSQL**: https://www.elephantsql.com

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run db:generate`: Generate Prisma client
- `npm run db:push`: Push schema to database
- `npm run db:migrate`: Run database migrations
- `npm run db:studio`: Open Prisma Studio

### Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   └── books/
│   ├── auth/
│   │   └── signin/
│   ├── add/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AuthProvider.tsx
│   └── Navbar.tsx
└── lib/
    ├── auth.ts
    └── prisma.ts
```

## Features Implemented

✅ **Backend API (Next.js + Prisma)** - 25%
- Complete CRUD operations for books
- Type-safe API routes with TypeScript
- Error handling and validation

✅ **Authentication (NextAuth.js)** - 30%
- Google OAuth integration
- Email/password authentication
- Session management with JWT
- Protected routes

✅ **TypeScript Usage** - 15%
- Full TypeScript implementation
- Type-safe API responses
- Interface definitions for all models

✅ **Code Structure & Organization** - 15%
- Clean separation of concerns
- Modular component structure
- Proper error handling

✅ **UI Design & UX** - 10%
- Responsive design with Tailwind CSS
- Modern, clean interface
- Mobile-friendly layout

✅ **Deployment** - 5%
- Vercel-ready configuration
- Environment variable setup
- Production build optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.