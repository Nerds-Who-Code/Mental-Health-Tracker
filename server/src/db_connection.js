const Pool = require("pg").Pool;
require('dotenv').config();

//This file creates a connection to the PostGreSQL Database

//PSQL connection credentials
const credentials = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: false
};

//Create the connection pool
async function getPool() {
    const pool = new Pool(credentials);

    return pool;
}

module.exports = getPool;

//TEST CODE (DELETE LATER)

//return the client connections of the PSQL DB
// async function getClient() {
//     const client = new Client({
//         host: process.env.PG_HOST,
//         port: process.env.PG_PORT,
//         user: process.env.PG_USER,
//         password: process.env.PG_PASSWORD,
//         database: process.env.PG_DATABASE,
//         ssl: false,
//     });

//     await client.connect();
//     return client;
// }

/*
(async () => {
    await client.connect();
    const res = await client.query('SELECT $1::text as connected', ['Connection to postgres successful!']);
    console.log(res.rows[0].connected);
    await client.end();
  })();
*/
