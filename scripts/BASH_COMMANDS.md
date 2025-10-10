# Bash Commands Reference - Script Development

## Table of Contents
- [Script Development Commands](#script-development-commands)
  - [File Creation and Permissions](#file-creation-and-permissions)
  - [Script Testing and Debugging](#script-testing-and-debugging)
  - [PostgreSQL Backup Testing](#postgresql-backup-testing)
  - [Cron Job Management](#cron-job-management)
  - [Directory and File Operations](#directory-and-file-operations)
  - [Script Testing and Cleanup](#script-testing-and-cleanup)
- [Bash Concepts Used in Scripts](#bash-concepts-used-in-scripts)
  - [Conditional Statements (if/then/else)](#conditional-statements-ifthenelse)
  - [File and Directory Checks](#file-and-directory-checks)
  - [Variable Operations](#variable-operations)
  - [Error Handling](#error-handling)
- [PostgreSQL Installation Commands](#postgresql-installation-commands)

## Script Development Commands

### File Creation and Permissions
```bash
# Create script files
touch scripts/backup_postgres.sh scripts/restore_postgres.sh scripts/setup_daily_backup.sh scripts/check_postgres_tools.sh
# touch: creates empty files if they don't exist, updates timestamp if they do

# Make scripts executable
chmod +x scripts/*.sh
# chmod: changes file permissions
# +x: adds execute permission (allows running the script)
# *.sh: wildcard matching all files ending in .sh
```

### Script Testing and Debugging
```bash
# Test script syntax without running it
bash -n scripts/backup_postgres.sh
# -n: "no execute" flag - checks syntax without running the script

# Run script with debug output
bash -x scripts/backup_postgres.sh
# -x: "debug" flag - shows each command as it's executed (helpful for troubleshooting)
```

### PostgreSQL Backup Testing
```bash
# Test pg_dump connection
pg_dump "$DATABASE_URL" --format=custom --no-owner --file=test_backup.dump
# pg_dump: PostgreSQL backup utility
# "$DATABASE_URL": double quotes preserve variable value, handle spaces in connection string
# --format=custom: creates compressed binary format (faster, smaller files)
# --no-owner: doesn't include ownership information (avoids permission issues)
# --file=test_backup.dump: specifies output filename

# Test pg_restore
pg_restore --clean --if-exists --no-owner --dbname="$DATABASE_URL" test_backup.dump
# pg_restore: PostgreSQL restore utility
# --clean: drops objects before recreating them (clean slate)
# --if-exists: only drop objects if they exist (prevents errors)
# --no-owner: doesn't restore ownership information
# --dbname="$DATABASE_URL": target database connection string
```

### Cron Job Management
```bash
# Check cron job syntax
crontab -l
# crontab: manages scheduled tasks
# -l: "list" - shows current cron jobs

# Edit cron jobs
crontab -e
# -e: "edit" - opens cron jobs in default editor

# Test cron job manually
0 2 * * * /path/to/script.sh
# Cron syntax: minute hour day month dayofweek command
# 0 2 * * *: runs at 2:00 AM every day
# * means "any value" for that field
```

### Directory and File Operations
```bash
# Create logs directory
mkdir -p logs
# mkdir: creates directories
# -p: "parents" - creates parent directories if they don't exist

# Monitor log file in real-time
tail -f logs/backup.log
# tail: shows last lines of a file
# -f: "follow" - continues watching file for new content (like live streaming)

# Check script permissions
ls -la scripts/*.sh
# ls: lists files and directories
# -l: "long format" - shows detailed info (permissions, size, date)
# -a: "all" - shows hidden files too
# *.sh: wildcard for all .sh files
```

### Script Testing and Cleanup
```bash
# Test script error handling
./scripts/backup_postgres.sh nonexistent_folder
# ./: runs script from current directory
# nonexistent_folder: tests what happens when script gets invalid input

# Verify script works with custom folder
./scripts/backup_postgres.sh test_backups
# test_backups: custom backup folder name to test script flexibility

# Clean up test files
rm -f test_backup.dump
rm -rf test_backups
# rm: removes files/directories
# -f: "force" - doesn't prompt for confirmation
# -r: "recursive" - removes directories and their contents
```

## Bash Concepts Used in Scripts

### Conditional Statements (if/then/else)
```bash
# Basic if statement structure
if [[ condition ]]; then
    # commands to run if condition is true
else
    # commands to run if condition is false
fi

# Example from backup script
if [[ -z "$DATABASE_URL" ]]; then
    echo "Error: DATABASE_URL not set"
    exit 1
fi
# [[ ]] : double brackets for advanced conditionals (better than single [ ])
# -z : checks if variable is empty or zero-length
# $DATABASE_URL : variable substitution (gets the value of DATABASE_URL)
# exit 1 : exits script with error code 1 (indicates failure)
```

### File and Directory Checks
```bash
# Check if directory exists
if [[ -d "backups" ]]; then
    echo "Directory exists"
fi
# -d : checks if path is a directory

# Check if file exists
if [[ -f "backup.dump" ]]; then
    echo "File exists"
fi
# -f : checks if path is a regular file

# Check if path exists (file or directory)
if [[ -e "some_path" ]]; then
    echo "Path exists"
fi
# -e : checks if path exists (any type)
```

### Variable Operations
```bash
# Get command line argument
BACKUP_DIR=${1:-"backups"}
# ${1:-"backups"} : uses first argument ($1) or defaults to "backups" if empty
# This is called "parameter expansion with default value"

# Create timestamp
TIMESTAMP=$(date +"%Y-%m-%d_%H%M%S")
# $(command) : command substitution - runs command and uses its output
# date +"%Y-%m-%d_%H%M%S" : formats date as YYYY-MM-DD_HHMMSS

# Check if variable is set
if [[ -n "$BACKUP_DIR" ]]; then
    echo "Backup directory: $BACKUP_DIR"
fi
# -n : checks if variable is NOT empty (opposite of -z)
```

### Error Handling
```bash
# Exit on any error
set -e
# set -e : makes script exit immediately if any command fails

# Exit on undefined variables
set -u
# set -u : makes script exit if trying to use undefined variables

# Combined: exit on errors and undefined variables
set -eu

# Check if last command succeeded
if command_that_might_fail; then
    echo "Command succeeded"
else
    echo "Command failed"
fi
# $? : exit code of last command (0 = success, non-zero = failure)
```

## PostgreSQL Installation Commands
```bash
# Mac - Install PostgreSQL client tools
brew install postgresql@17
# brew : package manager for macOS
# postgresql@17 : installs PostgreSQL version 17

# Mac - Install just client tools
brew install libpq
brew link --force libpq
# libpq : PostgreSQL client library (includes pg_dump, pg_restore, psql)
# --force : overwrites existing links

# Check if pg_dump is installed
which pg_dump
# which : shows full path to command (or nothing if not found)

# Check PostgreSQL version
pg_dump --version
pg_restore --version
psql --version
# --version : shows version information for each tool
```