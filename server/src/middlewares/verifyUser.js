//Verify which user is logged in
async function verifyUser(req, res, next) {
    //url parameters get turned into body so we dont have to check both params and body
    //There should be no difference if username is in url or body
    //checking both can result in ERROR: HTTP HEADERS ALREADY SENT
    req.body.username = req.params.username;

    //If the user is not logged in OR if the provided username does not match
    //the logged in user the request is rejected.
    if (req.isAuthenticated() === false ||
        req.session?.passport?.user.username !== req.body.username) 
    {
        return res.status(403).send("Forbidden!");
    }
    //The logged in user matches the user that makes the request
    else if (req.session?.passport?.user.username === req.body.username) {
        next();
    }
}

module.exports = verifyUser;
