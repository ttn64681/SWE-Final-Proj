import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Database connection configuration
const connectionString = process.env.DATABASE_URL || 'postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require';

// Create the connection
const client = postgres(connectionString);

// Create the database instance
export const db = drizzle(client);

// Export the client for direct queries if needed
export { client };
