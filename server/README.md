# Getting Started with the server for the mental health tracker

In the project ./server/ directory, you can run:

### `clear && node index.js`

Runs the server the default port 3000.
Open [http://localhost:3000/api](http://localhost:3000/api) to view it in your browser.

To change the port of the server run:

### `clear && PORT=3001 node index.js`

It is reccomended to use port 3001 so that the react client can run on port 3000. 
If both the server and client run on the same port there is going to be an error.

## Server does not work with the browser

The server has been designed to work the client, not with the browser.
You can use the program "POSTMAN" to function as an alternative client for development and testing purposes.

To see all the available routes and API calls for the server go to APIrouter.js (routes) and mockAPI.js (functions).

### NOTE: Because there is no official database yet. All non hard coded user data will be lost when the server restarts.

