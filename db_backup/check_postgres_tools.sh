#!/usr/bin/env bash

# PostgreSQL Tools Check Script
#
# - Checks if PostgreSQL client tools (pg_dump, pg_restore) are installed
# - Provides installation instructions if they're missing
# - Works on both Mac and Windows (with Git Bash/WSL)

echo "SCRIPT: Checking PostgreSQL client tools installed..."

# Check if pg_dump is available
if command -v pg_dump &> /dev/null; then
  echo "pg_dump found: $(which pg_dump)"
  PG_DUMP_VERSION=$(pg_dump --version)
  echo "   Version: $PG_DUMP_VERSION"
else
  echo "pg_dump not found"
fi

# Check if pg_restore is available
if command -v pg_restore &> /dev/null; then
  echo "pg_restore found: $(which pg_restore)"
  PG_RESTORE_VERSION=$(pg_restore --version)
  echo "   Version: $PG_RESTORE_VERSION"
else
  echo "pg_restore not found"
fi

# Check if psql is available (bonus check)
if command -v psql &> /dev/null; then
  echo "psql found: $(which psql)"
  PSQL_VERSION=$(psql --version)
  echo "   Version: $PSQL_VERSION"
else
  echo "psql not found (optional, but useful for testing connections)"
fi

echo ""

# If any tools are missing, show installation instructions
if ! command -v pg_dump &> /dev/null || ! command -v pg_restore &> /dev/null; then
  echo "Installation Instructions:"
  echo ""
  
  # Detect operating system
  if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Mac detected:"
    echo "   brew install postgresql@17"
    echo "   # OR for just client tools:"
    echo "   brew install libpq"
    echo "   brew link --force libpq"
  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    echo "Windows detected (Git Bash/Cygwin):"
    echo "   Download from: https://www.postgresql.org/download/windows/"
    echo "   During installation, select ONLY 'Command Line Tools'"
  else
    echo "Linux detected:"
    echo "   sudo apt-get install postgresql-client  # Ubuntu/Debian"
    echo "   sudo yum install postgresql  # CentOS/RHEL"
  fi
  
  echo ""
  echo "After installation, run this script again to verify."
else
  echo "All PostgreSQL client tools are installed and ready!"
  echo ""
  echo "You can now use the backup scripts:"
  echo "  ./db_backup/backup_postgres.sh []"
  echo "  ./db_backup/restore_postgres.sh"
  echo "  ./db_backup/setup_daily_backup.sh"
  echo "  ./db_backup/cleanup_backups.sh"
fi
