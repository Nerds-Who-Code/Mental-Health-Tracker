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

/**
 * Get a single user by username
 * 
 * @deprecated old API
 * @param {*} username 
 * @returns 
 */
function getUser_deprecated(username) {
    const foundUser = USERS.find((user) => 
        user.username === username
        );
    if (foundUser !== undefined) {
        //User is found.
        return foundUser;
    }
    return new Error(`Error: User with username ${username} not found`);
}

/**
 * Get a single user by username
 * 
 * @deprecated old API
 * @param {string} username 
 * @returns {Promise{Error | Object}}
 */
async function getUserByUsername(username) {
    const foundUser = await prisma.user.findFirst({ where: { username }})
    // console.log(`getUser2: ${username}, foundUser: ${foundUser}`)
    if (foundUser) return foundUser

    /**
     * @note 
     * Considering 'returning vs throwing' an Error I would throw.
     * The reason being that the caller expects a binary result - 
     * we either found the user with this username or we did not.
     * Therefore the simplest is to ensure that the returned value 
     * is either an Object or definite lack thereof (null). 
     * 
     * The caller also expects to catch any thrown Errors with trycatch. 
     * 
     * Therefore we are better off returning a null here and API handler
     * will respond to the client saying that 'null came back ==> no user found'.
     */
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
async function getUserByPasswd(username, password) {
    const foundUser = await getUserByUsername(username);
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
    const foundUser = await getUserByUsername(username);

    // User not found
    if (foundUser instanceof Error) {
        // We won't tell specifically if the username was found or not, or if the password was incorrect.
        //This leaves an ambiguous error message for someone trying to hack an account.
        return new Error(`Error: User with username ${username} not found or password incorrect`);
    }
    // Check if password matches
    // Check if a plaintext password is equal to the hash of that password. (The hash is stored in user data)
    try {
        // First argument is the plainttext password, the 2nd argument is the hash of that password
        const isPasswdEqual = await bcrypt.compare(password, foundUser.password);
        // If password are equal (isPasswdEqual = true)
        if (isPasswdEqual) {
            // Change isLoggedIn to true.
            // await updateUser(username, "isLoggedIn", true);
            // Set last login to current date.
            // let today = new Date();
            // Date format: YYYY-MM-DD or Year-Month-Day
            // let dateToStr = (today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate());
            // await updateUser(username, "lastLogin", dateToStr);

            return foundUser;
        } else {
            return new Error(`Error: User with username ${username} not found or password incorrect`);
        }
    } catch (error) {
        return new Error(`Error: User with username ${username} not found or password incorrect`);
    }
}

// Change the value of key of user with 'username'
async function updateUser(username, prop, value) {
    let userToBeUpdated = await getUserByUsername(username);
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
/**
 * @deprecated old API
 * @param {*} username 
 * @param {*} newUserData 
 * @returns 
 */
async function createUser_deprecated(username, newUserData) {
    //First check if user with that username already exists
    const foundUser = await getUserByUsername(username);
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

/**
 * @todo Need to account for all unique User properties: username && email.
 * @param {string} username 
 * @param {Object} newUserData 
 * @returns {Promise{Object}}
 */
async function createUser(username, newUserData) {
  const foundUser = await getUserByUsername(username);
  if (!(foundUser instanceof Error)) {
      return new Error(`Error: user with username '${username}' already exists`);
  } else {
    // console.log(`createUser2: creating ${username} and ${JSON.stringify(newUserData)}`)
      // Before adding the user to the database we need to first hash the password for security.
      // Only the hash is stored in the user data. The plaintext password is never stored.
      // When the user logs in it will check if the given plaitext password matches the hash stored in the database.
      // See function loginUser for more info.
      try {
          // generate the salt. The default salt rounds is 10.
          const salt = await bcrypt.genSalt(10);
          // create the hash (convert plaintext password to a hash)
          const hashedPassword = await bcrypt.hash(newUserData.password, salt);
          // Replace the plaintext password of the user with their hashed version.
          newUserData.password = hashedPassword;
          // Generate a unique ID for each user.
          newUserData.userId = Math.floor(Math.random() * 10000);
          // Add the user to the database
          // USERS.push(newUserData);
          // console.log(`createUser2: ready to go: ${JSON.stringify(newUserData)}`)
          const newUser = await prisma.user.create({
            data: { ...newUserData, username }
          })
          // console.log(`createUser2: newUser created: ${newUser}`)
          return newUser;
      } catch (err) {
        console.error(`[API] createUser2:\n${error} `)
          return new Error(`Error: Cannot create user ${username} because something went wrong.`);
      }
  }
}

// Delete a user by username
function deleteUser(username) {
    USERS = USERS.filter((user) => 
        user.username !== username
    );
}

// =============ENTRY FUNCTIONS==================

// Get all entries from a user by username
async function getAllEntries(username) {
    //Find the user
    let user = await getUserByUsername(username);
    //First check getUser does NOT return an error
    if (!(user instanceof Error)) {
        return user.entries;
    }
    return new Error(`Error: User with username ${username} not found`);
}

// Get entry from a user by username and entryID
async function getEntry(username, entryID) {
    //Find the user
    let user = await getUserByUsername(username);
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
async function addEntry(username, entry) {
    let userToBeUpdated = await getUserByUsername(username);
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
async function updateEntry(username, entryID, prop, value) {
    //Find the user
    let userToBeUpdated = await getUserByUsername(username);
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
async function deleteEntry(username, entryID) {
    let userToBeUpdated = await getUserByUsername(username);
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
    getUserByUsername,
    getUserById,
    getUserByPasswd,
    loginUser,
    updateUser,
    createUser,
    createUser_deprecated,
    deleteUser,
    getAllEntries,
    getEntry,
    addEntry,
    updateEntry,
    deleteEntry,
};

