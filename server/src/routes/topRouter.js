const express = require('express');

// Create the topRouter router.
// The base URL for this router is URL:PORT/api/
const topRouter = express.Router();

// All routes should be wrapped up in try - catch blocks to prevent the entire server from crashing upon errors.


module.exports = topRouter;
