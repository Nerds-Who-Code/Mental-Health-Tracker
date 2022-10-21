/*
  ExpressJS Server initialization file
*/

//Imports
const express      = require('express');
//http security headers
const helmet       = require('helmet'); 
//Allow CORS
var cors           = require('cors');
//Rate limiter
const rateLimit    = require('express-rate-limit');
//logging middleware
var logger         = require('morgan');
var path           = require('path');
//Rotating file logging
const rfs          = require("rotating-file-stream"); 
var cookieParser   = require('cookie-parser');
//only use lowercase paths
var lowercasePaths = require('express-lowercase-paths');
//Load the .env config file
require('dotenv').config(); 
//Router imports
const APIrouter = require("./routes/APIrouter.js"); // DEPRECATED OLD --TODO: DELETE
const topRouter   = require("./routes/topRouter.js");
const userRouter  = require("./routes/userRouter.js");
const entryRouter = require("./routes/entryRouter.js");

// =================================================================

// SERVER SETUP AND CONFIG

//Set base url
var BASE_URL = process.env.BASE_URL || "http://localhost";

//Set cors headers and config
var corsOptions = {
  origin: "http://localhost:3000"
};

//Information about routes / routers
const routingTable = [
  //{route: '/api', name: APIrouter},
  //{route: '/api', name: topRouter},
  {route: '/api/user', name: userRouter},
  {route: '/api/user/entry', name: entryRouter}
];

// Create a rotating write stream
var serverLogStream = rfs.createStream('server.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, '/server/logs/')
});

//Set config and settings for the global API rate limiter
const rateLimiterAPI = rateLimit({
	windowMs: process.env.TIME_PER_WINDOW * 60 * 1000, // TIME_PER_WINDOW is in minutes
	max: process.env.MAX_REQUESTS_PER_WINDOW, // Limit each IP to number of requests per 'window'
  message: 'Too many requests. You are being limited. Try again later.',
	standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
	legacyHeaders: false, // Disable the 'X-RateLimit-*' headers
});

// =================================================================

//Initialize expressJS
const app = express();
//Number of proxies between express server and the client
//This is to make the rate limiter ignore proxy requests
app.set('trust proxy', 1);
//Initialize express router
const router = express.Router();

//You can set the environment variable PORT to tell your web server what port to listen on.
//Initialize the port with the bash command: PORT=YourPortNumberHere node index.js 
//for example PORT=4555 node index.js  
//If no port is set e.g. node index.js then port 3000 will be used by default
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//You can set the environment variable NODE_ENV to either "production" or "development". 
//It defaults to "development" if its not set.
var MODE = process.env.NODE_ENV || "development";

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
	return "Success: The set port is not the default port.";
}

// =================================================================

// MIDDLEWARES

//Enable All CORS Requests
app.use(cors(corsOptions));
//app.use(cors());
//Set http security headers
app.use(helmet());
//Enable logging middleware based on mode
if (MODE === "development") {
  //:method :url :status :response-time ms - :res[content-length]
  app.use(logger('dev'));
} 
else if (MODE === "production") {
  //:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
  app.use(logger('common'));
}
//Log to file
app.use(logger('combined', { stream: serverLogStream }));
//For parsing application/json
app.use(express.json());
//Apply the rate limiter to API calls only
app.use('/api', rateLimiterAPI);
//change all uppercase letters in a path to lowercase 
//preserves uppercase in url queries, but NOT in url params
app.use(lowercasePaths());
//Mount all the routers. See routing table for info.
for (let i = 0; i < routingTable.length; i++)
{
  app.use(routingTable[i].route, routingTable[i].name);
}

//Basic server response test
app.get('/test', async (req, res, next) => {
  console.log("Received test.");
  try
  {
      return res.status(201).send("Test success from IP: " + req.ip);
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
app.listen(port, () => {
    console.log("============");
    console.log(`Starting server...`);
    console.log(`${defaultPortWarning()}`);
    console.log(`ExpressJS server started...`);
    console.log(`Mode: ${MODE}`);
    console.log(`Listening on "${BASE_URL}:${port}"...`);
    console.log("------------"); 
    console.log(`Use CTRL+C to stop the server...`);
  });

module.exports = router;

