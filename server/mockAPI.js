const bcrypt = require("bcrypt"); //import the bcrypt library for hashing functions
//Import mockData 
var USERS = require("./mockData"); //This can not be a const or else there will be an error with delete requests.

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// THESE ARE JUST MOCK API FUNCTIONS FOR TESTING AND SHOULD BE REPLACED BY REAL ONES

// API FUNCTIONS

// =============USER FUNCTIONS==================

// Get all USERS
// Be careful with this function as it returns All USERS data without checking for passwords
// This function should only be used for testing. Its not included in the APIrouter.js
// Also if the data is extremely large it will slow down the server.
function getAllUSERS() {
    return USERS;
}

// Get a single user by username
function getUser(username) {
    const foundUser = USERS.find((user) => 
        user.username === username
        );
    if (foundUser !== undefined) {
        //User is found.
        return foundUser;
    }
    return new Error(`Error: User with username ${username} not found`);
}

// Get a single user by id
function getUserById(id) {
    const foundUser = USERS.find((user) => 
        user.id === id
        );
    if (foundUser !== undefined) {
        return foundUser;
    }
    return new Error(`Error: User with id ${id} not found`);
}

    /*
    NOTE: This function is outdated. Use loginUser() instead.
          I am still keeping this function here for now, 
          cause I might use it in the future for something else. 
    */
// Get a single user by username AND password
// Only returns userdata if both username and password match
function getUserByPasswd(username, password) {
    const foundUser = getUser(username);
    //User not found
    if (foundUser instanceof Error) {
        //We won't tell specifically if the username was found or not, or if the password was incorrect.
        //This leaves an ambiguous error message for someone trying to hack an account.
        return new Error(`Error: User with username ${username} not found or password incorrect`);
    }
    //Check if password matches
    if (foundUser.password === password) {
        return foundUser;
    }
    return new Error(`Error: User with username ${username} not found or password incorrect`);
}

// This function is used to login a user
// Only returns userdata if both username and password match
// And sets the isLoggedIn flag of the user to true.
async function loginUser(username, password) {
    const foundUser = getUser(username);
    //User not found
    if (foundUser instanceof Error) {
        //We won't tell specifically if the username was found or not, or if the password was incorrect.
        //This leaves an ambiguous error message for someone trying to hack an account.
        return new Error(`Error: User with username ${username} not found or password incorrect`);
    }
    //Check if password matches
    //Check if a plaintext password is equal to the hash of that password. (The hash is stored in user data)
    try {
        //First argument is the plainttext password, the 2nd argument is the hash of that password
        const isPasswdEqual = await bcrypt.compare(password, foundUser.password);
        //If password are equal (isPasswdEqual = true)
        if (isPasswdEqual) {
            //Change isLoggedIn to true.
            updateUser(username, "isLoggedIn", true);
            //Set last login to current date.
            let today = new Date();
            //Date format: YYYY-MM-DD or Year-Month-Day
            let dateToStr = (today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate());
            updateUser(username, "lastLogin", dateToStr);

            return foundUser;
        } else {
            return new Error(`Error: User with username ${username} not found or password incorrect`);
        }
    } catch (error) {
        return new Error(`Error: User with username ${username} not found or password incorrect`);
    }
}

// Change the value of key of user with 'username'
function updateUser(username, prop, value) {
    let userToBeUpdated = getUser(username);
    //First check getUser does NOT return an error
    if (!(userToBeUpdated instanceof Error)) {
        //Check if the user has the property that needs to be updated
        if(userToBeUpdated.hasOwnProperty(prop)) {
            //Turn the value from a string to a boolean.
            //Transforms "false" to false and "true" to true.
            //This is because the server receives the data as a string
            /* FOR SOME REASON THIS CODE BREAKS LOGGING IN ?? */
            /*
            if(prop === "isLoggedIn") {
                value = (value === "false");
            }
            */
            userToBeUpdated[prop] = value;
                return userToBeUpdated
        } else {
            return new Error(`Error: Update failed, User does not have the property ${prop}`);
        }
    }
    return new Error(`Error: User with username ${username} not found`);
}

