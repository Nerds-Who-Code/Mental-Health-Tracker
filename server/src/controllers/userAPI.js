//import the bcrypt library for hashing functions
const bcrypt = require("bcrypt"); 
//import connection for PostGreSQL
const pool = require("../db_connection.js");
//Import utility functions
const { formatDateToStr, genUUID } = require("../util.js");
//Import entryAPI
const {} = require("./entryAPI.js");

//returns null if user not found
//returns uuid of user if found
async function getUserID(username) {
    let result = await pool.query(
        `
        SELECT user_id
        FROM users
        WHERE username = $1
        `,
        [username]);

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }
    //User not found
    if (!result.rows || !result.rows.length) {
        console.log(`user: ${username} not found in database.`);
        return null;
    }

    return result.rows[0].user_id;
}

//Returns full_name, age, email
//Returns null if user not found
async function getUserBasicInfo(username) {
    let result = await pool.query(
    `
    SELECT full_name, age
    FROM users
    WHERE username = $1
    `,
    [username]);

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }
    //User not found
    if (!result.rows || !result.rows.length) {
        console.log(`user: ${username} not found in database.`);
        return null;
    }

    return result.rows[0];
}

//username, user_id, account_creation_date can never be changed
//This function does not allow password changes
//to change last login user updateLastLogin function
//Allowed values to be changed in this function: email, full_name, age
//return true if user updated
//return null if user not found
async function updateUser(username, values)
{
    let result = null;
    //change email
    if ("email" in values) {
        result = await pool.query(
            `
            UPDATE users
            SET email = $1
            WHERE username = $2
            `,
            [values.email, username]);
    }

    //change full_name
    if ("full_name" in values) {
        result = await pool.query(
            `
            UPDATE users
            SET full_name = $1
            WHERE username = $2
            `,
            [values.full_name, username]);
    }

    //change age
    if ("age" in values) {
        result = await pool.query(
            `
            UPDATE users
            SET age = $1
            WHERE username = $2
            `,
            [values.age, username]);
    }

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }

    //User not found
    if (!result.rows || !result.rows.length) {
        console.log(`user: ${username} not found in database.`);
        return null;
    }

    return true;
}

//return true if last login date updated
//return null if user not found
async function updateLastLogin(username) {
    let newLoginDate = formatDateToStr(new Date(), "YYYY-MM-DD");
    let result = await pool.query(
        `
        UPDATE users
        SET last_login_date = $1::date
        WHERE username = $2
        `,
        [newLoginDate, username]);

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }
    //User not found
    if (!result.rows || !result.rows.length) {
        console.log(`user: ${username} not found in database.`);
        return null;
    }

    return true;
}

//change password of a user
//returns true if password changed
async function changePassword(username, newPassword) {
    //First hash the password with bcrypt before creating user
    //Only the hash is stored in the database. The plaintext password is never stored.
    try 
    {
        // generate the salt. The default salt rounds is 10.
        const salt = await bcrypt.genSalt(10);
        // create the hash (convert plaintext password to a hash)
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // Replace the plaintext password of the user with their hashed version.
        newPassword = hashedPassword;
    } 
    catch (error) 
    {
        console.log(error);
        return error;
    }

    //Update the password
    let result = await pool.query(
        `
        UPDATE users
        SET user_password = $1
        WHERE username = $2
        `,
        [newPassword, username]);

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }
    //User not found
    if (!result.rows || !result.rows.length) {
        console.log(`user: ${username} not found in database.`);
        return null;
    }

    return true;
}

//Returns true if password matches, returns false if not, returns null if user not found 
async function userAuthenthicate(username, password) {
    let result = await pool.query(
        `
        SELECT user_password
        FROM users
        WHERE username = $1
        `,
        [username]);

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }
    //User not found
    if (!result.rows || !result.rows.length) {
        console.log(`user: ${username} not found in database.`);
        return null;
    }
    // Use bycrypt to hash the plaintext password and see if it matches with the hash in the database
    // First argument is the plainttext password, the 2nd argument is the hash of that password.
    try 
    {
        const isPasswdEqual = await bcrypt.compare(password, result.rows[0].user_password);
        if (isPasswdEqual === false) {
            console.log("Password wrong");
            return false;
        }
        console.log("Password matches");
        return true;
    }
    catch (error)
    {
        console.log(e);
        return e;
    }
}

//Checks if the given email exists in the database
//Returns found email if yes, returns null if not.
async function checkEmailExists(email) {
    let result = await pool.query(
        `
        SELECT email
        FROM users
        WHERE email = $1
        `,
        [email]);

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }
    //e-mail not found
    if  (!result.rows || !result.rows.length) {
        return null;
    }
    //e-mail found
    return result.rows[0].email;
}

//returns null if user already exists
//returns true if user is created
async function createUser(userData) {
    //First check if the user already exists
    let userID = await getUserID(userData.username);
    if (userID !== null) {
        return null;
    }
    //User can be created
    else 
    {
        //First hash the password with bcrypt before creating user
        //Only the hash is stored in the database. The plaintext password is never stored.
        try 
        {
            // generate the salt. The default salt rounds is 10.
            const salt = await bcrypt.genSalt(10);
            // create the hash (convert plaintext password to a hash)
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            // Replace the plaintext password of the user with their hashed version.
            userData.password = hashedPassword;
        } 
        catch (error) 
        {
            console.log(error);
            return error;
        }
        
        //Set the user account creation date (last login date will be same as creation date)
        let creation_date = formatDateToStr(new Date(), "YYYY-MM-DD");
        //Add the new user to the database
        let result = await pool.query(
            `
            INSERT INTO users(user_id, username, email, user_password, full_name, age, last_login_date, account_creation_date)
            VALUES (
                $1::uuid,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7::date,
                $8::date
            )
            `,
            [genUUID(), userData.username, userData.email, userData.password, userData.name, userData.age, creation_date, creation_date]);
    
        if (!result) {
            let err = new Error(`Error: SQL query failed.`);
            console.log(err);
            return err;
        }
        console.log(`New user created with username: ${userData.username}`);
        return true;
    }
}

//Delete a user and all its data
//Returns null if user not found
//Returns true if user deleted
//NOT COMPLETE YET
async function deleteUser(username)
{
    //First check if the exists
    let userID = await getUserID(userData.username);
    if (userID === null) {
        return null;
    }

    //Get all the entry IDs to delete



    //Delete user
    let result = await pool.query(
        `
        DELETE FROM users

        
        `,
        []);

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }

    //user deleted
    console.log(`User with ${username} deleted.`);
    return true;
}

async function test() {
    console.log('testing...');
    let result = await updateUser("test12dsd3", {
                            full_name: "Santa man",
                            email: "test@example.com",
                            }
    );
    console.log(result);
    console.log("Done.");
}

test();

//Export all the functions
module.exports = 
{
    getUserID,
    getUserBasicInfo,
    updateUser,
    updateLastLogin,
    changePassword,
    userAuthenthicate,
    checkEmailExists,
    createUser,
    deleteUser
};
