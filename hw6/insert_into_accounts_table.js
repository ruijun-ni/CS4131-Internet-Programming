/*
TO DO:
-----
READ ALL COMMENTS AND REPLACE VALUES ACCORDINGLY
*/

const mysql = require("mysql");
const bcrypt = require('bcrypt');

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

    const saltRounds = 10;
    const myPlaintextPassword = 'tango'; // here is your password
    const passwordHash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

    const rowToBeInserted = {
        acc_name: 'charlie', // replace with acc_name chosen by you OR retain the same value
        acc_login: 'charlie', // replace with acc_login chosen by you OR retain the same value
        acc_password: passwordHash // replace with acc_password chosen by you OR retain the same value
    };

    console.log("Attempting to insert record into tbl_accounts");
    dbCon.query('INSERT tbl_accounts SET ?', rowToBeInserted, function(err, result) {
        if (err) {
            throw err;
        }
        console.log("Table record inserted!");
    });

    dbCon.end();
});