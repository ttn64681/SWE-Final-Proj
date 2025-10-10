#!/usr/bin/env bash

set -euo pipefail
# This makes the script safer by:
# -e: Stop if any command fails
# -u: Stop if we try to use an undefined variable
# -o pipefail: Stop if any command in a pipeline fails

# PostgreSQL Database Backup Script
# 
# - Connects to your Neon PostgreSQL database
# - Creates a backup file with all your data and schema
# - Saves the backup to a local folder with timestamp

# PREREQUISITES:
# 1. You need to set the DATABASE_URL environment variable via source set_env.sh or set_env.ps1
# 2. You need PostgreSQL client tools installed:
#    - pg_dump for exporting the database (create locak backup file that you can restore later)
#    - libpq for connecting to the database (to check if the database is reachable)
#    - psql for interacting with the database
#
# On Mac:
#   brew install postgresql@17
#   # OR for just client tools:
#   brew install libpq
#   brew link --force libpq
#
# On Windows:
#   Download from https://www.postgresql.org/download/windows/
#   During installation, select ONLY "Command Line Tools"
#   (You don't need PostgreSQL Server since you're using Neon)

# USAGE EXAMPLES:
#   ./scripts/backup_postgres.sh                              # uses $DATABASE_URL environment variable
#   DATABASE_URL=postgres://... ./scripts/backup_postgres.sh  # pass DATABASE_URL inline
#   ./scripts/backup_postgres.sh my_backups                   # save to custom folder

# Check if DATABASE_URL is provided
# The ${DATABASE_URL:-} syntax means "use DATABASE_URL if it exists, otherwise use empty string"
# The [[ -z ... ]] checks if the string is empty (zero length)
if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "ERROR: DATABASE_URL is not set."
  echo "You need to provide your Neon database connection string."
  echo "Example: DATABASE_URL='postgresql://user:pass@host:5432/dbname' ./scripts/backup_postgres.sh"
  exit 1
fi

# Create timestamp for unique backup filename
# date - command that prints the current date and time
# - specify the format of date and time w/ +%F_%H%M%S
# - %F = YYYY-MM-DD format (e.g., 2024-10-07)
# - %H%M%S = HH:MM:SS format (e.g., 143022 for 2:30:22 PM)
STAMP=$(date +%F_%H%M%S)

# Set output directory - use first argument if provided, otherwise default to "backups"
# ${1:-backups} means "use first argument if provided, otherwise use 'backups'"
# Example argument: ./scripts/backup_postgres.sh my_backups
OUTDIR=${1:-backups}

# Create the backup directory if it doesn't exist
# -p flag creates parent directories if needed and doesn't error if directory already exists
mkdir -p "$OUTDIR"

# Create the backup filename with timestamp
FILE="$OUTDIR/backup_${STAMP}.dump"
echo "Creating backup..."
echo "Saving to: $FILE"

# Run pg_dump to create the backup
# --format=custom: Creates a compressed, binary format that's fast and efficient
# --no-owner: Don't include ownership information (avoids permission issues)
# --file="$FILE": Save the backup to our timestamped file
pg_dump "$DATABASE_URL" --format=custom --no-owner --file="$FILE"

# Check if the backup was successful
# -f flag checks if the file exists
if [[ -f "$FILE" ]]; then
  # Get file size in human-readable format
  # -lh flag lists file size in human-readable format
  # -awk command that prints the 5th field (file size)
  SIZE=$(ls -lh "$FILE" | awk '{print $5}')
  echo "Backup complete!"
  echo "File: $FILE"
  echo "Size: $SIZE"
else
  echo "Backup failed - file was not created"
  exit 1
fi




