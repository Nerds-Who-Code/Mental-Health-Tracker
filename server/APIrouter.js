const express = require('express');
const { check, validationResult } = require('express-validator');
const fs = require('fs'); //Import filesystem operations
const os = require('os');
//import all the functions from mockAPI.js
const { getUser,
        getUserById,
        getUserByPasswd,
        loginUser,
        updateUser,
        createUser,
        createUser2,
        deleteUser,
        getAllEntries,
        addEntry,
        updateEntry,
        deleteEntry } = require('./mockAPI');

// Create the api router.
// The base URL for this router is URL:PORT/api/
const APIrouter = express.Router();

//If set to true the APIlogger middleware will also write its logs to a file.
//File location /server/logs/serverlog.txt
const IS_LOG_TO_FILE = false;
var loggerFileStream = null; //this can not be const or else there will an error.
if(IS_LOG_TO_FILE) {
    //Create the file writing stream.
    loggerFileStream = fs.createWriteStream('serverlog.txt', 'utf8');
}

//Logging middleware
//This function will execute for every request to the base URL of APIrouter.
function APIlogger(req, res, next) {
    //Note: os.EOL is an "Enter" key. Its actual data depends on the operating system. EOL means End Of Line.
    //With os.EOL logging will be compatible with both Linux and Windows operating sytems.
    //The below is the same as writing 6 seperate console.log() commands.
    let logData = "==================================================================" + os.EOL +
                  "Request received at:" + JSON.stringify(req.url) + os.EOL + 
                  "Request data: " + os.EOL + 
                  "Params: " + JSON.stringify(req.params) + os.EOL + 
                  "Query: " + JSON.stringify(req.query) + os.EOL + 
                  "Body: " + JSON.stringify(req.body);

    //Console logging
    console.log(logData);

    //File logging
    if(IS_LOG_TO_FILE && loggerFileStream !== null) {
        //Write to file.
        loggerFileStream.write(logData + os.EOL); 
    }

    next();
}
//Mount the APIlogger middleware to the APIrouter
APIrouter.use(APIlogger);

// All routes should be wrapped up in try - catch blocks to prevent the entire server from crashing upon errors.

// =============USER FUNCTIONS==================

