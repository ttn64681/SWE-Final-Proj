#!/bin/bash

# Set environment variables for Neon database
export DATABASE_URL="postgresql://neondb_owner:npg_a5O0zTSCeAVF@ep-curly-paper-a8l0pvuw-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
export DB_USERNAME="neondb_owner"
export DB_PASSWORD="npg_a5O0zTSCeAVF"

# Start the Spring Boot application
mvn spring-boot:run

