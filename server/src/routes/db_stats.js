const express = require('express');
const rateLimit = require('express-rate-limit');
//import connection for PostGreSQL
const pool = require("../db_connection.js");
//Import utility functions
const { formatDateToStr } = require("../util.js");
// Create the entry router.
// The base URL for this router is URL:PORT/statistics
const dbStatsRouter = express.Router();

//User can only make 1 statistics report per day (to minimize spamming on database)
const dbStatsLimiter = rateLimit({
	windowMs: 24 * 60 * 60 * 1000, // 24 hours
	max: 1, // Limit each IP to 1 statistic requests per 'window' (here, per 24 hours)
	message: 'You are only allowed to create 1 report per day',
	standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
	legacyHeaders: false, // Disable the 'X-RateLimit-*' headers
});

//Generates a reports about statistics of the database.
//Note that this route never exposes any sensitive user information. Only statistics.
//Returns:
//  -Date of created report
//  -Number of users in database
//  -Number of total entries in database
//  -Average number of entries per user
//  -Size of the database
dbStatsRouter.get('/', dbStatsLimiter, async (req, res, next) => {
    try
    {
        let users = await pool.query(
            `
            SELECT COUNT(*) AS users
            FROM users;
            `
            );

        let entries = await pool.query(
            `
            SELECT COUNT(*) AS entries
            FROM entries;
            `
            );

        let db_size = await pool.query(
            `
            SELECT pg_size_pretty (pg_database_size ('feelsifyDB')) AS total_database_size;
            `
            );

        if (!users || !users.rows || !users.rows.length) {
            let err = new Error(`Error: SQL query failed.`);
            console.log(err);
            return res.status(404).send(`Error: Report could not be created. Try again next time.`);
        }

        users = parseInt(users.rows[0].users, 10);
        entries = parseInt(entries.rows[0].entries, 10);
        let currentDate = formatDateToStr(new Date(), "YYYY-MM-DD");
        let avgEntriesPerUser = entries / users;

        //Generate the report
        const db_stats = {
            report_date: currentDate,
            users: users,
            entries: entries,
            average_entries_per_user: avgEntriesPerUser,
            database_size: db_size.rows[0].total_database_size
        };
        return res.status(200).send(db_stats);
    }
    catch (error)
    {
        console.log("500: Internal server error - " + error.message);
        res.status(500).send(error.message);
    }
});

module.exports = dbStatsRouter;
