//load dependencies 
const Controller = require('./controllers/controller');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const Questions = require('./questions/questions');

const myController = new Controller();
const questions = new Questions();
//welcome message and "loader"
function welcome(){
console.log("\x1b[1m", "\x1b[34m", "Welcome to Employee Tracker");
                
console.log("\x1b[1m", "\x1b[34m", "Loading Data");

    let duration = 0;
    let time = 250;
    let endTime = 2500;   

    let interval = setInterval(()=>{
        process.stdout.write('.');
        duration += time;
        if(duration == endTime ){
            clearInterval(interval);
           
        }
    }, time);
    setTimeout(() => {
        process.stdout.write('\033c');
        mainMenu();       
    }, endTime); 
}
//core application loop:
async function mainMenu(){

    await inquirer.prompt(questions.mainMenu)
    .then(async function(answers){
        switch(answers.choice){
            case "View All Employees":
                await getAllEmployees();                
                break;
            case "View Departments":
                await viewAllDepartments();                
                break;
            case "View Roles":
                await viewAllRoles();                
                break;
            case "View Utilized Budget of Company":
                await viewTotalUtilizedBudget();                
                break;
            case "View Utilized Budget by Department":
                await viewSalaryByDepartment();                
                break;
                
            case "View employees by Manager":
                await viewEmployeesByManager();
                break;
            case "Add a Department":
                await addDepartment();
                break;
            case "Add a Role":
                await addRole();
                break;
            case "Update Employee Role":
                await updateEmployeeRole();
                break;
            case "Add an Employee":
                await addEmployee();
                break;
            case "Remove an Employee":
                await deleteEmployee();
                break;
            case "Remove a Department":
                await deleteDepartment();
                break; 
            case "Remove a Role":
                await deleteRole();
                break; 
            case "Quit": 
            console.log("\x1b[31m", "Good Bye");    
                process.exit();
           
            default:
                return;
        }            
    });    
}

async function viewEmployeesByManager(){
    let managers;
    let managerList;

    await myController.getAllManagerNames()
    .then(res=>{
        managers = res; 
        managerList = managers.map(e => e.name);                    
        managerList.push("Cancel");                        
    });           
                 
    await inquirer.prompt({
        message:"Choose a manager:",
        type: "list",
        choices: managerList,
        name: "choice"
    }).then(async function(answer){
        switch (answer.choice){
        case "Cancel":
            //go back to previous menu
            break;
        default:
            //get the right manager from the list
            manager = managers.find(e => e.name === answer.choice);
            await myController.getEmployeesByManager(manager).then(res=>{
                displayResults(res);
            });
            break;
        }
        
    });
    mainMenu();
}

async function viewAllRoles(){
    await myController.viewAllRoles()
    .then(res =>{
        displayResults(res);
    });
    mainMenu();
}

async function viewAllDepartments(){
    await myController.getAllDepartments()
    .then(res=>{
        displayResults(res);
    });
    mainMenu();
}

async function getAllEmployees(){
    await myController.getAllEmployeesFullData()
    .then(res =>{
        displayResults(res);
    });
    mainMenu();
}
async function viewTotalUtilizedBudget(){
    await myController.salaryOfAllEmployees()
    .then(res =>{
        displayResults(res);
    });
    mainMenu();
}
async function viewSalaryByDepartment(){
    await myController.getSalaryByDepartment()
    .then(res =>{
        displayResults(res);
    });
    mainMenu();
}


async function deleteEmployee(){
    await myController.deleteEmployee()
    .then(res =>{
        displayResults(res);
    });
    mainMenu();
}

async function addDepartment(){
    
    await inquirer.prompt(questions.addDepartment)
    .then(async function(answer){        
        await myController.addDepartment(answer.department)
        .then(res=>{
            console.log(`New Department ID: ${res}`);
        });
    });
    
    mainMenu();

}
async function deleteDepartment(){
    await myController.deleteDepartment()
    .then(res =>{
        displayResults(res);
    });
    mainMenu();
}

async function addRole(){
    let q = questions.addRole;
    let departments;
    let departmentNames;
    
    await myController.getAllDepartments().then(res=>{
        departmentNames = res.map(e=>e.name);
        departments = res;
    });

    //set the list of choices
    q.find(e=>e.name === "department").choices = departmentNames;
    q.find(e=>e.name === "department").pageSize = departmentNames.length;

    await inquirer.prompt(q)
    .then(async function(answers){
        
        let role = {
            title: answers.title,
            salary: answers.salary,
            department_id: departments.find(e=>e.name === answers.department).id
        };

        await myController.addRole(role)
        .then(res=>{
            console.log(res);
        });

    });
    
    mainMenu();
}
async function deleteRole(){
    await myController.deleteRole()
    .then(res =>{
        displayResults(res);
    });
    mainMenu();
}

async function updateEmployeeRole(){
    let q = questions.updateEmployeeRole;
    let confirm = questions.confirmInput;
    let roles;
    let roleNames;
    let employees;
    let employeeNames;
    let employee;
    let role;

    await myController.getAllRoles().then(res=>{
        roles = res;
        roleNames = res.map(e=>e.title);
    });

    await myController.getAllEmployees().then(res=>{
        employees = res;
        employeeNames = res.map(e => `${e.first_name} ${e.last_name}`);
    });

    q.find(e=>e.name === "employee").choices = employeeNames;
    q.find(e=>e.name === "employee").pageSize = employeeNames.length;
    q.find(e=>e.name === "role").choices = roleNames;
    q.find(e=>e.name === "role").pageSize = roleNames.length;
    
    await inquirer.prompt(q)
    .then(async function(answers){
    
        employee = employees.find(e=> `${e.first_name} ${e.last_name}` === answers.employee);
        role = roles.find(e=>e.title === answers.role);

    });

    confirm.message = `You would like to update the role of ${employee.first_name} ${employee.last_name} to ${role.title}?`;

    await inquirer.prompt(confirm)
    .then(async function(answer){
        if(answer.confirm){
            await myController.updateEmployeeRole(employee,role)
            .then(res=>{
                console.log(res);
                return;
            });
        }
    });

    mainMenu();

}

async function addEmployee(){
    let q = questions.addEmployee;
    let managers;
    let managerNames;
    let roles;
    let roleNames;
    
    await myController.getAllManagerNames().then(res=>{
        managerNames = res.map(e=>e.name);
        managers = res;
        managerNames.push("None");
    });

    await myController.getAllRoles().then(res=>{
        roles = res;
        roleNames = res.map(e=>e.title);
    });

    q.find(e => e.name === "role").choices = roleNames;
    q.find(e => e.name === "role").pageSize = roleNames.length;
    q.find(e => e.name === "manager").choices = managerNames;
    q.find(e => e.name === "manager").pageSize = managerNames.length;
    
    await inquirer.prompt(q)
    .then(async function(answers){
        
        let role_id = roles.find(e=>e.title === answers.role).id;
        
        let manager_id = answers.manager === "None"?null: managers.find(e => e.name === answers.manager).id;
        
        let employee = {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: role_id,
            manager_id: manager_id 
        };

        await myController.addEmployee(employee)
        .then(res=>{
            console.log("New Employee ID: " + res);
        });

    });
    
    mainMenu();
}

function displayResults(res){
    console.log("");
    console.table(res);
    console.log("");
}

welcome();