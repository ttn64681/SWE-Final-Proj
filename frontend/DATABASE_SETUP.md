# Database Setup Guide

## 1. Neon PostgreSQL Setup

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy your connection string from the dashboard

## 2. Environment Variables

Create a `.env.local` file in the frontend directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# JWT Secret for token generation
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Next.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Environment
NODE_ENV="development"
```

## 3. Database Initialization

Run the database initialization script to create the users table:

```bash
npm run init-db
```

Or manually run:

```bash
npx tsx scripts/init-db.ts
```

## 4. Database Schema

The users table includes the following fields:

- `id` (SERIAL PRIMARY KEY)
- `email` (VARCHAR(255) UNIQUE)
- `password` (TEXT - hashed with bcrypt)
- `first_name` (VARCHAR(100))
- `last_name` (VARCHAR(100))
- `phone_number` (VARCHAR(20))
- `address` (TEXT)
- `state` (VARCHAR(100))
- `country` (VARCHAR(100))
- `is_active` (BOOLEAN DEFAULT true)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 5. Security Features

- Passwords are hashed using bcrypt with salt rounds of 12
- JWT tokens are used for authentication
- HTTP-only cookies for secure token storage
- CSRF protection with SameSite cookies
- Input validation and sanitization
- SQL injection protection with parameterized queries

## 6. API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/logout` - User logout

## 7. Testing

You can test the authentication system by:

1. Starting the development server: `npm run dev`
2. Navigating to `/auth/register` to create an account
3. Logging in at `/auth/login`
4. Accessing protected routes like `/profile`
