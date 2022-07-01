import USERS from "./mockData";

// THESE ARE JUST MOCK API FUNCTIONS FOR TESTING AND SHOULD BE REPLACED BY REAL ONES

// API FUNCTIONS

// Get all USERS
export function getAllUSERS() {
    return USERS;
}

// Get a single user by username
export function getUser(username) {
    let foundUser = USERS.find((user) => 
        user.username === username
        );
    if (foundUser !== undefined) {
        return foundUser;
    }
    return `Error: User with ${username} not found`;
}

// Get a single user by id
export function getUserById(id) {
    let foundUser = USERS.find((id) => 
        user.id === id
        );
    if (foundUser !== undefined) {
        return foundUser;
    }
    return `Error: User with ${id} not found`;
}

// Change the value of key of user with 'username'
export function updateUser(username, prop, value) {
    let userToBeUpdated = getUser(username);
    //First check getUser does NOT return an error
    if (!(userToBeUpdated instanceof String)) {
        //Check if the user has the property that needs to be updated
        if(userToBeUpdated.hasOwnProperty(prop)) {
            userToBeUpdated[prop] = value;
                return userToBeUpdated
        } else {
            return `Error: Update failed, User does not have the property ${prop}`;
        }
    }
}

// Create a new user
// newUserData is an object
export function createUser(newUserData) {
    USERS.push(newUserData);
}

// Delete a user by username
export function deleteUser(username) {
    USERS = USERS.filter((user) => 
        user.username !== username
    );
}

// Add entry to a user
export function addEntry(username, entry) {
    let userToBeUpdated = getUser(username);
    //First check getUser does NOT return an error
    if (!(userToBeUpdated instanceof String)) {
        userToBeUpdated['entries'].push(entry);
    }
}

// Delete entry from a user
export function deleteEntry(username, entry) {
    let userToBeUpdated = getUser(username);
    //First check getUser does NOT return an error
    if (!(userToBeUpdated instanceof String)) {
        //Add delete code here
    }
}

