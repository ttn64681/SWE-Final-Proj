# ACM Cinema Backend

Spring Boot REST API backend for the ACM Cinema application.

## Features

- **User Authentication**: Login, registration, and JWT token management
- **Database Integration**: PostgreSQL with JPA/Hibernate
- **Security**: Spring Security with JWT tokens
- **CORS Support**: Configured for frontend integration
- **Validation**: Input validation with Bean Validation

## Tech Stack

- Java 17
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT (JSON Web Tokens)
- Maven

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/logout` - User logout

## Setup

1. **Prerequisites**
   - Java 17 or higher
   - Maven 3.6+
   - PostgreSQL database

2. **Environment Variables**
   ```bash
   DATABASE_URL=jdbc:postgresql://localhost:5432/cinema_db
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your-super-secret-jwt-key
   ```

3. **Run the Application**
   ```bash
   mvn spring-boot:run
   ```

4. **Build JAR**
   ```bash
   mvn clean package
   java -jar target/cinema-backend-0.0.1-SNAPSHOT.jar
   ```

## Database Schema

The application will automatically create the `users` table with the following structure:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    state VARCHAR(100),
    country VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## Configuration

The application uses `application.properties` for configuration. Key settings:

- **Database**: PostgreSQL connection settings
- **JWT**: Secret key and token expiration
- **CORS**: Allowed origins and methods
- **Server**: Port and context path

## Security

- Passwords are hashed using BCrypt
- JWT tokens for stateless authentication
- CORS configured for frontend integration
- Input validation on all endpoints

## Development

To run in development mode:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## Testing

Run tests with:

```bash
mvn test
```
