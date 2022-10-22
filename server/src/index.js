/*
  ExpressJS Server initialization file
*/

//Imports
const express = require('express');
//Middlewares
const loadDefaultMiddlewares = require('./middlewares/defaultMiddlewares.js');
const logging = require("./middlewares/logging.js");
const userAuthenthication = require("./middlewares/userAuthenthication.js");
const rateLimiter = require('./middlewares/rateLimiter.js');
const loadRouters = require('./middlewares/routes.js');
//Load the .env config file
require('dotenv').config(); 
//Import connection for PostGreSQL
const pool = require("./db_connection.js");

// =================================================================

// SERVER SETUP AND CONFIG

//Set base url
var BASE_URL = process.env.BASE_URL || "http://localhost";

// =================================================================

//Initialize expressJS
const app = express();
//Number of proxies between express server and the client
//This is to make the rate limiter ignore proxy requests
app.set('trust proxy', 1);

//You can set the environment variable PORT to tell your web server what port to listen on.
//If no port is set e.g. node index.js then port 3000 will be used by default
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Normalize a port into a number, string, or false.
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
	return "Server success: The set port is not the default port.";
}

// =================================================================

// LOAD MIDDLEWARES
loadDefaultMiddlewares(app);
logging(app);
userAuthenthication(app, pool);
rateLimiter(app);
loadRouters(app);

//Basic server response test
app.all('/test', async (req, res, next) => {
  console.log("Received test.");
  try
  {
      console.log('session?');
      console.log(req.session);
      return res.status(200).send("Test success from IP: " + req.ip);
  }
  catch (error)
  {
      console.log("Test failed.");
      console.log("500: Internal server error - " + error.message);
      res.status(500).send(error.message);
  }
});

// =================================================================

//Start server
app.listen(port, async () => {
    console.log("============");
    console.log(`Starting the Feelsify server...`);
    console.log("Testing the PostGreSQL database connection...");

    let test = await pool.query(
      `
      SELECT NOW() 
      `);

    if (!test || !test.rows || !test.rows.length ) {
      let err = new Error(`Error: Database connection failed.`);
      console.log(err);
    }
    else {
      console.log(`Database connection success @ ${JSON.stringify(test.rows[0].now)}`);
    }
    console.log(`${defaultPortWarning()}`);
    console.log(`ExpressJS server started...`);
    console.log(`Mode: ${process.env.NODE_ENV}`);
    //console.log(`Server logs are in: ${path.join(__dirname, '../logs/')}`);
    console.log(`Listening on "${BASE_URL}:${port}"...`);
    console.log("------------"); 
    console.log(`Use CTRL+C to stop the server...`);
  });

module.exports = app;

