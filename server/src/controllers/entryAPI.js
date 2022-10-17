//import connection for PostGreSQL
const pool = require("../db_connection.js");
//Import utility functions
const { formatDateToStr, genUUID } = require("../util.js");
//Import userAPI
const {} = require("./userAPI.js");

//get entryID
async function getEntryID() {

}

//Get all entries of a user
//return null if entry or user not found
async function getEntries(username) {

}

// async function test() {
//     console.log('testing...');
//     let result = await createUser({
//                             username: "lolcats",
//                             email: "lolcats@example.com",
//                             password: "lol",
//                             name: "LOL CAT",
//                             age: 25,
//                             }
//     );
//     console.log(result);
//     console.log("Done.");
// }

//test();

//add entry for a user
//return true if entry added
async function addEntry(username) {

}

//Update entry of a user
//return null if entry or user not found
//return true if entry updated
async function updateEntry(username, entryID) {

}

//Delete entry of a user
//return null if entry or user not found
//return true if entry deleted
async function deleteEntry(username, entryID) {

}

//Export all the functions
module.exports = 
{
    getEntries,
    addEntry,
    updateEntry,
    deleteEntry,
};


