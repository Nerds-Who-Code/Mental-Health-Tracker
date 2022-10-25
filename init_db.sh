#! /bin/bash

# This script creates the feelsify database, including tables, and a test user with test entries

echo "Opening PostGreSQL... Initializing database..."
psql -U postgres --echo-queries --file='./server/db_init.sql'
echo "Database initilization done."