//req.params.username is the last part in the URL (:username) 
//For example:
//https://localhost:3001/getUser/test123
//req.params.username = "test123"
APIrouter.get('/getUser/:username', async (req, res, next) => {
    try {
        const foundUser = await getUser(req.params.username);
        if (!(foundUser instanceof Error)) {
            res.status(200).send(foundUser);
        }
        // User not found error. Send 404 response.
        res.status(404).send(foundUser.message);
    // Internal server errors
    } catch (error) {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

APIrouter.get('/getUserById/:id', async (req, res, next) => {
    try {
        const foundUser = await getUserById(req.params.id);
        if (!(foundUser instanceof Error)) {
            res.status(200).send(foundUser);
        }
        res.status(404).send(foundUser.message);
    } catch (error) {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

//We are using a PUT request instead of a GET request so that the user can
//send the password in the request body for secure (HTTPS) encyrption instead of through the URL.
//This way the password is not exposed in plain text.
APIrouter.put('/getUserByPasswd/:username', async (req, res, next) => {
    try {
        const foundUser = await getUserByPasswd(req.params.username, req.body.password);
        if (!(foundUser instanceof Error)) {
            res.status(201).send(foundUser);
        }
        res.status(404).send(foundUser.message);
    } catch (error) {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

//This route is async  because the hashing library is also async.
APIrouter.put('/loginUser/:username', async (req, res, next) => {
    try {
        //We need to wrap this in a self-executing async function, because the hashing library is also async.
        const foundUser = await loginUser(req.params.username, req.body.password);
        if (!(foundUser instanceof Error)) {
            res.status(201).send(foundUser);
        } else {
            res.status(404).send(foundUser.message);
        }
    } catch (error) {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

//JSON Request Body Input:
/*
{"property": "your_property_here",
 "value: "your_value_here"}

For example if you want to change the age of a user to 5, the request body becomes:
{"property": "age",
 "value": 5}
*/
APIrouter.put('/updateUser/:username', async (req, res, next) => {
    try {
        const updatedUser = await updateUser(req.params.username, req.body.property, req.body.value);
        if (!(updatedUser instanceof Error)) {
            res.status(201).send(updatedUser);
        }
        res.status(404).send(updatedUser.message);
    } catch (error) {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

/**@todo Validate the data with Express-Validator */
// JSON Request Body Input:
// {"user:" {your_user_data_here}}
// This route is async  because the hashing library is also async.
APIrouter.post('/createUser_deprecated/:username', 
               [],
               async (req, res, next) => {
    /*  There is a bug here when: if there 2 create requests made one after another, both with the exact same data,
        there will be an error and the server shuts down.
        Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    */

    // Check for body errors (Data validation)
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
        // Send Bad Request Response with the error codes of the validation.
        return res.status(400).send({errors: validationErrors.array()});
    }

    try {
        const createdUser = await createUser_deprecated(req.params.username, req.body.user);
        if (!(createUser instanceof Error)) {
            res.status(201).send(createdUser);
        }
        res.status(404).send(createdUser.message);
    } catch (error) {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

APIrouter.post('/createUser/:username', 
               [],
               async (req, res, next) => {

    try {
        const newUser = await createUser(req.params.username, req.body.user)
        if (!(newUser instanceof Error)) {
          return res.status(201).send(newUser);
        }
        // res.status(200).json({ message: 'ok', data: newUser });
        return res.status(404).send(newUser.message);
    } catch (error) {
        console.error("500: Internal server error - " + error);
        return res.status(500).json({ msg: `Was not able to create a new user ${req.params.username}`, params: req.body.user || {}, error: { ...error, msg: error.message } }); /**@todo msg for dev purposes, remove in production */
    }
});

APIrouter.delete('/deleteUser/:username', (req, res, next) => {
    try {
        deleteUser(req.params.username);
        res.status(201).send(`User with username ${req.params.username} was deleted.`);
    } catch (error) {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

// =============ENTRY FUNCTIONS==================

APIrouter.get('/getAllEntries/:username', async (req, res, next) => {
    try {
        const entries = await getAllEntries(req.params.username);
        if (!(entries instanceof Error)) {
            res.status(200).send(entries);
        }
        res.status(404).send(entries.message);
    } catch (error) {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

//JSON Request Body Input:
//{"entry:" {your_entry_data_here}}
APIrouter.post('/addEntry/:username', async (req, res, next) => {
    try {
        const createdEntry = await addEntry(req.params.username, req.body.entry);
        if (!(createdEntry instanceof Error)) {
            res.status(201).send(createdEntry);
        }
        res.status(404).send(createdEntry.message);
    } catch (error) {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

//JSON Request Body Input:
/*
{"property": "your_property_here",
 "value: "your_value_here"}

For example if you want to change the level of an entry to 6, the request body becomes:
{"property": "level",
 "value": 6}
*/
APIrouter.put('/updateEntry/:username/:entryID', async (req, res, next) => {
    try {
        const updatedEntry = await updateEntry(req.params.username, req.params.entryID, req.body.property, req.body.value);
        if (!(updatedEntry instanceof Error)) {
            res.status(201).send(updatedEntry);
        }
        res.status(404).send(updatedEntry.message);
    } catch (error) {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

APIrouter.delete('/deleteEntry/:username/:entryID', async (req, res, next) => {
    try {
        const entryID = await deleteEntry(req.params.username, req.params.entryID);
        if (!(entryID instanceof Error)) {
            //On success send the entryID of the deleted entry back as a confirmation.
            res.status(201).send(entryID);
        }
        res.status(404).send(entryID.message);
    } catch (error) {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);  
    }
});

module.exports = APIrouter;

