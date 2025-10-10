# ACM Cinema Booking System

A full-stack cinema booking application built with Next.js frontend and Spring Boot backend.

## Links
- **Vercel Deployment**:
- **Jira**:
- **Figma**:

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Spring Boot, Java 17, PostgreSQL
- **Database**: Neon PostgreSQL (cloud)
- **Deployment**: Vercel (frontend), TBD (backend)

## Quick Start

### Prerequisites

- Node.js 18+
- Java 17+
- PostgreSQL client tools (for backups)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd SWE-Final-Proj
   npm install
   ```

2. **Set up environment:**
   ```bash
   # From root directory -
   # macOS/Linux:
   source set_env.sh
   # Windows:
   .\set_env.ps1

   ```

3. **Run the application:**
   ```bash
   # Frontend (Terminal 1)
   npm run dev
   
   # Backend (Terminal 2)
   cd backend
   # macOS/Linux:
   ./mvnw spring-boot:run
   # Windows:
   mvnw spring-boot:run
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## Database Management

### Flyway Migrations

Schema changes are managed with Flyway migrations in `backend/src/main/resources/db/migration/`.

**Create a new migration:**
```bash
# Example: V2__add_users_table.sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Database Backups

**Manual backup:**
```bash
export DATABASE_URL="your-neon-connection-string"
./scripts/backup_postgres.sh
```

**Restore from backup:**
```bash
./scripts/restore_postgres.sh backups/backup_2024-10-07_143022.dump "your-restore-url"
```

**Automatic daily backups:**
```bash
source set_env.sh
# then
cd backend/ && ./mvnw spring-boot:run # Mac/Linux
(mvn spring-boot:run ) # Windows
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result (optional).


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
