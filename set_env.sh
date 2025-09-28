#!/bin/bash

#----- IMPORTANT -----#
# Replace the Configuration Placeholders with actual values (provided by me (Team Lead) and/or neon db website)

# Might need to set execution perms before running script:
#   chmod +x setup_env.sh

# To run script, from root:
#   source set_env.sh

# To run backend, from root:
#   cd backend/ && ./mvnw spring-boot:run 
#----- IMPORTANT -----#

# Neon PostgreSQL Database Configuration
DB_URL='jdbc:postgresql://ep-curly-paper-a8l0pvuw-pooler.eastus2.azure.neon.tech/neondb?user=neondb_owner&password=npg_a5O0zTSCeAVF&sslmode=require&channelBinding=require'
DB_USERNAME=neondb_owner
DB_PASSWORD=npg_a5O0zTSCeAVF

# JWT Configuration for authentication
JWT_SECRET=Na04FW7TJzOq9rAnDFHGQeR78rhMBGuiatUoI+00lRc=
# JWT Access Expiration: 30 minutes
JWT_ACCESS_TOKEN_EXPIRATION=1800000
# JWT Refresh Expiration: 14 days
JWT_REFRESH_TOKEN_EXPIRATION=1209600000

# Frontend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080

# Check and save operating system (Darwin (Mac) or Linux or NT... (New Technology Windows))
OS=$(uname -s)

if [[ "$OS" == "Linux" ]] || [[ "$OS" == "Darwin" ]]; then
    echo "Detected macOS/Linux. Using 'export'..."
    export DATABASE_URL="$DB_URL"
    export DATABASE_USERNAME="$DB_USERNAME"
    export DATABASE_PASSWORD="$DB_PASSWORD"
    export JWT_SECRET="$JWT_SECRET"
    export JWT_ACCESS_TOKEN_EXPIRATION="$JWT_ACCESS_TOKEN_EXPIRATION"
    export JWT_REFRESH_TOKEN_EXPIRATION="$JWT_REFRESH_TOKEN_EXPIRATION"
    export NEXT_PUBLIC_API_BASE_URL="$NEXT_PUBLIC_API_URL"
    
    echo "DATABASE_URL is: $DB_URL"
    echo "DATABASE_USERNAME is: $DB_USERNAME"
    echo "DATABASE_PASSWORD is: $DB_PASSWORD"
    echo "JWT_SECRET is: Na04FW7TJzOq9rAnDFHGQeR78rhMBGuiatUoI+00lRc="
    echo "JWT_ACCESS_TOKEN_EXPIRATION is: 1800000"
    echo "JWT_REFRESH_TOKEN_EXPIRATION is: 1209600000"
    echo "NEXT_PUBLIC_API_URL is: $NEXT_PUBLIC_API_URL"
    
elif [[ "$OS" == *'NT'* ]]; then
    echo "Detected Windows (Git Bash). Using 'set'..."
    set DATABASE_URL="$DB_URL"
    set DATABASE_USERNAME="$DB_USERNAME"
    set DATABASE_PASSWORD="$DB_PASSWORD"
    set JWT_SECRET="$JWT_SECRET"
    set JWT_ACCESS_TOKEN_EXPIRATION="$JWT_ACCESS_TOKEN_EXPIRATION"
    set JWT_REFRESH_TOKEN_EXPIRATION="$JWT_REFRESH_TOKEN_EXPIRATION"
    set NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL"
    
    echo "DATABASE_URL is: $DATABASE_URL"
    echo "DATABASE_USERNAME is: $DATABASE_USERNAME"
    echo "DATABASE_PASSWORD is: $DATABASE_PASSWORD"
    echo "JWT_SECRET is: Na04FW7TJzOq9rAnDFHGQeR78rhMBGuiatUoI+00lRc="
    echo "JWT_ACCESS_TOKEN_EXPIRATION is: 1800000"
    echo "JWT_REFRESH_TOKEN_EXPIRATION is: 1209600000"
    echo "NEXT_PUBLIC_API_URL is: $NEXT_PUBLIC_API_URL"

else
    echo "IDK what wonky system this is... please set variables manually."
    echo "For Windows Command Prompt, use: set DATABASE_URL=..."
    echo "For Mac/Linux, use: export DATABASE_URL=..."
fi