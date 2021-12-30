/*
TO DO:
-----
READ ALL COMMENTS AND REPLACE VALUES ACCORDINGLY
*/

const mysql = require("mysql");
// const bcrypt = require('bcrypt');

const dbCon = mysql.createConnection({
    host: "cse-mysql-classes-01.cse.umn.edu",
    user: "C4131F21U17", // replace with the database user provided to you
    password: "319", // replace with the database password provided to you
    database: "C4131F21U17", // replace with the database user provided to you
    port: 3306
});

console.log("Attempting database connection");
dbCon.connect(function(err) {
    if (err) {
        throw err;
    }

    console.log("Connected to database!");

    // const saltRounds = 10;
    // const myPlaintextPassword = 'tango'; // here is your password
    // const passwordHash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

    const rowToBeInserted = {
        event_day: 'Friday',
        event_event: 'hw6 due second event', 
        event_start: '18:00', 
        event_end:'20:00',
        event_location:'cuffman',
        event_phone:'512-232-2323',
        event_info:'dont know how to do',
        event_url:'www.google.com'
    };

    console.log("Attempting to insert record into tbl_events");
    dbCon.query('INSERT tbl_events SET ?', rowToBeInserted, function(err, result) {
        if (err) {
            throw err;
        }
        console.log("Table record inserted!");
    });

    dbCon.end();
});