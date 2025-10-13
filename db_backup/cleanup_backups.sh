#!/usr/bin/env bash

set -euo pipefail

# Backup Cleanup Script
# Removes old backup files to prevent disk space issues
# Usage: ./scripts/cleanup_backups.sh [backup_folder] [days_to_keep]

# Default values
BACKUP_DIR=${1:-"db_backup/backups"}
DAYS_TO_KEEP=${2:-30}

echo "Cleaning up backup files..."
echo "Directory: $BACKUP_DIR"
echo "Keeping files newer than $DAYS_TO_KEEP days"

# Check if backup directory exists
if [[ ! -d "$BACKUP_DIR" ]]; then
    echo "ERROR: Backup directory '$BACKUP_DIR' not found"
    exit 1
fi

# Count files before cleanup
FILES_BEFORE=$(find "$BACKUP_DIR" -name "*.dump" -type f | wc -l)
echo "Found $FILES_BEFORE backup files"

# Remove old backup files
# IFS is Internal Field Separator (used to separate the input into words)
# While loop reads each file in the backup directory
DELETED_COUNT=0
while IFS= read -r -d '' file; do
    echo "Deleting: $(basename "$file")"
    rm "$file"
    ((DELETED_COUNT++))
done < <(find "$BACKUP_DIR" -name "*.dump" -type f -mtime +$DAYS_TO_KEEP -print0)

# Count files after cleanup
FILES_AFTER=$(find "$BACKUP_DIR" -name "*.dump" -type f | wc -l)

echo ""
echo "Cleanup complete!"
echo "Files deleted: $DELETED_COUNT"
echo "Files remaining: $FILES_AFTER"

# Clean up old log files (optional)
LOG_DIR="db_backup/logs"
if [[ -d "$LOG_DIR" ]]; then
    echo ""
    echo "Cleaning up old log files..."
    find "$LOG_DIR" -name "*.log" -type f -mtime +30 -delete
    echo "Old log files removed"
fi

# Show disk usage
echo ""
echo "Current disk usage for backup directory:"
du -sh "$BACKUP_DIR" 2>/dev/null || echo "Could not calculate disk usage"
