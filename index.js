//Packages 
const inquirer = require("inquirer");
const mysql = require("mysql2");
// const questions = require("./questions");
// const consoleTable = require('console.table');

//setting up the connection with the DB
const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "organization"
});

connection.connect(function (err) {
    if (err) throw err;
   
});

