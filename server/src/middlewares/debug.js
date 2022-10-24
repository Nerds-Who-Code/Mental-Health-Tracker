
//NOTE: This middleware should only be used for development and not in production
//      Because this middleware exposes potentially sensitive information

function debug(req, res, next) {
    console.log("---- DEBUGGER MIDDLEWARE OUTPUT: ----")
    //console.log("Request:");
    //console.log(req);
    console.log("Request Body:");
    console.log(req.body);
    console.log("Request params:");
    console.log(req.params);
    //console.log("Response:");
    //console.log(res);
    console.log("----  ----")
    next();
}

module.exports = debug;
