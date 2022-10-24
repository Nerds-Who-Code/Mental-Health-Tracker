const express   = require('express');
const passport  = require('passport');
const rateLimit = require('express-rate-limit'); //Rate limiter
const verifyUser = require('../middlewares/verifyUser.js');
const {getUserBasicInfo,
       createUser,
       updateUser} = require('../controllers/userAPI.js');

// Create the user router.
// The base URL for this router is URL:PORT/api/user/
const userRouter = express.Router();

//Limit the amount of times a user can create an account
const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // Limit each IP to 5 create account requests per 'window' (here, per hour)
	message: 'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
	legacyHeaders: false, // Disable the 'X-RateLimit-*' headers
});

// All routes should be wrapped up in try - catch blocks to prevent the entire server from crashing upon errors.

//NOTE: Ideally the username should be in req.body.username for extra security/anonimity
//but many servers and proxies remove the req.body from GET requests
//That's why GET becomes a url parameter instead
userRouter.get('/get-info/:username', verifyUser, async (req, res, next) => {
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

userRouter.post('/login', passport.authenticate('local'), async (req, res, next) => {
    try
    {
            //console.log(req.user);
        res.status(201).send(req.user);
        // let result = await userAuthenthicate(req.body.username, req.body.password);
        // if (result instanceof Error || result === null) 
        // {
        //     return res.status(404).send(null);
        // }
        // return res.status(201).send(result);

    }
    catch (error)
    {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

userRouter.post('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
    });
    res.status(201).send("Logged out.");
    
});

userRouter.post('/signup', createAccountLimiter, async (req, res, next) => {
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

userRouter.put('/update-info', verifyUser, async (req, res, next) => {
    console.log("Authenthicated: " + req.isAuthenticated());
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

module.exports = userRouter;
