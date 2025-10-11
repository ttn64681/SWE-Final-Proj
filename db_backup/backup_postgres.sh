#!/usr/bin/env bash

set -euo pipefail

# PostgreSQL Database Backup Script
# Creates backup of Neon PostgreSQL database with timestamp
# Requires: PG_DATABASE_URL environment variable and PostgreSQL client tools
#   (Don't need PostgreSQL Server since we're using Neon)

# Usage: ./db_backup/backup_postgres.sh [backup_folder]

# Check if PG_DATABASE_URL is set
if [[ -z "${PG_DATABASE_URL:-}" ]]; then
  echo "ERROR: PG_DATABASE_URL is not set."
  echo "Example: PG_DATABASE_URL='postgresql://user:pass@host:5432/dbname' ./db_backup/backup_postgres.sh"
  exit 1
fi

# Create timestamp and output directory
STAMP=$(date +%F_%H%M%S)
OUTDIR=${1:-"db_backup/backups"}
mkdir -p "$OUTDIR"
FILE="$OUTDIR/backup_${STAMP}.dump"

echo "Creating backup..."
echo "Saving to: $FILE"

pg_dump "$PG_DATABASE_URL" --format=custom --no-owner --file="$FILE"

# Verify backup was created
if [[ -f "$FILE" ]]; then
  SIZE=$(ls -lh "$FILE" | awk '{print $5}')
  echo "Backup complete!"
  echo "File: $FILE"
  echo "Size: $SIZE"
else
  echo "Backup failed - file was not created"
  exit 1
fi




