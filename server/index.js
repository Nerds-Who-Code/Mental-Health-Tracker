const express = require('express');
const router = express.Router();
const path = require('path');
const os = require('os'); //Adds access to the OS

/*
  ExpressJS Server File
*/

//Get the info about the machine the server is running on
const MachineInfo = {
	//return the computer’s operating system.
	OSname: os.type(),
	//return the operating system CPU architecture.
	CPUarchitecture: os.arch(),
	//return the hostname of the operating system.
	hostname: os.hostname(),
    // Initial memory usage
    initialMemory: process.memoryUsage().heapUsed,
    // Current free memory available (in bytes)
    freeMemAvailable: os.freemem(),
    //return information about the network interfaces of the computer, such as IP and MAC address.
	networkInfo: os.networkInterfaces,
    //return the system uptime, in seconds.
	upTime: os.uptime(),
};

// Get the info about system directories
const DirectoryInfo = {
    //return the current user’s home directory.
	homeDirectory: os.homedir(),
    //return the current working directory
    currentWorkingDirectory: process.cwd(),
    // return the directory that this file is executed in
    directoryOfThisFile: __dirname
};

//Initialize expressJS
const app = express();

//You can set the environment variable PORT to tell your web server what port to listen on.
//Initialize the port with the bash command: PORT=YourPortNumberHere node index.js 
//for example PORT=4555 node index.js  
//If no port is set e.g. node index.js then port 3000 will be used by default
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

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
	return;
}

//Start server
app.listen(port, () => {
    console.log("============");
    console.log(`Starting server...`);
    console.log(`${defaultPortWarning()}`);
    console.log(`ExpressJS server started...`);
    console.log(`Listening on "https://localhost" on port: ${port}...`)
    console.log("------------"); 
    console.log(`Use CTRL+C to stop the server...`);
  });

module.exports = router;

