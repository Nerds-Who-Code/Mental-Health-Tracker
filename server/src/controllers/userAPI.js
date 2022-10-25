//import the bcrypt library for hashing functions
const bcrypt = require("bcrypt"); 
//import connection for PostGreSQL
const pool = require("../db_connection.js");
//Import utility functions
const { formatDateToStr, genUUID } = require("../util.js");

//Returns user_id, usrname of user if found
//returns null if user not found
//returns error if error
async function checkUserExists(userID) {
    let result = await pool.query(
        `
        SELECT user_id, username
        FROM users
        WHERE user_id = $1
        `,
        [userID]);

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }
    //user not found
    if  (!result.rows || !result.rows.length) {
        return null;
    }

    return result.rows[0];
}

//Get the username by the provided userID
async function getUserNameByID(userID) {
    let result = await pool.query(
        `
        SELECT username
        FROM users
        WHERE user_id = $1
        `,
        [userID]);

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }
    //user not found
    if  (!result.rows || !result.rows.length) {
        return null;
    }

    return result.rows[0].username;
}

//This is similar to checkUserExists except that username is used instead of user_id
//This function assumes the userID is not known yet, but username is.
//returns null if user not found
//returns uuid of user if found
//returns error if error
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
async function getUserBasicInfo(userID) {
    let result = await pool.query(
    `
    SELECT full_name, age
    FROM user_info
    WHERE user_id = $1
    `,
    [userID]);

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
        //First check if the email already exists in the database
        let isEmailExist = await checkEmailExists(values.email);
        if (isEmailExist === false)
        {
            result = await pool.query(
                `
                UPDATE users
                SET email = $1
                WHERE username = $2
                `,
                [values.email, username]);
        }
    }

    //change full_name
    if ("full_name" in values) {
        let userID = await getUserID(username);
        result = await pool.query(
            `
            UPDATE user_info
            SET full_name = $1
            WHERE user_id = $2
            `,
            [values.full_name, userID]);
    }

    //change age
    if ("age" in values) {
        let userID = await getUserID(username);
        result = await pool.query(
            `
            UPDATE user_info
            SET age = $1
            WHERE user_id = $2
            `,
            [values.age, userID]);
    }

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }

    return true;
}

//return true if last login date updated
//return null if user not found
async function updateLastLogin(userID) {
    let newLoginDate = formatDateToStr(new Date(), "YYYY-MM-DD");
    let result = await pool.query(
        `
        UPDATE user_metadata
        SET last_login_date = $1::date
        WHERE user_id = $2
        `,
        [newLoginDate, userID]);

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }
    //This code is not neccesery in this function?
    //User not found
    // if (!result.rows || !result.rows.length) {
    //     console.log(`user: ${userID} not found in database.`);
    //     return null;
    // }

    return true;
}

//change password of a user
//This function assumes the user is already authorized to do so
//returns true if password changed, return false if not
async function changePassword(username, newPassword) {
    //First hash the password with bcrypt before changing passowrd
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
        return false;
    }

    return true;
}

//Returns user_id and username if password matches, 
//returns false if not, 
//returns null if user not found 
//returns error if error
async function userAuthenthicate(username, password) {
    let result = await pool.query(
        `
        SELECT user_id, user_password
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
            return false;
        }
        //return result.rows[0].user_id;
        return {
            user_id: result.rows[0].user_id,
            username: username
        };
    }
    catch (error)
    {
        console.log(error);
        return error;
    }
}

//Checks if the given email exists in the database
//Returns true if yes, returns false if not.
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
        return false;
    }
    //e-mail found
    return true;
}

//returns null if user already exists
//returns true if user is created
async function createUser(userData) {
    //First check if the user already exists
    let existing_userID = await getUserID(userData.username);
    if (existing_userID !== null) {
        return null;
    }
    //Check if e-mail is already in use.
    let isEmailExist = await checkEmailExists(userData.email);
    if (isEmailExist === true) {
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
        //Create the unique user id (can never be changed)
        let userID = genUUID();
        //Set the user account creation date (last login date will be same as creation date)
        let creation_date = formatDateToStr(new Date(), "YYYY-MM-DD");
        //Add the new user to the database
        //Add core user data
        let core = await pool.query(
            `
            INSERT INTO users(user_id, username, email, user_password)
            VALUES (
                $1::uuid,
                $2,
                $3,
                $4
            )
            `,
            [userID, userData.username, userData.email, userData.password]);
    
        //Add user info
        let info = await pool.query(
        `
        INSERT INTO user_info(user_id, full_name, age)
        VALUES (
            $1::uuid,
            $2,
            $3
        )
        `,
        [userID, userData.name, userData.age]);

        //Add user metadata
        let metadata = await pool.query(
        `
        INSERT INTO user_metadata(user_id, last_login_date, account_creation_date)
        VALUES (
            $1::uuid,
            $2::date,
            $3::date
        )
        `,
        [userID, creation_date, creation_date]);

        if (!core || !info || !metadata) {
            let err = new Error(`Error: SQL query failed.`);
            console.log(err);
            return err;
        }
        
        console.log(`New user created with username: ${userData.username}`);
        return true;
    }
}

//Delete a user and all its data
//NOTE: When a user row is deleted in PSQL, 
//then all relationship(references) rows in other tables will be automatically deleted
//Returns null if user not found
//Returns true if user deleted
async function deleteUser(username)
{
    //First check if the user the exists
    let userID = await getUserID(username);
    if (userID === null) {
        return null;
    }
    //Delete user
    let result = await pool.query(
        `
        DELETE FROM users
        WHERE username = $1
        `,
        [username]);

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }
    //user deleted
    console.log(`User with ${username} deleted.`);
    return true;
}

//Export all the functions
module.exports = 
{
    checkUserExists,
    getUserNameByID,
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
