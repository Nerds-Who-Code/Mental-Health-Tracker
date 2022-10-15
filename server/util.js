
// UTILITY FUNCTIONS

// This function transforms a date object to a string format.
// date is a Date object. 
// To format today's date, input (new Date()) as the first parameter
// seperator specifies the character to seperate the dates.
// format can either be 3 formats and will specify in which format the date string will be returned
// "YYYY-MM-DD"
// "DD-MM-YYYY"
// "MM-DD-YYYY"
function formatDateToStr(date, format="DD-MM-YYYY", seperator="-") {
    switch(format) {
        case "YYYY-MM-DD":
            return (date.getFullYear() + seperator + (date.getMonth()+1) + seperator + date.getDate());
        case "DD-MM-YYYY":
            return (date.getDate() + seperator + (date.getMonth()+1) + seperator + date.getFullYear());
        case "MM-DD-YYYY":
            return ((date.getMonth()+1) + seperator + date.getDate() + seperator + date.getFullYear());
        default: 
            return "Error: Date format not correct."
    }
}

// Returns a random number in string format containing the digits 0-9, where the 1st digit is never 0.
// The amount of difits is deterimined by the numLength. (Default = 32)
// With numLength=32 the chance of generating an identical ID for 2 different function calls is extremely unlikely.
// The lower numLength the more likely 2 identical ID's will be generated.
function generateID(numLength=32) {
    let digits = "0123456789";
    let randNum = "";
    for (let i = 0; i < numLength; i++) {
        if (i === 0) {
            //Prevent first digit from being zero
            randNum += digits[Math.floor(Math.random() * (digits.length - 1 + 1)) + 1];
        }
        randNum += digits[Math.floor(Math.random() * digits.length)];
    }
    return randNum;
}

console.log(parseInt(generateID()));

//Export all the functions
module.exports = 
{
    formatDateToStr,
    generateID
};

