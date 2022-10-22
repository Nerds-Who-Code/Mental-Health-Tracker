// var LocalStrategy = require('passport-local').Strategy;
// const {getUserID} = require('../controllers/userAPI.js');

// module.exports = function(passport) {
//     //Serialize a user into the the user session cookie
//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//     });
//     //Deserialize a user out of the user session cookie
//     passport.deserializeUser(async (id, done) => {
//         userID = await getUserID();

//         User.findById(id, function(err, user) {
//             done(err, user);
//         });
//     });

//     passport.use(new LocalStrategy(
//         {
//             //pass back the entire request to the callback
//             passReqToCallback: true
//         },
//         function(req, username, password, done) {
//             if (err) {
//                 //Authenthication Error
//                 return done(err);
//             }

//             //Authenthication success
//             return done(null, user);

//             //Authenthication fail / wrong user credentials
//             return done(null, false);
//         }
//     ));

