//Packages 
const inquirer = require("inquirer");
const mysql = require("mysql2");
const questions = require("./questions");
const consoleTable = require('console.table');

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
//initial function that will input the  user what they would like to do 
start()
async function start() {

    const results = await inquirer.prompt(questions.actionList);
    switch (results.actionList) {
        case 'Add new employee': 
            addEmployee();
            break;
        case 'View all employees': 
            viewAll();
            break;
        case 'View employees by department':
            viewBydepartment();
            break;
        case 'Update employee role': 
            updateRole();
            break;
        case 'View all roles':
            viewAllRoles(); 
            break;
        case "Add role":
            addRole(); 
            break;
        case 'View all departments':
            viewAlldepartments(); 
            break;
        case 'Add department':
            addDpt(); 
            break;

        default:
            connection.end();
            break;

    }
}

