#!/usr/bin/env bash
# This line tells the system to use bash to run this script

set -euo pipefail
# This makes the script safer by:
# -e: Stop if any command fails
# -u: Stop if we try to use an undefined variable
# -o pipefail: Stop if any command in a pipeline fails

# Daily Backup Setup Script
# - Sets up automatic daily backups at 2:00 AM
# - Creates a cron job that runs backup_postgres.sh every day
# - Sets up logging so you can see if backups succeed or fail
# - Only works on Mac/Linux (Windows users need Task Scheduler)
#
# PREREQUISITES:
# 1. PostgreSQL client tools installed (pg_dump)
# 2. DATABASE_URL environment variable set
# 3. This script run from your project directory

echo "Setting up daily database backups..."

# Check if we're in the right directory
if [[ ! -f "scripts/backup_postgres.sh" ]]; then
  echo "ERROR: Please run this script from your project root directory"
  echo "The scripts/backup_postgres.sh file should be in the current directory."
  exit 1
fi

# Check if DATABASE_URL is set
if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "ERROR: DATABASE_URL environment variable is not set"
  echo ""
  echo "Please set your Neon database connection string first:"
  echo "  export DATABASE_URL='postgresql://user:pass@host:5432/dbname'"
  echo ""
  echo "Then run this script again."
  exit 1
fi

# Check if pg_dump is available
if ! command -v pg_dump &> /dev/null; then
  echo "ERROR: pg_dump command not found"
  echo ""
  echo "Please install PostgreSQL client tools first:"
  echo "  Mac: brew install postgresql@17"
  echo "  Windows: Download from https://www.postgresql.org/download/windows/"
  exit 1
fi

# Get the absolute path to the project directory
# This ensures the cron job can find the backup script from anywhere
PROJECT_DIR=$(pwd)
BACKUP_SCRIPT="$PROJECT_DIR/scripts/backup_postgres.sh"
LOG_DIR="$PROJECT_DIR/logs"

echo "Project directory: $PROJECT_DIR"
echo "Backup script: $BACKUP_SCRIPT"

# Create logs directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Make sure the backup script is executable
chmod +x "$BACKUP_SCRIPT"

# Create the cron job entry
# Format: minute hour day month weekday command
# 0 2 * * * = Every day at 2:00 AM
CRON_JOB="0 2 * * * cd '$PROJECT_DIR' && DATABASE_URL='$DATABASE_URL' '$BACKUP_SCRIPT' >> '$LOG_DIR/backup.log' 2>&1"

echo ""
echo "Cron job to be added:"
echo "   $CRON_JOB"
echo ""

# Check if this cron job already exists
if crontab -l 2>/dev/null | grep -q "backup_postgres.sh"; then
  echo "WARNING: A backup cron job already exists!"
  echo "Current cron jobs:"
  crontab -l | grep -v "^#" | grep -v "^$"
  echo ""
  echo "Do you want to replace it? (y/N)"
  read -r response
  if [[ "$response" =~ ^[Yy]$ ]]; then
    # Remove existing backup jobs
    crontab -l 2>/dev/null | grep -v "backup_postgres.sh" | crontab -
    echo "Removed existing backup cron job"
  else
    echo "Setup cancelled"
    exit 0
  fi
fi

# Add the new cron job
# The (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab - pattern:
# 1. Get current crontab (crontab -l)
# 2. Add our new job (echo "$CRON_JOB")
# 3. Install the combined crontab (crontab -)
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "Daily backup cron job added successfully!"
echo ""
echo "What happens now:"
echo "   • Every day at 2:00 AM, your database will be backed up"
echo "   • Backups are saved to: $PROJECT_DIR/backups/"
echo "   • Logs are saved to: $LOG_DIR/backup.log"
echo ""
echo "To check your cron jobs:"
echo "   crontab -l"
echo ""
echo "To view backup logs:"
echo "   tail -f $LOG_DIR/backup.log"
echo ""
echo "To remove the cron job later:"
echo "   crontab -e  # then delete the backup line"
echo ""
echo "Setup complete! Your first automatic backup will run tomorrow at 2:00 AM."