// Create a new user
// newUserData is an object
async function createUser(username, newUserData) {
    //First check if user with that username already exists
    const foundUser = getUser(username);
    if (!(foundUser instanceof Error)) {
        return new Error(`Error: This user with username ${username} already exists`);
    } else {
        //Before adding the user to the database we need to first hash the password for security.
        //Only the hash is stored in the user data. The plaintext password is never stored.
        //When the user logs in it will check if the given plaitext password matches the hash stored in the database.
        //See function loginUser for more info.
        try {
            //generate the salt. The default salt rounds is 10.
            const salt = await bcrypt.genSalt(10);
            //create the hash (convert plaintext password to a hash)
            const hashedPassword = await bcrypt.hash(newUserData.password, salt);
            //Replace the plaintext password of the user with their hashed version.
            newUserData.password = hashedPassword;
            //Generate a unique ID for each user.
            newUserData.userId = Math.floor(Math.random() * 10000);
            //Add the user to the database
            USERS.push(newUserData);
            return newUserData;
        } catch (err) {
            return new Error(`Error: Can not create user ${username} because something went wrong.`);
        }
    }
}


async function createUser2(username, newUserData) {
  // Connect the client
  // await prisma.$connect()

  // try {
    await prisma.user.create({
      data: {
        userId: 2,
        name: "Elder Gnome",
        username: "elderGnome",
        email: "eldergnome@example.com",
        password: "$2b$10$3lxOLSkbLYe3QP/ro2TZieBay3hq/.RcFWxEFC4/Dh1gVoedQLH1u", //"HAHAHAHA"
        age: 99,
        lastLogin: "01-05-2022",
        isLoggedIn: false,
      }
    })
  
    const allUsers = await prisma.user.findMany()
    console.dir(allUsers, { depth: null })
    return allUsers
  // } catch (error) {
  //   console.error(`[API] createUser2: ${JSON.stringify(error, null, 4)}`)
  // }
  
}

// Delete a user by username
function deleteUser(username) {
    USERS = USERS.filter((user) => 
        user.username !== username
    );
}

// =============ENTRY FUNCTIONS==================

// Get all entries from a user by username
function getAllEntries(username) {
    //Find the user
    let user = getUser(username);
    //First check getUser does NOT return an error
    if (!(user instanceof Error)) {
        return user.entries;
    }
    return new Error(`Error: User with username ${username} not found`);
}

// Get entry from a user by username and entryID
function getEntry(username, entryID) {
    //Find the user
    let user = getUser(username);
    //First check getUser does NOT return an error
    if (!(user instanceof Error)) {
        //Find the entry
        const entry = user.entries.find((entry) =>
            entry.entryId === entryID
        );
        return entry;
    } 
    return new Error(`Error: User with username ${username} not found`);
}

// Add entry to a user
function addEntry(username, entry) {
    let userToBeUpdated = getUser(username);
    //First check getUser does NOT return an error
    if (!(userToBeUpdated instanceof Error)) {
        // First Generate a unique entry ID
        entry.entryId = Math.floor(Math.random() * 10000);
        // Set the submit date of the entry to current date
        let today = new Date();
        //Date format: YYYY-MM-DD or Year-Month-Day
        let dateToStr = (today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate());
        entry.date = dateToStr;
        // Add entry to database.
        userToBeUpdated['entries'].push(entry);
        return entry;
    }
    return new Error(`Error: User with username ${username} not found`);
}

// Edit an entry by looking for EntryID and username
function updateEntry(username, entryID, prop, value) {
    //Find the user
    let userToBeUpdated = getUser(username);
    //First check getUser does NOT return an error
    if (!(userToBeUpdated instanceof Error)) {
        //Find the entry
        const entryToBeUpdated = userToBeUpdated.entries.find((entry) =>
            entry.entryId === entryID
        );
        //Check if the property in the entry exists
        if(entryToBeUpdated.hasOwnProperty(prop)) {
            //update the property
            entryToBeUpdated[prop] = value;
            return entryToBeUpdated
        } else {
            return new Error (`Error: Update failed, Entry does not have the property ${prop}`);
        }
    } else {
        return new Error (`Error: Update failed, User with username ${username} does not exist`);
    }
}

// Delete entry from a user
function deleteEntry(username, entryID) {
    let userToBeUpdated = getUser(username);
    //First check getUser does NOT return an error
    if (!(userToBeUpdated instanceof Error)) {
        //Delete entry
        userToBeUpdated.entries = userToBeUpdated.entries.filter((entry) => 
            entry.entryId !== parseInt(entryID)
        );
        //No error. EntryId of the deleted entry is returned.
        return entryID; 
    } else {
        return new Error(`Error: User with username ${username} not found`);
    }
}

//Export all the functions
module.exports = 
{
    getAllUSERS,
    getUser,
    getUserById,
    getUserByPasswd,
    loginUser,
    updateUser,
    createUser,
    createUser2,
    deleteUser,
    getAllEntries,
    getEntry,
    addEntry,
    updateEntry,
    deleteEntry,
};

