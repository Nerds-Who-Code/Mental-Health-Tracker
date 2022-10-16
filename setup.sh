#! /bin/bash

# This script sets up the app. Installs all node modules and creates a database

# Set file permissions
chmod u+x init_db.sh
chmod u+x install-node-modules.sh

echo "Setting up the app..."

# Create database
./init_db.sh
# Install modules
./install-node-modules.sh

echo "Set up complete."
