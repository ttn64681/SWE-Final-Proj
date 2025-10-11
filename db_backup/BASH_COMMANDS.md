# Bash Commands Reference - For Dev/Learning Purposes

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
  - [Command Checking and Validation](#command-checking-and-validation)
  - [Text Processing Commands](#text-processing-commands)
  - [File Operations with Flags](#file-operations-with-flags)
  - [Numeric Comparisons](#numeric-comparisons)
  - [Logical Operators](#logical-operators)
  - [Advanced Variable Operations](#advanced-variable-operations)
  - [Input/Output Redirection](#inputoutput-redirection)
  - [Input Reading](#input-reading)
  - [Cron Job Management](#cron-job-management)
- [PostgreSQL Installation Commands](#postgresql-installation-commands)

## Script Development Commands

### File Creation and Permissions
```bash
# Create script files
touch db_backup/backup_postgres.sh db_backup/restore_postgres.sh db_backup/setup_daily_backup.sh db_backup/check_postgres_tools.sh db_backup/cleanup_backups.sh
# touch: creates empty files if they don't exist, updates timestamp if they do

# Make scripts executable
chmod +x db_backup/*.sh
# chmod: changes file permissions
# +x: adds execute permission (allows running the script)
# *.sh: wildcard matching all files ending in .sh
```

### Script Testing and Debugging
```bash
# Test script syntax without running it
bash -n db_backup/backup_postgres.sh
# -n: "no execute" flag - checks syntax without running the script

# Run script with debug output
bash -x db_backup/backup_postgres.sh
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
ls -la db_backup/*.sh
# ls: lists files and directories
# -l: "long format" - shows detailed info (permissions, size, date)
# -a: "all" - shows hidden files too
# *.sh: wildcard for all .sh files
```

### Script Testing and Cleanup
```bash
# Test script error handling
./db_backup/backup_postgres.sh nonexistent_folder
# ./: runs script from current directory
# nonexistent_folder: tests what happens when script gets invalid input

# Verify script works with custom folder
./db_backup/backup_postgres.sh test_backups
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
# $? : exit code of last command ($? -> 0 = success, non-zero = failure)
# $? : 1 - General error, 126 - Command found but not executable
# $? : 127 - Command not found, 128 - Invalid exit argument
```

### Command Checking and Validation
```bash
# Check if command exists
if command -v pg_dump &> /dev/null; then
    echo "pg_dump is installed"
fi
# command -v : checks if a command exists in PATH
# &> /dev/null : redirects both stdout and stderr to /dev/null (silences output)

# Check if command exists (alternative)
which pg_dump
# which : shows full path to command or nothing if not found

# Check if file is executable
if [[ -x "script.sh" ]]; then
    echo "Script is executable"
fi
# -x : checks if file has execute permission
```

### Text Processing Commands
```bash
# Extract specific column from output
ps aux | awk '{print $2}'
# awk : text processing tool for extracting/manipulating columns
# {print $2} : prints the second column (space-separated)

# Search for lines that DON'T match pattern
grep -v "pattern" file.txt
# grep -v : "invert match" - shows lines that DON'T contain the pattern

# Search quietly (no output, just exit code)
grep -q "pattern" file.txt
# grep -q : "quiet" mode - only returns exit code (0=found, 1=not found)

# Count lines in file
wc -l file.txt
# wc -l : word count with line count
```

### File Operations with Flags
```bash
# List files with human-readable sizes and details
ls -lh
# ls -l : long format (permissions, size, date)
# ls -h : human-readable sizes (KB, MB, GB instead of bytes)

# List files with sizes
ls -l
# Shows file sizes in bytes

# List all files including hidden
ls -la
# -a : shows all files including hidden ones (starting with .)
```

### Numeric Comparisons
```bash
# Check if numbers are equal
if [[ $count -eq 5 ]]; then
    echo "Count equals 5"
fi
# -eq : equals (for numbers)
# -ne : not equals
# -lt : less than
# -le : less than or equal
# -gt : greater than
# -ge : greater than or equal

# String vs numeric comparison
if [[ $count == 5 ]]; then
    echo "String comparison"
fi
# == : string comparison
# -eq : numeric comparison
```

### Logical Operators
```bash
# Logical NOT
if [[ ! -f "file.txt" ]]; then
    echo "File does not exist"
fi
# ! : logical NOT operator

# Logical AND
if [[ -f "file.txt" && -r "file.txt" ]]; then
    echo "File exists AND is readable"
fi
# && : logical AND

# Logical OR
if [[ -f "file.txt" || -f "backup.txt" ]]; then
    echo "At least one file exists"
fi
# || : logical OR
```

### Advanced Variable Operations
```bash
# Parameter expansion with default value
BACKUP_DIR=${1:-"backups"}
# ${1:-"backups"} : uses $1 if set, otherwise defaults to "backups"

# Parameter expansion with substring
TIMESTAMP=${BACKUP_FILE:0:10}
# ${var:start:length} : extracts substring from position 0, length 10 

# Remove file extension
BASENAME=${FILE%.dump}
# ${var%pattern} : removes shortest match of pattern from end

# Remove directory path
FILENAME=${FILE##*/}
# ${var##pattern} : removes longest match of pattern from beginning
```

### Input/Output Redirection
```bash
# Redirect stderr to /dev/null (hide errors)
command 2>/dev/null
# 2> : redirects stderr (file descriptor 2)
# /dev/null : discards output (black hole)

# Redirect stdout and stderr to /dev/null
command &>/dev/null
# &> : redirects both stdout and stderr

# Redirect stderr to stdout
command 2>&1
# 2>&1 : redirects stderr (2) to stdout (1)

# Redirect stdout to file
command > output.txt
# > : redirects stdout to file (overwrites)

# Append stdout to file
command >> output.txt
# >> : redirects stdout to file (appends)
```

### Input Reading
```bash
# Read line from input
read -r line
# read : reads input from user or file
# -r : treats backslashes literally (doesn't interpret escape sequences)

# Read with prompt
read -p "Enter name: " name
# -p : displays prompt before reading

# Read password (hidden)
read -s password
# -s : silent mode (doesn't echo input, for passwords)
```

### Cron Job Management
```bash
# List current cron jobs
crontab -l
# crontab : manages scheduled tasks
# -l : list current cron jobs

# Edit cron jobs
crontab -e
# -e : edit cron jobs in default editor

# Remove all cron jobs
crontab -r
# -r : remove all cron jobs

# Cron syntax: minute hour day month dayofweek command
# 0 2 * * * : runs at 2:00 AM every day
# */15 * * * * : runs every 15 minutes
# 0 */6 * * * : runs every 6 hours
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
# which : shows full path to command

# Check PostgreSQL version
pg_dump --version
pg_restore --version
psql --version
```