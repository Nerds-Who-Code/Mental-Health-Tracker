
// THIS IS JUST MOCK DATA FOR TESTING AND DEVELOPMENT PURPOSES

var USERS = [
    {
        userId: 2,
        name: "Elder Gnome",
        username: "elderGnome",
        email: "eldergnome@example.com",
        password: "HAHAHAHA",
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
        password: "POKPOKPOK",
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
        password: "BRAINS!",
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
        password: "123456789",
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
        password: "987654321",
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
        password: "test",
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
    }
];

export default USERS;
