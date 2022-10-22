//passport is a user authenthication middleware
const passport       = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
//User sessions middleware
const expressSession = require('express-session');
const pgSession      = require('connect-pg-simple')(expressSession);
const {checkUserExists, userAuthenthicate} = require("../controllers/userAPI.js");

function userAuthenthication(app, pool) {
    //user sessions management (sessions are stored in the postgresql database)
    app.use(expressSession({
        store: new pgSession({
          pool: pool,                    // Connection pool to postgresql
          tableName: 'user_sessions',    // tablename in postgresql to store sessions
          createTableIfMissing: false    // the table is already created in db_init.sql
        }),
        secret: 'thisisatemporarysecret',
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, secure: false }, // 30 days
        //Resave: Forces the session to be saved back to the session store, 
        //even if the session was never modified during the request. Reccomended: False (more security)
        resave: false,
        //saveUninitialized: Forces a session that is “uninitialized” to be saved to the store. 
        //A session is uninitialized when it is new but not modified Reccomended: False (more security)
        saveUninitialized: false,
    }));
    //User authenthication middleware
    app.use(passport.initialize());
    //Persistent login sessions
    app.use(passport.session()); 
    
    /* -+- Passport authenthication functions -+- */

    //Serialize a user into the the user session cookie
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    //Deserialize a user out of the user session cookie
    passport.deserializeUser(async (userObject, done) => {
        let user = await checkUserExists(userObject.user_id);
        if (user instanceof Error || user === null) {
            //User not foud or error
            done(user);
        }
        done(null, user);
    });
        
    passport.use(new LocalStrategy(
    {
        //pass back the entire request to the callback
        passReqToCallback: true
    },
    async function (req, username, password, done) {
        let user = await userAuthenthicate(username, password);
        if (user instanceof Error) {
            done(user);
        }
    
        if (user === false || user === null) {
            //Authenthication fail / wrong user credentials
            done(null, false);
        }
    
        if (user?.user_id !== undefined) {
            if ("user_id" in user)
            {
                //Authenthication success
                done(null, user); 
            }
        }
    }));
}

module.exports = userAuthenthication;
