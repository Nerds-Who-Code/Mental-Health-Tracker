//Router imports
const topRouter   = require("../routes/topRouter.js");
const userRouter  = require("../routes/userRouter.js");
const entryRouter = require("../routes/entryRouter.js");
const dbStatsRouter = require("../routes/db_stats.js");

function loadRouters(app)
{
    //Information about routes / routers
    const routingTable = [
        {route: '/api', name: topRouter},
        {route: '/api/user', name: userRouter},
        {route: '/api/user/entry', name: entryRouter},
        {route: '/api/statistics', name: dbStatsRouter}
    ];

    //Mount all the routers. See routing table for info.
    for (let i = 0; i < routingTable.length; i++)
    {
        app.use(routingTable[i].route, routingTable[i].name);
    }
}

module.exports = loadRouters;
