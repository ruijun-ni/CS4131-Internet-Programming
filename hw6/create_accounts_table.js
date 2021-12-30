/*
TO DO:
-----
READ ALL COMMENTS AND REPLACE VALUES ACCORDINGLY
*/

const mysql = require("mysql");

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

    const sql = `CREATE TABLE tbl_accounts (
        acc_id       INT NOT NULL AUTO_INCREMENT,
        acc_name     VARCHAR(20),
        acc_login    VARCHAR(20),
        acc_password VARCHAR(200),
        PRIMARY KEY (acc_id)
    )`;

    console.log("Attempting to create table: tbl_accounts");
    dbCon.query(sql, function(err, result) {
        if (err) {
            throw err;
        }
        console.log("Table tbl_accounts created");
    });

    dbCon.end();
});