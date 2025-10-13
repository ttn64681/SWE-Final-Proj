#!/usr/bin/env bash

set -euo pipefail

# Daily Backup Setup Script
# Sets up automatic daily backups at 2:00 AM using cron job
# Requires: PG_DATABASE_URL environment variable and PostgreSQL client tools

# Usage: ./db_backup/setup_daily_backup.sh

echo "Setting up daily database backups..."

# Check if we're in the right directory
if [[ ! -f "db_backup/backup_postgres.sh" ]]; then
  echo "ERROR: Please run this script from your project root directory"
  exit 1
fi

# Check if PG_DATABASE_URL is set (in set_env.sh)
if [[ -z "${PG_DATABASE_URL:-}" ]]; then
  echo "ERROR: PG_DATABASE_URL environment variable is not set"
  exit 1
fi

# Check if pg_dump is available
if ! command -v pg_dump &> /dev/null; then
  echo "ERROR: pg_dump command not found"
  exit 1
fi

# Get project directory and setup paths
PROJECT_DIR=$(pwd)
BACKUP_SCRIPT="$PROJECT_DIR/db_backup/backup_postgres.sh"
LOG_DIR="$PROJECT_DIR/db_backup/logs"

echo "Project directory: $PROJECT_DIR"
echo "Backup script: $BACKUP_SCRIPT"

# Create logs directory and make scripts executable
mkdir -p "$LOG_DIR"
chmod +x "$BACKUP_SCRIPT"
chmod +x "$PROJECT_DIR/db_backup/cleanup_backups.sh"

# Create cron job entry (runs daily at 2:00 AM)
# Includes backup + cleanup to keep storage clean
# Set PATH to include PostgreSQL tools and source environment
BACKUP_CMD="PG_DATABASE_URL='$PG_DATABASE_URL' '$BACKUP_SCRIPT'"
CLEANUP_CMD="'$PROJECT_DIR/db_backup/cleanup_backups.sh'"
# Cron syntax: "0 2 * * *" = daily at 2:00 AM
# "cd '$PROJECT_DIR'" = set working directory
# "export PATH=..." = add PostgreSQL tools to PATH (crucial fix!)
# "&&" = run commands sequentially (only if previous succeeds)
# ">> '$LOG_DIR/backup.log' 2>&1" = redirect output and errors to log file
CRON_JOB="0 2 * * * cd '$PROJECT_DIR' && export PATH='/usr/local/bin:/usr/bin:/bin' && $BACKUP_CMD && $CLEANUP_CMD >> '$LOG_DIR/backup.log' 2>&1"

echo ""
echo "Cron job to be added:"
echo "   $CRON_JOB"
echo ""

# Check if this cron job already exists
if crontab -l 2>/dev/null | grep -q "db_backup/backup_postgres.sh"; then
  echo "WARNING: A backup cron job already exists!"
  echo "Current cron jobs:"
  crontab -l | grep -v "^#" | grep -v "^$"
  echo ""
  echo "Do you want to replace it? (y/N)"
  read -r response
  if [[ "$response" =~ ^[Yy]$ ]]; then
    # Remove existing backup jobs
    crontab -l 2>/dev/null | grep -v "db_backup/backup_postgres.sh" | crontab -
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
echo "   • Backups are saved to: $PROJECT_DIR/db_backup/backups/"
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
