
// THIS IS JUST MOCK DATA FOR TESTING AND DEVELOPMENT PURPOSES

// All the passwords are stored as hashes by BCRYPT
// For testing purposes the plaintext password is written in a comment after each password

var USERS = [
    {
        userId: 2,
        name: "Elder Gnome",
        username: "elderGnome",
        email: "eldergnome@example.com",
        password: "$2b$10$3lxOLSkbLYe3QP/ro2TZieBay3hq/.RcFWxEFC4/Dh1gVoedQLH1u", //"HAHAHAHA"
        age: 99,
        lastLogin: "01-05-2022",
        isLoggedIn: false,
        entries: [
            {
                entryId: 0,
                date: "30-04-2022",
                type: "stress",
                level: 6,
                event: ["work"],
                notes: "Too much coding."
            },
            {
                entryId: 1,
                date: "01-05-2022",
                type: "anxiety",
                level: 8,
                event: ["family"],
                notes: "Family is visiting."
            }
        ]
    },
    {
        userId: 3,
        name: "Chicken",
        username: "chicken656",
        email: "chicken656@example.com",
        password: "$2b$10$q3C82CurBbZN.LMOGbfAvOAo4pO19/yg2s0x0jUPl.CARpWAsJINa", //"POKPOKPOK"
        age: 13,
        lastLogin: "07-06-2022",
        isLoggedIn: false,
        entries: [
            {
                entryId: 0,
                date: "06-06-2022",
                type: "depression",
                level: 4,
                event: ["trauma"],
                notes: "Someone stole my eggs."
            },
            {
                entryId: 1,
                date: "07-06-2022",
                type: "anxiety",
                level: 8,
                event: ["significant"],
                notes: "When will my egg come out?."
            }
        ]
    },
    {
        userId: 4,
        name: "Clarita",
        username: "zombie999",
        email: "zomvie999@example.com",
        password: "$2b$10$7XIFVgPxHKkQ3aEzdC22N.TwwG8rePEKG3UGNPgA.QmI/Qc1fDq1S", //"BRAINS!"
        age: 55,
        lastLogin: "23-04-2022",
        isLoggedIn: false,
        entries: [
            {
                entryId: 0,
                date: "22-04-2022",
                type: "anxiety",
                level: 9,
                event: ["work"],
                notes: "Where are all the brains?"
            },
            {
                entryId: 1,
                date: "23-04-2022",
                type: "stress",
                level: 8,
                event: ["trauma"],
                notes: "Somebody is killing the zombies. Am I next?"
            }
        ]
    },
    {
        userId: 5,
        name: "Baby bird",
        username: "babybird123",
        email: "babybird@example.com",
        password: "$2b$10$NhHBbZ0bPHY6Z0t8wAz4guDtCvblY33dgdgxj3i0mFBaeTxNMIHKu", //"123456789"
        age: 25,
        lastLogin: "11-05-2022",
        isLoggedIn: false,
        entries: [
            {
                entryId: 0,
                date: "10-05-2022",
                type: "anxiety",
                level: 10,
                event: ["family"],
                notes: "I need food, where is mommy?"
            },
            {
                entryId: 1,
                date: "11-05-2022",
                type: "anxiety",
                level: 6,
                event: ["trauma"],
                notes: "I can hear a cat..."
            }
        ]
    },
    {
        userId: 6,
        name: "LOL CAT",
        username: "lolcat987",
        email: "lolcat@example.com",
        password: "$2b$10$xIrZrys8h4RjJ7L4nYlxZeVx38yt6IbXEWLp9hdjf682tEeDI276K", //"987654321"
        age: 33,
        lastLogin: "20-03-2022",
        isLoggedIn: false,
        entries: [
            {
                entryId: 0,
                date: "19-03-2022",
                type: "anxiety",
                level: 1,
                event: ["unknown"],
                notes: "I am a happy cat. Maybe I eat a baby bird today."
            }
        ]
    },
    {
        userId: 99,
        name: "Simple Test User",
        username: "test123",
        email: "test123@example.com",
        password: "$2b$10$VzQhCKrOjYr.KSLQYfLB0.CnP3.SkCd/eN37xyvtdJmaTHalK.Bi6", //"test"
        age: 15,
        lastLogin: "25-06-2022",
        isLoggedIn: false,
        entries: [
            {
                entryId: 0,
                date: "19-06-2022",
                type: "anxiety",
                level: 2,
                event: ["unknown"],
                notes: "I am just a simple test user."
            }
        ]
    },
    {
        userId: 101,
        name: "DOOM",
        username: "doom123",
        email: "doom@example.com",
        password: "$2b$10$0mrgmTF/XOW71WbipWrqX.bzy2tDEgsfYBnP3sbDcyFh7Jw8MTOcS", //"doom"
        age: 51,
        lastLogin: "25-06-2022",
        isLoggedIn: false,
        entries: [
            {
                entryId: 0,
                date: "19-06-2022",
                type: "anxiety",
                level: 10,
                event: ["unknown"],
                notes: "THE DOOM IS COMING!"
            }
        ]
    }
];

//Export data
module.exports = USERS;

//JSON Test data for creating a new user. (For creating a new user with Postman API Tester)
/*
{
  "userId": 599,
  "name": "Tiny Mouse",
  "username": "tinyMouse",
  "email": "tinyMouse@example.com",
  "password": "PEEP",
  "age": 7,
  "lastLogin": "01-05-2022",
  "isLoggedIn": false,
  "entries": [
    {
      "entryId": 0,
      "date": "30-04-2022",
      "type": "stress",
      "level": 6,
      "event": [
        "work"
      ],
      "notes": "I AM A COOL NEW USER."
    },
    {
      "entryId": 1,
      "date": "01-05-2022",
      "type": "anxiety",
      "level": 8,
      "event": [
        "family"
      ],
      "notes": "I AM A NEW USER."
    }
  ]
}
*/


