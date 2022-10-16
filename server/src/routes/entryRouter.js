
const express = require('express');

// Create the api router.
// The base URL for this router is URL:PORT/api/user/entry/
const entryRouter = express.Router();

// All routes should be wrapped up in try - catch blocks to prevent the entire server from crashing upon errors.


module.exports = entryRouter;
