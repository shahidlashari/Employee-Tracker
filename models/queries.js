const connection = require('../config/connection')

class Queries {

    async getAllDepartments() {


        return new Promise((resolve, reject) => {

            let query = "select * from department";

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }
    async getAllDepartmentNames() {


        return new Promise((resolve, reject) => {

            let query = "select name from department";

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async getAllEmployees() {


        return new Promise((resolve, reject) => {

            let query = "select * from employee";

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async getAllEmployeeNames() {


        return new Promise((resolve, reject) => {

            let query = "select id, first_name,last_name from employee";

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async getAllEmployeesFullData() {


        return new Promise((resolve, reject) => {

            let query = `select  e.id,
            first_name,
            last_name,
            r.title,
            r.salary,
            (select concat(e2.first_name,' ',e2.last_name) from employee as e2 where e.manager_id = e2.id) as 'manager',
            d.name AS 'department'
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id`;

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async salaryOfAllEmployees() {


        return new Promise((resolve, reject) => {

            let query = `SELECT concat('$', format(sum(salary), 2)) AS "Total Utilized Budget"
            FROM role WHERE salary = salary;`;

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async getAllManagerNames() {


        return new Promise((resolve, reject) => {

            let query = `select distinct id,
            concat(first_name, ' ',last_name) as 'name'          
            from employee
            where id in (select manager_id from employee where manager_id is not null)`;

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async getEmployeeByName(fullName) {


        return new Promise((resolve, reject) => {

            let query = `select e.id,
            first_name,
            last_name,
            r.title,
            r.salary,
            (select concat(e2.first_name,' ',e2.last_name) from employee as e2 where e.manager_id = e2.id) as 'manager',
            d.name
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id
            where concat(first_name, ' ',last_name) = '${fullName}'`;

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async getEmployeeByID(id) {


        return new Promise((resolve, reject) => {

            let query = `select  e.id,
            first_name,
            last_name,
            r.title,
            r.salary,
            (select concat(e2.first_name,' ',e2.last_name) from employee as e2 where e.manager_id = e2.id) as 'manager',
            d.name
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id
            where e.id = ${id}`;

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async getEmployeesByDepartment(department) {


        return new Promise((resolve, reject) => {

            let query = `select  e.id,
            first_name,
            last_name,
            r.title,
            r.salary,
            (select concat(e2.first_name,' ',e2.last_name) from employee as e2 where e.manager_id = e2.id) as 'manager'            
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id
            where d.name = '${department}'`;

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async getSalaryByDepartment(department) {
        return new Promise((resolve, reject) => {
            let query = `SELECT concat('$',format(sum(salary), 2)) AS "Dept Total Salary" FROM role where department_id = '${department}'`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async getEmployeesByManager(manager) {


        return new Promise((resolve, reject) => {

            let query = `select  e.id,
            first_name,
            last_name,
            r.title,
            r.salary,          
            d.name
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id
            where manager_id = ${manager.id}`;

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async getEmployeesByRole(role) {


        return new Promise((resolve, reject) => {

            let query = `select  e.id,
            first_name,
            last_name,
            r.salary,
            (select concat(e2.first_name,' ',e2.last_name) from employee as e2 where e.manager_id = e2.id) as 'manager',            
            d.name as 'department'
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id
            where r.title = '${role}'`;

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async getAllRoles() {


        return new Promise((resolve, reject) => {

            let query = "select * from role";

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async getAllRolesWithDepartmentName() {


        return new Promise((resolve, reject) => {

            let query = `select r.id, title, salary, d.name as 'department'
                        from role as r
                        left join department as d on r.department_id = d.id`;

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res);
            });

        });
    }

    async updateEmployeeRole(employee, role) {


        return new Promise((resolve, reject) => {

            let query = `update employee set role_id = ${role.id}
            where id = ${employee.id} `;

            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve("update successful");
            });

        });
    }

    async addEmployee(employee) {


        return new Promise((resolve, reject) => {

            let query = `insert into employee
                        (first_name, last_name, role_id, manager_id)
                        values ('${employee.first_name}',
                                '${employee.last_name}',
                                ${employee.role_id},
                                ${employee.manager_id})`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res.insertId);
            });

        });
    }

    async addRole(role) {


        return new Promise((resolve, reject) => {

            let query = `insert into role
                        (title, salary, department_id)
                        values ('${role.title}',
                                ${role.salary},
                                ${role.department_id})`;
            connection.query(query, (err, res) => {
                if (err) throw err;
                resolve(res.insertId);
            });

        });
    }

    async addDepartment(department) {


        return new Promise((resolve, reject) => {

            let query = `insert into department
                        (name)
                        values ('${department}')`;
            connection.query(query, (err, res) => {

                if (err) throw err;
                resolve(res.insertId);
            });

        });
    }
    async removeDepartment(id) {


        return new Promise((resolve, reject) => {

            let query = `delete from department where id = ${id}`;
            connection.query(query, (err, res) => {

                if (err) throw err;
                resolve(res);
            });

        });
    }
    async removeEmployee(id) {


        return new Promise((resolve, reject) => {

            let query = `delete from employee where id = ${id}`;
            connection.query(query, (err, res) => {

                if (err) throw err;
                resolve(res);
            });

        });
    }
    async removeRole(id) {


        return new Promise((resolve, reject) => {

            let query = `delete from role where id = ${id}`;
            connection.query(query, (err, res) => {

                if (err) throw err;
                resolve(res);
            });

        });
    }

}
module.exports = Queries;