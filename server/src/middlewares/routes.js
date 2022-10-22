//Router imports
const APIrouter = require("../routes/APIrouter.js"); // DEPRECATED OLD --TODO: DELETE
const topRouter   = require("../routes/topRouter.js");
const userRouter  = require("../routes/userRouter.js");
const entryRouter = require("../routes/entryRouter.js");

function loadRouters(app)
{
    //Information about routes / routers
    const routingTable = [
        //{route: '/api', name: APIrouter},
        {route: '/api', name: topRouter},
        {route: '/api/user', name: userRouter},
        {route: '/api/user/entry', name: entryRouter}
    ];

    //Mount all the routers. See routing table for info.
    for (let i = 0; i < routingTable.length; i++)
    {
        app.use(routingTable[i].route, routingTable[i].name);
    }
}

module.exports = loadRouters;