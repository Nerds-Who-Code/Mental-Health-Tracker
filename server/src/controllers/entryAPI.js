//import connection for PostGreSQL
const pool = require("../db_connection.js");
//Import utility functions
const { formatDateToStr, genUUID } = require("../util.js");
//Import userAPI
const {getUserID} = require("./userAPI.js");

//get single entry from a user
//Return object:
/*
{
    entry_id: String,
    entry_date: Date,
    entry_type: String,
    entry_level: Integer,
    note: String,
    event: [ String, String ]
}
*/
async function getEntry(username, entryID) {
    let userID = await getUserID(username);
    let entryInfo = await pool.query(
        `
        SELECT entries.entry_id, entry_date, entry_type, entry_level, note
        FROM entries
        INNER JOIN entry_info ON entries.entry_id = entry_info.entry_id
        WHERE entries.user_id = $1
        AND entries.entry_id = $2
        `,
        [userID, entryID]);

    let entryEventsRaw = await pool.query(
        `
        SELECT entry_event
        FROM entries
        INNER JOIN entry_events ON entries.entry_id = entry_events.entry_id
        WHERE entries.user_id = $1
        AND entries.entry_id = $2
        `,
        [userID, entryID]);

    //Convert raw sql data to array
    let entryEvents = [];
    entryEventsRaw.rows.forEach(row => {
        entryEvents.push(row.entry_event);
    });
    //add the events to the entry info
    entryInfo.rows[0].event = entryEvents;
    //Change from date format to string format
    entryInfo.rows[0].entry_date = formatDateToStr(entryInfo.rows[0].entry_date);
    
    return entryInfo.rows[0];
}

//Get all entries of a user
//return null if entry or user not found
//return is an array with objects same as the return from getEntry()
async function getEntries(userID) {
    let entries = await pool.query(
        `
        SELECT entries.entry_id, entry_date, entry_type, entry_level, note
        FROM entries
        INNER JOIN entry_info ON entries.entry_id = entry_info.entry_id
        WHERE entries.user_id = $1
        `,
        [userID]);

    let eventsRaw = await pool.query(
        `
        SELECT entries.entry_id, entry_event
        FROM entries
        INNER JOIN entry_events ON entries.entry_id = entry_events.entry_id
        WHERE entries.user_id = $1;
        `,
        [userID]);

    
    entries.rows.forEach(row => {
        //make sure the entries have arrays first to hold the events
        row.event = [];
         //Change from date format to string format in each entry
        row.entry_date = formatDateToStr(row.entry_date);
    });
    //add the events to the appropriate entries (map events to entries)
    for (let i = 0; i < eventsRaw.rows.length; i++)
    {
        for (let j = 0; j < entries.rows.length; j++)
        {
            if (eventsRaw.rows[i].entry_id === entries.rows[j].entry_id)
            {
                entries.rows[j].event.push(eventsRaw.rows[i].entry_event);
            }
        }
    }

    return entries.rows;
}

//add entry for a user
//return entry info if entry added
async function addEntry(userID, entryData) {
    //Generate the unique identifier for the entry
    let entryID = genUUID();
    let entryDate = formatDateToStr(new Date(), "YYYY-MM-DD");
    let entry = await pool.query(
        `
        INSERT INTO entries(entry_id, user_id, entry_date)
        VALUES(
            $1::uuid,
            $2::uuid,
            $3::date
        )
        `,
        [entryID, userID, entryDate]);

    let entryInfo = await pool.query(
        `
        INSERT INTO entry_info(entry_id, entry_type, entry_level, note)
        VALUES(
            $1::uuid,
            $2,
            $3,
            $4
        )
        `,
        [entryID, entryData.type.toLowerCase(), entryData.level, entryData.notes]);

    let entryEvents = null;
    for (let i = 0; i < entryData.event.length; i++)
    {
        entryEvents = await pool.query(
            `
            INSERT INTO entry_events(entry_id, entry_event)
            VALUES(
                $1::uuid,
                $2
            )
            `,
            [entryID, entryData.event[i]]);

        if (!entryEvents) {
            let err = new Error(`Error: SQL query failed.`);
            console.log(err);
            return err;
        }
    }

    if (!entry || !entryInfo) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }

    //Entry created
    return {
        entry_id: entryID,
        entry_date: entryDate,
        entry_level: entryData.type,
        entry_type: entryData.level,
        event: entryData.event,
        note: entryData.notes,
    };
}

//Update entry of a user
//return null if entry or user not found
//return true if entry updated
async function updateEntry(username, entryID, values) {
    let userID = await getUserID(username);
    let result = null;
    //change type
    if ("type" in values) {
        result = await pool.query(
            `
            UPDATE entry_info
            SET entry_type = $1
            FROM entries
            WHERE entry_info.entry_id = $2
            AND entries.user_id = $3
            `,
            [values.type, entryID, userID]);
    }
    //change level
    if ("level" in values) {
        result = await pool.query(
            `
            UPDATE entry_info
            SET entry_level = $1
            FROM entries
            WHERE entry_info.entry_id = $2
            AND entries.user_id = $3
            `,
            [values.level, entryID, userID]);
    }
    //change note
    if ("notes" in values) {
        result = await pool.query(
            `
            UPDATE entry_info
            SET note = $1
            FROM entries
            WHERE entry_info.entry_id = $2
            AND entries.user_id = $3
            `,
            [values.notes, entryID, userID]);
    }
    //change events
    if ("event" in values) {
        for (let i = 0; i < values.event.length; i++)
        {
            result = await pool.query(
                `
                UPDATE entry_events
                SET entry_event = $1
                FROM entries
                WHERE entry_events.entry_id = $2
                AND entries.user_id = $3
                `,
                [values.event[i], entryID, userID]);
        }
    }

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }

    return true;
}

//Delete entry of a user
//return null if entry or user not found
//return entryID if entry deleted
async function deleteEntry(userID, entryID) {
    let result = await pool.query(
        `
        DELETE FROM entries
        WHERE user_id = $1
        AND entry_id = $2
        `,
        [userID, entryID]);

    if (!result) {
        let err = new Error(`Error: SQL query failed.`);
        console.log(err);
        return err;
    }
    //entry deleted
    return entryID;
}

//Export all the functions
module.exports = 
{
    getEntry,
    getEntries,
    addEntry,
    updateEntry,
    deleteEntry,
};


