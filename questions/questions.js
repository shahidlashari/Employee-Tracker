class Questions{
    get mainMenu(){
        let choices = ["View All Employees",
        "View Departments",
        "View Roles",
        "View Utilized Budget of Company",
        "View Utilized Budget by Department",
        "Update Employee Role",
        "View employees by Manager",
        "Add an Employee",
        "Add a Department",
        "Add a Role",
        "Remove an Employee",
        "Remove a Department",
        "Remove a Role",
        "Quit"];
        return {
            type:"list",
            message:"Main Menu:",
            choices: choices,
            name:"choice",
            pageSize: choices.length 
        };
    }
    get addDepartment(){
        return {
            type: "input",
            message: "What is the name of the department?",
            name:"department"
        };
    }
    get addRole(){
        return [{
            type: "input",
            message: "What is the title of the role?",
            name:"title"
        },
        {
            type:"number",
            message:"What is the salary for this role?",
            name:"salary"
        },
        {
            type:"list",
            message:"What is the department this role belongs to?",
            name:"department",
            choices:[]
        }];
    }
    get addEmployee(){
        return [{
            type: "input",
            message: "What is the first name of the employee?",
            name:"first_name"
        },
        {
            type:"input",
            message:"What is the last name of the employee?",
            name:"last_name"
        },
        {
            type:"list",
            message:"What is the role of the employee?",
            name:"role",
            choices:[]
        },
        {
            type:"list",
            message: "who is this employees manager?",
            name:"manager",
            choices:[]
        }];
    }
    get deleteEmployee(){
        return {
            type: "list",
            message: "Which employee would you like to remove?",
            choices:[],
            name:"employee"
        };
    }
    get deleteRole(){
        return {
            type: "list",
            message: "Which role would you like to remove?",
            choices:[],
            name:"role"
        };
    }
    get deleteDepartment(){
        return {
            type: "list",
            message: "Which department would you like to remove?",
            choices:[],
            name:"department"
        };
    }
    get updateEmployeeRole(){
        return [{
            type: "list",
            message: "Which employee would you like to update?",
            choices:[],
            name:"employee"
        },
        {
            type:"list",
            message:"Choose a new role for the employee",
            choices:[],
            name:"role"
        }];
    }
    get confirmInput(){
        return {
            type: "confirm",
            message: "",
            name:"confirm"
        }
    }
}

module.exports = Questions;