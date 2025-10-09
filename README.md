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
./scripts/setup_daily_backup.sh
```

## Development

### Project Structure

```
├── frontend/          # Next.js application
├── backend/           # Spring Boot application
├── scripts/           # Database backup scripts
└── README.md         # This file
```

### Environment Variables

Set these in your environment or `.env` file:

- `DATABASE_URL`: Neon PostgreSQL connection string
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:8080)
- `JWT_SECRET`: Secret key for JWT tokens

### API Endpoints

- `GET /api/movies/now-playing` - Current movies
- `GET /api/movies/upcoming` - Upcoming movies
- `GET /api/movies/search-now-playing` - Search current movies
- `GET /api/movies/{id}` - Movie details

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url.com`
3. Deploy

### Backend

Deploy to your preferred platform (Railway, Render, AWS, etc.) with:
- Java 17 runtime
- PostgreSQL database
- Environment variables configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.