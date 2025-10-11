#!/usr/bin/env bash

set -euo pipefail

# PostgreSQL Database Restore Script
# Restores backup file to PostgreSQL database (OVERWRITES existing data!)
# Requires: backup file and target PG_DATABASE_URL

# Usage: ./db_backup/restore_postgres.sh <backup_file> [restore_pg_database_url]

# Get parameters
BACKUP_FILE=${1:-}
RESTORE_URL=${2:-${PG_DATABASE_URL:-}}

# Validate parameters
if [[ -z "$BACKUP_FILE" || -z "$RESTORE_URL" ]]; then
  echo "ERROR: Missing required parameters"
  echo "Usage: ./db_backup/restore_postgres.sh <backup_file> [restore_pg_database_url]"
  echo "WARNING: This will completely replace the target database!"
  exit 1
fi

# Check if backup file exists
if [[ ! -f "$BACKUP_FILE" ]]; then
  echo "ERROR: Backup file not found: $BACKUP_FILE"
  exit 1
fi

# Check if DB_USERNAME is set
if [[ -z "${DATABASE_USERNAME:-}" ]]; then
  echo "ERROR: DATABASE_USERNAME is not set"
  echo "Please run: source set_env.sh"
  exit 1
fi

# Show restore details and wait for confirmation
echo "Restoring database..."
echo "From: $BACKUP_FILE"
echo "To: $RESTORE_URL"
echo "WARNING: This will completely replace the target database!"
echo "Press Ctrl+C within 5 seconds to cancel..."
sleep 5

echo "Starting restore..."

# First, drop all existing objects in the database
echo "Dropping all existing objects..."
echo "Using database user: $DATABASE_USERNAME"
psql "$RESTORE_URL" -c "
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO $DATABASE_USERNAME;
GRANT ALL ON SCHEMA public TO public;
"

# Now restore the backup
echo "Restoring backup..."
pg_restore --no-owner --no-privileges --dbname="$RESTORE_URL" "$BACKUP_FILE"

# Check if restore was successful
if [[ $? -eq 0 ]]; then
  echo "Restore complete!"
else
  echo "Restore failed!"
  echo "Check the error messages above for details."
  exit 1
fi




