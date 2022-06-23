import Users from "./mockData";

// THESE ARE JUST MOCK API FUNCTIONS FOR TESTING AND SHOULD BE REPLACED BY REAL ONES

// API FUNCTIONS

// Get all users
export function getAllUsers() {
    return Users;
}

// Get a single user by username
export function getUser(username) {
    return Users.find(
      (user) => user.username === username
    );
}

// Get a single user by id
export function getUserById(id) {
    return Users.find(
      (user) => user.id === id
    );
}

// Change the value of key of user with 'username'
// This function is not complete yet ;_;
export function updateUser(username, key, value) {
   let indexOfUserToBeUpdated = Users.findIndex(
        (user) => Users.username === username
    );

    let userToBeUpdated = Users[indexOfUserToBeUpdated];

    // This function is not complete yet ;_;

/*
    for (var key in userToBeUpdated) {
        if (userToBeUpdated.hasOwnProperty(key)) {
            userToBeUpdated[key] = value;
        }
    }   
*/
}

// Create a new user
// newUserData is an object
export function createUser(newUserData) {
    Users.push(newUserData);
}


// Delete a user by username
export function deleteUser(username) {
    Users = Users.filter(
      (user) => user.username !== username
    );
}

