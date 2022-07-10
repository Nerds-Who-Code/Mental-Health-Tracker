//Imports
const express = require('express');
var cors = require('cors') //Allow CORS

/*
  ExpressJS Server File
*/

//Initialize expressJS
const app = express();
//Initialize express router
const router = express.Router();

//You can set the environment variable PORT to tell your web server what port to listen on.
//Initialize the port with the bash command: PORT=YourPortNumberHere node index.js 
//for example PORT=4555 node index.js  
//If no port is set e.g. node index.js then port 3000 will be used by default
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//You can set the environment variable DEVMODE to either false or true. It defaults to false if its not set.
//Initialize the DEVMODE with the bash command: DEVMODE=true node index.js 
var isDevelopmentMode = process.env.DEVMODE || false;

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Give a warning when port is 3000 (default port)
// Some hosting services like Amazon return an error when port is 3000 
function defaultPortWarning() {
	if (port === 3000) {
		return `Warning: The set port is the default port: ${port}. This may cause errors in non-local deployments.`  
	}
	return "Success: The set port is not the default port.";
}

// =================================================================

//Enable All CORS Requests
app.use(cors());

//For parsing application/json
app.use(express.json());

//Import and mount the API Router
const APIrouter = require("./APIrouter.js");

//All routes will go to URL:PORT/api 
app.use("/api", APIrouter);

// =================================================================

//Start server
app.listen(port, () => {
    console.log("============");
    console.log(`Starting server...`);
    console.log(`${defaultPortWarning()}`);
    console.log(`ExpressJS server started...`);
    console.log(`Development mode: ${isDevelopmentMode}`);
    console.log(`Listening on "http://localhost" on port: ${port}...`)
    console.log("------------"); 
    console.log(`Use CTRL+C to stop the server...`);
  });

module.exports = router;

