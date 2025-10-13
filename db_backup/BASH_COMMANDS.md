# Bash Commands Reference

## Table of Contents
- [Quick Start Commands](#quick-start-commands)
- [Bash Fundamentals](#bash-fundamentals)
- [File & Directory Operations](#file--directory-operations)
- [Text Processing & Search](#text-processing--search)
- [Variables & Arrays](#variables--arrays)
- [Loops & Conditionals](#loops--conditionals)
- [Error Handling & Validation](#error-handling--validation)
- [PostgreSQL Tools](#postgresql-tools)
- [Practical Examples](#practical-examples)
- [Installation Guide](#installation-guide)

## Quick Start Commands

### Essential File Operations
```bash
# Create and manage files
touch script.sh                    # Create empty file
mkdir -p logs/backups              # Create directory structure (-p: create parents if not existing)
chmod +x script.sh                 # Make executable
ls -la *.sh                        # List files with details (-l: long format, -a: all files)

# File management
rm -f old_file.dump                # Remove file (force, no confirmation)
rm -rf old_directory               # Remove directory recursively
tail -f logs/backup.log            # Watch log file live (shows last 10 lines, continues showing new lines)

# File checks
[[ -f "file.txt" ]]                # Check if file exists
[[ -d "directory" ]]               # Check if directory exists
[[ -x "script.sh" ]]               # Check if executable
[[ -r "file.txt" ]]                # Check if readable
[[ -w "file.txt" ]]                # Check if writable
```

### Script Development
```bash
# Test and debug
bash -x script.sh                  # Run with debug output (shows each command)
bash -n script.sh                  # Check syntax without running (-n: no execute)
./script.sh test_input             # Test with custom input

# Clean up
rm -f test_files                   # Remove test files
```

### Scheduling Tasks
```bash
# Cron job management
crontab -l                         # List scheduled tasks
crontab -e                         # Edit scheduled tasks
crontab -r                         # Remove all scheduled tasks

# Cron syntax: minute hour day month dayofweek command
# Examples:
# 0 2 * * * /path/to/script.sh     # Daily at 2 AM
# */15 * * * * /path/to/script.sh  # Every 15 minutes
# 0 */6 * * * /path/to/script.sh   # Every 6 hours
```

## Bash Fundamentals

### Syntax Reference - Similar Looking but Different
```bash
# PARENTHESES () - Command Grouping
(command1; command2)               # Group commands, run in subshell
(crontab -l; echo "new job") | crontab -  # Combine outputs from multiple commands

# DOUBLE PARENTHESES (()) - Arithmetic Evaluation  
((count++))                        # Arithmetic operations only
((result = a + b))                 # Arithmetic assignment
if ((count > 5)); then             # Arithmetic comparison
    echo "Greater than 5"
fi

# SQUARE BRACKETS [] - Simple Test Command (Older)
[ -f "file.txt" ]                  # Simple file test (older syntax)
[ "$var" = "value" ]               # Simple string comparison

# DOUBLE SQUARE BRACKETS [[]] - Enhanced Test (Recommended)
[[ -f "file.txt" ]]                # Enhanced file test (better features)
[[ "$var" == "value" ]]            # Enhanced string comparison
[[ "$var" =~ ^[0-9]+$ ]]           # Regex matching

# DOLLAR PARENTHESES $() - Command Substitution
$(command)                         # Run command, capture output
TIMESTAMP=$(date +%Y%m%d)          # Store command output in variable
echo "Current dir: $(pwd)"         # Use command output inline

# DOLLAR CURLY BRACES ${} - Parameter Expansion
${variable}                        # Same as $variable but safer
${variable:-default}               # Use default if empty
${variable#pattern}                # Remove shortest match from beginning
${variable##pattern}               # Remove longest match from beginning
${variable%pattern}                # Remove shortest match from end
${variable%%pattern}               # Remove longest match from end

# DOLLAR DOUBLE PARENTHESES $(()) - Arithmetic Expansion
$((expression))                    # Calculate math expression, return result
result=$((5 + 3))                  # Result: 8
count=$((count + 1))               # Increment by 1

# QUICK REFERENCE:
# ()   = Command grouping (subshell)
# (())  = Arithmetic evaluation (no $) - used in conditionals
# $()   = Command substitution (run command, get output)
# ${}   = Parameter expansion (manipulate variables)
# $(()) = Arithmetic expansion (calculate math, return result)
# []    = Simple test command (older) - used in conditionals only
# [[]]  = Enhanced test command (recommended) - used in conditionals only
```

### Input/Output Redirection
```bash
command > output.txt               # Redirect stdout to file (overwrites)
command >> output.txt              # Append stdout to file
command 2> error.log               # Redirect stderr to file
command 2>/dev/null                # Hide error messages
command &>/dev/null                # Hide all output
command 2>&1                       # Redirect stderr to stdout
```

## File & Directory Operations

### Finding Files
```bash
# Find files with criteria
find . -name "*.dump" -type f -mtime +30 -delete
# -name: match filename pattern
# -type f: only files (not directories)
# -mtime +30: files older than 30 days
# -delete: remove found files

# Count files
find . -name "*.dump" -type f | wc -l

# Get current directory
pwd                                # Print working directory
PROJECT_DIR=$(pwd)                 # Store current directory in variable
```

### Safe File Processing (Handling Spaces)
```bash
# SAFE: Handle files with spaces
while IFS= read -r -d '' file; do
    echo "Processing: $file"
done < <(find . -name "*.dump" -type f -print0)

# Key concepts:
# < <(...): process substitution - feeds command output to while loop
# -print0: separates filenames with null character (handles spaces)
# -d '': read until null character (matches -print0 delimiter)
# IFS=: empty field separator (preserves leading/trailing spaces)
# -r: treats backslashes literally (doesn't interpret \t as tab, etc.)
# file: variable name to store each filename

# Why this works together:
# find ... -print0  →  outputs: "file1.dump\0my backup file.dump\0another file.dump\0"
# read -d ''        →  reads until null character (\0)
# Result: file = "file1.dump", then "my backup file.dump", then "another file.dump"

# Example with actual filenames:
# If you have files: "backup_2024.dump" and "my important backup.dump"
# find outputs: "backup_2024.dump\0my important backup.dump\0"
# read processes: "backup_2024.dump" (first iteration), "my important backup.dump" (second iteration)
```

## Text Processing & Search

### Text Processing Commands
```bash
# Extract columns
ps aux | awk '{print $2}'          # Get second column
ls -lh | awk '{print $5}'          # Get file size column (-l: long format, -h: human-readable sizes)

# Count lines
wc -l file.txt                     # Count lines in file
find . -name "*.dump" | wc -l      # Count files (pipe find output to wc)
```

### Search and Filter
```bash
# Basic grep
grep "pattern" file.txt            # Find lines with pattern
grep -v "pattern" file.txt         # Find lines WITHOUT pattern (invert match)
grep -q "pattern" file.txt         # Quiet mode (exit code only, no output)
grep -v "^#" file.txt              # Remove comment lines (lines starting with #)

# Regex anchors in grep:
# ^: start of line anchor
# $: end of line anchor
grep "^# " file.txt                # Lines starting with "# "
grep "error$" file.txt             # Lines ending with "error"
grep "^$" file.txt                 # Empty lines (start and end with nothing)

# Understanding grep "^$" :
# ^$ means: start of line immediately followed by end of line
# This matches lines with NO content (empty lines)
# Example file content:
#   line 1
#   
#   line 3
# grep "^$" would output: (just the empty line between line 1 and line 3)
```

## Variables & Arrays

### Variable Operations
```bash
# Command substitution vs Parameter expansion
TIMESTAMP=$(date +"%Y%m%d")        # $(): command substitution (runs command, captures output)
VALUE=${1:-"default"}              # ${}: parameter expansion (manipulates variables)

# Parameter expansion examples
BASENAME=${FILE%.dump}             # Remove file extension (% removes shortest match from end)
FILENAME=${FILE##*/}               # Remove directory path (## removes longest match from start)
USERNAME=${DATABASE_USERNAME:-}    # Use variable or empty string if not set

# How to use parameter expansion (not standalone commands):
filename="/path/to/file.txt"
echo "${filename}"                 # Output: /path/to/file.txt
echo "${filename:-backup.txt}"     # Output: /path/to/file.txt (since filename is set)
echo "${filename#*/}"              # Output: path/to/file.txt (remove shortest match from start)
echo "${filename##*/}"             # Output: file.txt (remove longest match from start)
echo "${filename%.txt}"            # Output: /path/to/file (remove shortest match from end)
echo "${filename%%.txt}"           # Output: /path/to/file (remove longest match from end)

# Common usage patterns:
BACKUP_DIR=${1:-"backups"}         # Use first argument or default to "backups"
BASENAME=${FILE%.dump}             # Remove .dump extension
FILENAME=${FILE##*/}               # Get just filename from full path
```

### Arrays
```bash
# Arrays
TOOLS=("pg_dump" "pg_restore" "psql")  # Create array
echo "${TOOLS[0]}"                 # Access first element: "pg_dump"
echo "${TOOLS[@]}"                 # Access all elements: "pg_dump pg_restore psql"
echo "${#TOOLS[@]}"                # Array length: 3

# Loop through array
for tool in "${TOOLS[@]}"; do
    echo "Checking $tool"
done
```

### Date Formatting
```bash
# Date formatting
date +"%F_%H%M%S"                  # Format: YYYY-MM-DD_HHMMSS
# %F: full date (YYYY-MM-DD), %H: hour, %M: minute, %S: second
```

### Arithmetic Operations
```bash
# Basic arithmetic
DELETED_COUNT=0                    # Initialize counter
((DELETED_COUNT++))                # Increment (no $ needed inside (( )))
DELETED_COUNT=$((DELETED_COUNT + 1))  # Same as above, but assigns result
DELETED_COUNT=$((DELETED_COUNT + 5))  # Add 5 to counter

# Alternative syntax (both work):
DELETED_COUNT=$((DELETED_COUNT + 1))  # Standard arithmetic expansion
((DELETED_COUNT = DELETED_COUNT + 1)) # Arithmetic evaluation (no $ needed)

# Calculate differences
FILES_BEFORE=10
FILES_AFTER=7
DELETED=$((FILES_BEFORE - FILES_AFTER))  # Result: 3
```

### IFS (Internal Field Separator)
```bash
# Default IFS (splits on spaces/tabs/newlines)
IFS=$' \t\n'

# Empty IFS (preserves everything as one word)
IFS=

# Example difference:
text="  hello world  "
# Default IFS: splits into "hello" and "world"
# Empty IFS: keeps as "  hello world  "
```

## Loops & Conditionals

### Conditional Statements
```bash
# Basic structure - different ways to write conditions
if [[ condition ]]; then
    # commands if true
else
    # commands if false
fi

# Different types of conditions:

# 1. Test commands with [[]] (recommended)
if [[ -z "$VARIABLE" ]]; then      # Check if empty or not set
if [[ -n "$VARIABLE" ]]; then      # Check if not empty
if [[ -f "file.txt" ]]; then       # Check if file exists
if [[ -d "directory" ]]; then      # Check if directory exists
if [[ ! -d "$BACKUP_DIR" ]]; then  # Check if directory does NOT exist (! negates)

# 2. Test commands with [] (older syntax)
if [ -z "$VARIABLE" ]; then        # Same as above, but older syntax
if [ -f "file.txt" ]; then         # Same as above, but older syntax

# 3. Command exit codes (no brackets needed)
if command; then                   # If command succeeds (exit code 0)
    echo "Command succeeded"
fi

if grep "pattern" file.txt; then   # If grep finds pattern
    echo "Pattern found"
fi

# 4. Arithmetic conditions with (())
if ((count > 5)); then             # Arithmetic comparison (no brackets)
    echo "Count is greater than 5"
fi

# 5. String comparisons
if [[ "$var" == "value" ]]; then   # String comparison with [[]]
if [ "$var" = "value" ]; then      # String comparison with [] (single =)

# 6. Logical operators
if [[ -f "file.txt" && -r "file.txt" ]]; then    # AND (both must be true)
if [[ -f "file.txt" || -f "backup.txt" ]]; then  # OR (at least one true)
if [[ ! -f "file.txt" ]]; then                   # NOT (condition is false)
```

### Loop Variations
```bash
# 1. Test conditions with [[]]
while [[ $count -lt 10 ]]; do
    echo "Count: $count"
    ((count++))
done

# 2. Command-based conditions
while read -r line; do             # While read command succeeds
    echo "Processing: $line"
done < file.txt

# 3. Arithmetic conditions with (())
while ((count < 10)); do           # Arithmetic comparison (no brackets)
    echo "Count: $count"
    ((count++))
done

# 4. Command exit codes
while command_that_might_fail; do  # While command succeeds
    echo "Command is still working"
done
```

### Input Reading
```bash
# Read from file
while read -r line; do
    echo "Processing: $line"
done < file.txt

# Read from keyboard (interactive)
while read -r line; do
    echo "You typed: $line"
done
# Press Ctrl+D to exit

# Read with prompt
read -p "Enter name: " name         # -p: shows prompt before reading
read -s password                    # -s: silent input (for passwords, doesn't echo)
read -r input                       # -r: treats backslashes literally
```

## Error Handling & Validation

### Error Handling
```bash
set -e                             # Exit on any error
set -u                             # Exit on undefined variables
set -o pipefail                    # Exit if any command in pipeline fails
set -euo pipefail                  # Combined: all error handling options

# Check command success
if command; then
    echo "Success"
else
    echo "Failed (exit code: $?)"
fi

# Check exit code after command
command
if [[ $? -eq 0 ]]; then
    echo "Command succeeded"
fi
```

### Command Validation
```bash
# Check if command exists
command -v pg_dump &> /dev/null    # Silent check (better than which)
which pg_dump                      # Show path or nothing (less reliable)

# Get command version
PG_VERSION=$(pg_dump --version)    # Get version string
echo "PostgreSQL version: $PG_VERSION"
```

## PostgreSQL Tools

### Backup Commands
```bash
# Create backup
pg_dump "$PG_DATABASE_URL" --format=custom --no-owner --file=backup.dump
# --format=custom: binary format (compressed, fast)
# --no-owner: skip ownership info (prevents permission conflicts)

# Restore backup
pg_restore --clean --if-exists --no-owner --no-privileges --dbname="$PG_DATABASE_URL" backup.dump
# --clean: drop objects before recreating
# --if-exists: only drop if objects exist
# --no-owner: skip ownership restoration
# --no-privileges: skip privilege statements (cloud-friendly)
```

### Connection Testing
```bash
# Test connection
pg_dump "$PG_DATABASE_URL" --format=custom --no-owner --file=test.dump

# Check versions
pg_dump --version
pg_restore --version
psql --version
```

## Practical Examples

### Script Error Handling Pattern
```bash
#!/usr/bin/env bash
set -euo pipefail

# Check if required tools exist
if ! command -v pg_dump &> /dev/null; then
    echo "ERROR: pg_dump not found"
    exit 1
fi

# Check if required variables are set
if [[ -z "${PG_DATABASE_URL:-}" ]]; then
    echo "ERROR: PG_DATABASE_URL not set"
    exit 1
fi

# Your script logic here...
```

### File Processing with Counters
```bash
# Count files before and after operation
FILES_BEFORE=$(find . -name "*.dump" -type f | wc -l)
echo "Found $FILES_BEFORE backup files"

# Process files
DELETED_COUNT=0
while IFS= read -r -d '' file; do
    echo "Processing: $(basename "$file")"
    rm "$file"
    ((DELETED_COUNT++))
done < <(find . -name "*.dump" -type f -mtime +30 -print0)

FILES_AFTER=$(find . -name "*.dump" -type f | wc -l)
echo "Files deleted: $DELETED_COUNT"
echo "Files remaining: $FILES_AFTER"
```

### Interactive User Input
```bash
# Ask for confirmation
echo "Do you want to continue? (y/N)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "Continuing..."
else
    echo "Cancelled"
    exit 0
fi

# Regex matching explained:
# =~ : regex match operator (matches pattern against string)
# ^[Yy]$ : regex pattern meaning:
#   ^ : start of string
#   [Yy] : character class (matches Y or y)
#   $ : end of string
# Result: matches only "y" or "Y" (nothing else)

# Regex quantifiers:
# ^[Yy]+$ : matches one or more Y/y characters
#   + : one or more of the preceding character
#   Examples: "y", "Y", "yy", "YY", "yY" (but NOT "yes" or "YESS")
# ^[Yy]?$ : matches zero or one Y/y character  
#   ? : zero or one (optional)
#   Examples: "", "y", "Y"
# ^[Yy]*$ : matches zero or more Y/y characters
#   * : zero or more of the preceding character
#   Examples: "", "y", "Y", "yy", "YY", "yY"
# ^[Yy]{2}$ : matches exactly 2 Y/y characters
#   {n} : exactly n times
#   Examples: "yy", "YY", "yY", "Yy"

# Wait with timeout
echo "Press Ctrl+C within 5 seconds to cancel..."
sleep 5
```

### OS Detection
```bash
# Detect operating system
OS=$(uname -s)
if [[ "$OS" == "Linux" ]] || [[ "$OS" == "Darwin" ]]; then
    echo "macOS/Linux detected"
    # Use export for environment variables
    export VARIABLE="value"
elif [[ "$OS" == *'NT'* ]]; then
    echo "Windows detected"
    # Use set for environment variables
    set VARIABLE="value"
fi
```

### Cron Job Management
```bash
# Check if cron job exists
if crontab -l 2>/dev/null | grep -q "backup_script.sh"; then
    echo "Backup cron job already exists"
else
    echo "No backup cron job found"
fi

# Add cron job safely
(crontab -l 2>/dev/null; echo "0 2 * * * /path/to/script.sh") | crontab -

# Breaking down the complex command:
# (crontab -l 2>/dev/null; echo "0 2 * * * /path/to/script.sh") | crontab -
# 
# Step by step:
# 1. crontab -l 2>/dev/null  →  get current cron jobs (hide errors)
# 2. echo "0 2 * * * /path/to/script.sh"  →  add our new job
# 3. (command1; command2)  →  run both commands, output both results
# 4. | crontab -  →  pipe combined output to crontab (install new crontab)
# Result: preserves existing jobs and adds new one

# * * * * * command
# │ │ │ │ │
# │ │ │ │ └─── Day of week (0-7, 0 and 7 = Sunday)
# │ │ │ └───── Month (1-12)
# │ │ └─────── Day of month (1-31)
# │ └───────── Hour (0-23)
# └─────────── Minute (0-59)
```

## Installation Guide

### macOS (Homebrew)
```bash
# Install PostgreSQL client tools
brew install postgresql@17
# OR just client tools:
brew install libpq
brew link --force libpq

# Verify installation
which pg_dump
pg_dump --version
```

### Windows
```bash
# Download from https://www.postgresql.org/download/windows/
# During installation, select ONLY 'Command Line Tools'
```

### Linux (Ubuntu/Debian)
```bash
# Install PostgreSQL client tools
sudo apt-get update
sudo apt-get install postgresql-client

# OR full PostgreSQL
sudo apt-get install postgresql postgresql-contrib
```