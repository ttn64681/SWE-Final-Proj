#!/usr/bin/env bash
# This line tells the system to use bash to run this script
# The "env bash" part finds bash wherever it's installed on your system

set -euo pipefail
# This makes the script safer by:
# -e: Stop if any command fails
# -u: Stop if we try to use an undefined variable
# -o pipefail: Stop if any command in a pipeline fails

# PostgreSQL Database Restore Script

# WHAT THIS SCRIPT DOES:
# - Takes a backup file created by backup_postgres.sh
# - Restores it to a PostgreSQL database (like your Neon database)
# - OVERWRITES the target database completely

# WARNING: THIS WILL DELETE ALL EXISTING DATA IN THE TARGET DATABASE!
# Make sure you have a backup before running this!

# PREREQUISITES:
# You need PostgreSQL client tools installed (same as backup script):
# - pg_restore takes backup file and restores it to a database
# - libpq for connecting to the database (to check if the database is reachable)
# - psql for interacting with the database

# On Mac:
#   brew install postgresql@17
#   # OR for just client tools:
#   brew install libpq
#   brew link --force libpq

# On Windows:
#   Download from https://www.postgresql.org/download/windows/
#   During installation, select ONLY "Command Line Tools"

# USAGE EXAMPLES:
#   ./scripts/restore_postgres.sh backups/backup_2024-10-07_143022.dump postgresql://user:pass@host:5432/dbname
#   ./scripts/restore_postgres.sh backups/backup_2024-10-07_143022.dump $RESTORE_DATABASE_URL

# Get the backup file path from first argument
# ${1:-} means "use first argument if provided, otherwise use empty string"
BACKUP_FILE=${1:-}

# Get the restore database URL from second argument or environment variable
# ${2:-${RESTORE_DATABASE_URL:-}} means:
#   "use second argument if provided, otherwise use RESTORE_DATABASE_URL environment variable, otherwise use empty string"
RESTORE_URL=${2:-${RESTORE_DATABASE_URL:-}}

# Check if both required parameters are provided
# [[ -z ...(string)... ]] checks if the string is empty (zero length)
# [[ -z "$BACKUP_FILE" || -z "$RESTORE_URL" ]] means "if BACKUP_FILE is empty OR RESTORE_URL is empty"
if [[ -z "$BACKUP_FILE" || -z "$RESTORE_URL" ]]; then
  echo "ERROR: Missing required parameters"
  echo ""
  echo "Usage:"
  echo "  ./scripts/restore_postgres.sh <backup_file> <restore_database_url>"
  echo ""
  echo "Examples:"
  echo "  ./scripts/restore_postgres.sh backups/backup_2024-10-07_143022.dump postgresql://user:pass@host:5432/dbname"
  echo "  RESTORE_DATABASE_URL=postgresql://... ./scripts/restore_postgres.sh backups/backup_2024-10-07_143022.dump"
  echo ""
  echo "WARNING: This will completely replace the target database!"
  exit 1
fi

# Check if the backup file exists
if [[ ! -f "$BACKUP_FILE" ]]; then
  echo "ERROR: Backup file not found: $BACKUP_FILE"
  echo "Make sure the file path is correct and the file exists."
  exit 1
fi

# Show what we're about to do
echo "Restoring database..."
echo "From: $BACKUP_FILE"
echo "To: $RESTORE_URL"
echo ""
echo "WARNING: This will completely replace the target database!"
echo "Press Ctrl+C within 5 seconds to cancel..."

# Give user 5 seconds to cancel
sleep 5

echo "Starting restore..."

# Run pg_restore to restore the backup
# --clean: Drop database objects before recreating them (removes existing data)
# --if-exists: Only drop objects if they exist (prevents errors if they don't exist)
# --no-owner: Don't try to set ownership (avoids permission issues)
# --dbname="$RESTORE_URL": Connect to this database URL
# "$BACKUP_FILE": Restore from this backup file
pg_restore --clean --if-exists --no-owner --dbname="$RESTORE_URL" "$BACKUP_FILE"

# Check if restore was successful
if [[ $? -eq 0 ]]; then
  echo "Restore complete!"
  echo "Your database has been restored from: $BACKUP_FILE"
else
  echo "Restore failed!"
  echo "Check the error messages above for details."
  exit 1
fi




