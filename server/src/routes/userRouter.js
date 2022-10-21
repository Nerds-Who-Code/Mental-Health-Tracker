const express = require('express');
const {getUserBasicInfo,
       userAuthenthicate, 
       createUser,
       updateUser} = require('../controllers/userAPI.js');

// Create the user router.
// The base URL for this router is URL:PORT/api/user/
const userRouter = express.Router();

// All routes should be wrapped up in try - catch blocks to prevent the entire server from crashing upon errors.

//NOTE: Ideally the username should be in req.body.username for extra security/anonimity
//but many servers and proxies remove the req.body from GET requests
//That's why GET becomes a url parameter instead
userRouter.get('/get-info/:username', async (req, res, next) => {
    try
    {
        let result = await getUserBasicInfo(req.params.username);
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

userRouter.put('/login', async (req, res, next) => {
    try
    {
        let result = await userAuthenthicate(req.body.username, req.body.password);
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

userRouter.put('/update-info', async (req, res, next) => {
    try
    {
        let result = await updateUser(req.body.username, req.body.info);
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

userRouter.post('/create', async (req, res, next) => {
    try
    {
        let result = await createUser(req.body.userData);
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

module.exports = userRouter;
