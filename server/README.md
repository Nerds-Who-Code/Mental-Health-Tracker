# Getting Started with the server for Feelsify

In the project ./server/ directory, you can run:

### `clear && node index.js`
or
### `npm start`
or
### `./start_server.sh`
You may first need to make the bash script executable with the command `chmod u+x start_server.sh`

Runs the server the default port 3001.
Open [http://localhost:3001/api](http://localhost:3001/api) to view it in your browser.

To change the port of the server edit the .env file.

### Set up the PostGreSQL database for the server

If you its your first time you need to create a PSQL database first called 'feelsifyDB'.
You can change the PSQL connection info in .env 
After creating the database you need to run the db_init.sql script in PSQL for create the tables for the database.

## Server does not work with the browser

The server has been designed to work the client, not with the browser.
You can use the program "POSTMAN" to function as an alternative client for development and testing purposes.