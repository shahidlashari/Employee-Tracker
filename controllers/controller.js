//imports
const Queries = require("../models/queries");
const Employee = require("./employee");
const Role = require("./role");
const Department = require("./department");
const inquirer = require('inquirer');
//load the Queries
const myQueries = new Queries();

class Controller {
    getAllDepartments() {
        return new Promise((resolve, reject) => {
            resolve(myQueries.getAllDepartments());
        });
    }
    viewAllRoles() {
        return new Promise((resolve, reject) => {
            myQueries.getAllRolesWithDepartmentName()
                .then(res => {
                    resolve(res);
                });
        });
    }
    getAllRoles() {
        return new Promise((resolve, reject) => {
            myQueries.getAllRoles()
                .then(res => {
                    resolve(res);
                });
        });
    }

    viewAllDepartments() {
        return new Promise((resolve, reject) => {
            myQueries.getAllDepartments()
                .then(res => {
                    resolve(res.map(({ name }) => {
                        return { name: name };
                    }));
                });
        });
    }
    getAllEmployeesFullData() {
        return new Promise((resolve, reject) => {
            resolve(myQueries.getAllEmployeesFullData());
        });
    }
    salaryOfAllEmployees() {
        return new Promise((resolve, reject) => {
            resolve(myQueries.salaryOfAllEmployees());
        });
    }
    getSalaryByDepartment() {
        return new Promise((resolve, reject) => {
            myQueries.getAllDepartments()
                .then(allDepartments => {
                    inquirer.prompt({
                        type: "list",
                        message: "Which department's salary would you like to see?",
                        choices: allDepartments.map(dept => `${dept.id} - ${dept.name}`),
                        name: "department"
                    }).then(answer => {
                        let { department } = answer
                        resolve(myQueries.getSalaryByDepartment(department));

                    });
                });

        });
    }

    getAllEmployees() {
        return new Promise((resolve, reject) => {
            resolve(myQueries.getAllEmployees());
        });
    }

    getAllManagerNames() {
        return new Promise((resolve, reject) => {
            resolve(myQueries.getAllManagerNames());
        });
    }
    getEmployeesByManager(manager) {
        return new Promise((resolve, reject) => {
            resolve(myQueries.getEmployeesByManager(manager));
        });
    }
    updateEmployeeRole(employee, role) {
        return new Promise((resolve, reject) => {
            resolve(myQueries.updateEmployeeRole(employee, role));
        });
    }
    async addRole(role) {
        return new Promise(async function (resolve, reject) {
            await myQueries.getAllRoles()
                .then(res => {
                    if (res.find(e => { (e.title === role.title && e.department_id === role.department_id) }) != null) {
                        resolve("A role with that title and department already exists");
                        return;
                    }
                    resolve(myQueries.addRole(role));
                });
        });
    }
    async deleteRole(role) {
        return new Promise(async function (resolve, reject) {
            myQueries.getAllRoles()
                .then(allRoles => {
                    inquirer.prompt({
                        type: "list",
                        message: "Which role would you like to remove?",
                        choices: allRoles.map(role => `${role.id} - ${role.title}`),
                        name: "role"
                    }).then(answer => {
                        let { role } = answer
                        let roleId = role.slice(0, 2).trim();
                        let removedData = new Promise(function (resolve, reject) {
                            myQueries.removeRole(roleId)
                                .then(res => {
                                    resolve(res);
                                });
                        });
                        if (removedData.affectedRows !== 0) {
                            resolve(`${role.substring(4).trim()}: Role has succesfully been removed!`);
                        }

                    });
                });
        });
    }

    async addEmployee(employee) {
        return new Promise(async function (resolve, reject) {
            await myQueries.getAllEmployees()
                .then(res => {
                    if (res.find(e => {
                        (e.first_name === employee.firstName
                            && e.last_name === employee.last_name
                            && e.role_id === employee.role_id)
                    }) != null) {
                        resolve("An employee with that name and role already exists");
                        return;
                    }
                    resolve(myQueries.addEmployee(employee));
                });
        });
    }
    async deleteEmployee(employee) {
        return new Promise(async function (resolve, reject) {
            await myQueries.getAllEmployees()
                .then(allEmployees => {
                    inquirer.prompt({
                        type: "list",
                        message: "Which employee would you like to remove?",
                        choices: allEmployees.map(emp => `${emp.id} - ${emp.first_name} ${emp.last_name}`),
                        name: "employee"
                    }).then(answer => {
                        let { employee } = answer
                        let empId = employee.slice(0, 2).trim();
                        let removedData = new Promise(function (resolve, reject) {
                            myQueries.removeEmployee(empId)
                                .then(res => {
                                    resolve(res);
                                });
                        });
                        if (removedData.affectedRows !== 0) {
                            resolve(`${employee.substring(4).trim()} has sucesfully been removed!`);
                        }
                    })

                });
        });
    }
    async addDepartment(department) {
        return new Promise(async function (resolve, reject) {
            await myQueries.getAllDepartmentNames()
                .then(res => {
                    if (res.indexOf(department) != -1) {
                        resolve("Departemnt already exists");
                        return;
                    }
                    resolve(myQueries.addDepartment(department));
                });
        });
    }

    async deleteDepartment(department) {
        return new Promise((resolve, reject) => {
            myQueries.getAllDepartments()
                .then(allDepartments => {
                    inquirer.prompt({
                        type: "list",
                        message: "Which department would you like to remove?",
                        choices: allDepartments.map(dept => `${dept.id} - ${dept.name}`),
                        name: "department"
                    }).then(answer => {
                        let { department } = answer
                        let deptId = department.slice(0, 2).trim();
                        let removedData = new Promise(function (resolve, reject) {
                            myQueries.removeDepartment(deptId)
                                .then(res => {
                                    resolve(res);
                                });
                        });
                        if (removedData.affectedRows !== 0) {
                            resolve(`${department.substring(4).trim()} Department has succesfully been removed!`);
                        }

                    });
                });
        });


    }
}


module.exports = Controller;