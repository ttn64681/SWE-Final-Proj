#!/usr/bin/env bash

# Cron Backup Wrapper Script
# This script ensures proper environment setup for cron jobs
# Cron runs with minimal environment, so we need to explicitly set everything

set -euo pipefail

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Log file for debugging
LOG_FILE="$SCRIPT_DIR/logs/cron_backup.log"

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "Starting cron backup wrapper..."

# Change to project directory
cd "$PROJECT_DIR"

# Source the environment variables
if [[ -f "$PROJECT_DIR/set_env.sh" ]]; then
    log "Sourcing environment variables from set_env.sh"
    # Source the environment script
    source "$PROJECT_DIR/set_env.sh"
else
    log "ERROR: set_env.sh not found at $PROJECT_DIR/set_env.sh"
    exit 1
fi

# Verify PG_DATABASE_URL is set
if [[ -z "${PG_DATABASE_URL:-}" ]]; then
    log "ERROR: PG_DATABASE_URL is not set after sourcing set_env.sh"
    exit 1
fi

log "PG_DATABASE_URL is set: ${PG_DATABASE_URL:0:50}..."

# Add common PostgreSQL paths to PATH
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/pgsql/bin:/opt/homebrew/bin:$PATH"

# Check if pg_dump is available
if ! command -v pg_dump &> /dev/null; then
    log "ERROR: pg_dump command not found in PATH: $PATH"
    exit 1
fi

log "pg_dump found at: $(which pg_dump)"

# Run the backup script
log "Running backup script..."
if "$SCRIPT_DIR/backup_postgres.sh"; then
    log "Backup completed successfully"
else
    log "ERROR: Backup script failed"
    exit 1
fi

# Run the cleanup script
log "Running cleanup script..."
if "$SCRIPT_DIR/cleanup_backups.sh"; then
    log "Cleanup completed successfully"
else
    log "ERROR: Cleanup script failed"
    exit 1
fi

log "Cron backup wrapper completed successfully"
