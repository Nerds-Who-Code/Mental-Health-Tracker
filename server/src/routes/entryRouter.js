
const express = require('express');
const {} = require('../controllers/userAPI.js');
const {getEntries,
       addEntry,
       updateEntry,
       deleteEntry} = require('../controllers/entryAPI.js');

// Create the api router.
// The base URL for this router is URL:PORT/api/user/entry/
const entryRouter = express.Router();

// All routes should be wrapped up in try - catch blocks to prevent the entire server from crashing upon errors.

//Verify user is logged in
async function verifyUser(req, res, next) {
    if (req.isAuthenticated() === false) {
        return res.status(403).send("Forbidden");
    }
    console.log("body: " + req.body.username);
    console.log("params: " + req.params.username);
    if (req.session?.passport?.user.username === req.body.username)
    {
        console.log("username match from body");
        next();
    }
    else if (req.session?.passport?.user.username !== req.body.username)
    {
        console.log("no username match from body");
        next();
    }
    if (req.session?.passport?.user.username === req.params.username)
    {
        console.log("username match from url params");
        next();
    }
    else if (req.session?.passport?.user.username !== req.params.username)
    {
        console.log("no username match from url params");
        next();
    }
    //next();
}

//entryRouter.use(verifyUser);

//get all entries from a user
entryRouter.get('/get-all/:username', verifyUser, async (req, res, next) => {
    console.log("UserID?: " + JSON.stringify(req.session?.passport?.user));
    try
    {
        let result = await getEntries(req.params.username);
        if (result instanceof Error || result === null) 
        {
            return res.status(404).send(null);
        }
        return res.status(200).send(result);
    }
    catch (error)
    {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

entryRouter.put('/update', async (req, res, next) => {
    try
    {
        let result = await updateEntry(req.body.username, req.body.entryID, req.body.info);
        if (result instanceof Error || result === null)
        {
            return res.status(404).send(null);
        }
        return res.status(201).send(result);
    }
    catch (error)
    {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

entryRouter.post('/create', async (req, res, next) => {
    try
    {
        let result = await addEntry(req.body.username, req.body.entry);
        if (result instanceof Error || result === null) 
        {
            return res.status(404).send(null);
        }
        return res.status(201).send(result);
    }
    catch (error)
    {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

//NOTE: Ideally the username and entryID should be in req.body.username for extra security/anonimity
//but many servers and proxies remove the req.body from DELETE requests
//That's why DELETE becomes a url parameter instead
entryRouter.delete('/delete/:username/:entryID', async (req, res, next) => {
    try 
    {
        let result = await deleteEntry(req.params.username, req.params.entryID);
        if (result instanceof Error || result === null) 
        {
            return res.status(404).send(null);
        }
        return res.status(201).send(result);
    } 
    catch (error) 
    {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);  
    }
});

module.exports = entryRouter;
