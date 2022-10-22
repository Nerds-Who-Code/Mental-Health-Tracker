//Rate limiter
const rateLimit = require('express-rate-limit');

function rateLimiter(app) {
    //Set config and settings for the global API rate limiter
    const rateLimiterAPI = rateLimit({
        windowMs: process.env.TIME_PER_WINDOW * 60 * 1000, // TIME_PER_WINDOW is in minutes
        max: process.env.MAX_REQUESTS_PER_WINDOW, // Limit each IP to number of requests per 'window'
        message: 'Too many requests. You are being limited. Try again later.',
        standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
        legacyHeaders: false, // Disable the 'X-RateLimit-*' headers
    });
    //Apply the rate limiter to API calls only
    app.use('/api', rateLimiterAPI);
}

module.exports = rateLimiter;
