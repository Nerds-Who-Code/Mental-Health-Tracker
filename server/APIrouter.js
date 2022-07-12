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
        deleteUser,
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

// =============USER FUNCTIONS==================

//req.params.username is the last part in the URL (:username) 
//For example:
//https://localhost:3001/getUser/test123
//req.params.username = "test123"
APIrouter.get('/getUser/:username', (req, res, next) => {
    const foundUser = getUser(req.params.username);
    if (!(foundUser instanceof Error)) {
        //User is found. Send the user data.
        res.status(200).send(foundUser);
    }
    //User not found error. Send 404 response.
    res.status(404).send(foundUser.message);
});

APIrouter.get('/getUserById/:id', (req, res, next) => {
    const foundUser = getUserById(req.params.id);
    if (!(foundUser instanceof Error)) {
        res.status(200).send(foundUser);
    }
    res.status(404).send(foundUser.message);
});

//We are using a PUT request instead of a GET request so that the user can
//send the password in the request body for secure (HTTPS) encyrption instead of through the URL.
//This way the password is not exposed in plain text.
APIrouter.put('/getUserByPasswd/:username', (req, res, next) => {
    const foundUser = getUserByPasswd(req.params.username, req.body.password);
    if (!(foundUser instanceof Error)) {
        res.status(201).send(foundUser);
    }
    res.status(404).send(foundUser.message);
});

APIrouter.put('/loginUser/:username', (req, res, next) => {
    //We need to wrap this in a self-executing async function, because the hashing library is also async.
    (async () => {
        const foundUser = await loginUser(req.params.username, req.body.password);
        if (!(foundUser instanceof Error)) {
            res.status(201).res.send(foundUser);
        } else {
            res.status(404).send(foundUser.message);
        }
    })();
});

//JSON Request Body Input:
/*
{"property": "your_property_here",
 "value: "your_value_here"}

For example if you want to change the age of a user to 5, the request body becomes:
{"property": "age",
 "value": 5}
*/
APIrouter.put('/updateUser/:username', (req, res, next) => {
    const updatedUser = updateUser(req.params.username, req.body.property, req.body.value);
    if (!(updatedUser instanceof Error)) {
        res.status(201).res.send(foundUser);
    }
    res.status(404).send(updatedUser.message);
});

/**@todo Validate the data with Express-Validator */
//JSON Request Body Input:
//{"user:" {your_user_data_here}}
APIrouter.post('/createUser/:username', (req, res, next) => {
    //We need to wrap this in a self-executing async function, because the hashing library is also async.
    (async () => {
        /*  There is a bug here when: if there 2 create requests made one after another, both with the exact same data,
            there will be an error and the server shuts down.
            Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        */
        const createdUser = await createUser(req.params.username, req.body.user);
        if (!(createUser instanceof Error)) {
            res.status(201).send(createdUser);
        }
        res.status(404).send(createdUser.message);
    })();
});

APIrouter.delete('/deleteUser/:username', (req, res, next) => {
    deleteUser(req.params.username);
    res.status(201).send(`User with username ${req.params.username} was deleted.`);
});

// =============ENTRY FUNCTIONS==================

//JSON Request Body Input:
//{"entry:" {your_entry_data_here}}
APIrouter.post('/addEntry/:username', (req, res, next) => {
    const createdEntry = addEntry(req.params.username, req.body.entry);
    if (!(createdEntry instanceof Error)) {
        res.status(201).send(createdEntry);
    }
    res.status(404).send(createdEntry.message);
});

//JSON Request Body Input:
/*
{"property": "your_property_here",
 "value: "your_value_here"}

For example if you want to change the level of an entry to 6, the request body becomes:
{"property": "level",
 "value": 6}
*/
APIrouter.put('/updateEntry/:username/:entryID', (req, res, next) => {
    const updatedEntry = updateEntry(req.params.username, req.params.entryID, req.body.property, req.body.value);
    if (!(updatedEntry instanceof Error)) {
        res.status(201).send(updatedEntry);
    }
    res.status(404).send(updatedEntry.message);


});

APIrouter.delete('/deleteEntry/:username/:entryID', (req, res, next) => {
    const isError = deleteEntry(req.params.username, req.params.entryID);
    if (!(isError instanceof Error)) {
        res.status(201).send(`Entry with entry ID: ${req.params.entryID} was deleted.`);
    }
    res.status(404).send(isError);
});

module.exports = APIrouter;

