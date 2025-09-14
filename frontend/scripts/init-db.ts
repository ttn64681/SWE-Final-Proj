import { runMigrations } from '../src/lib/db/migrate';

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    await runMigrations();
    console.log('Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeDatabase();
