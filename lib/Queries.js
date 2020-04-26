const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_db',
  }).promise();

class Queries {

    async getAllDepartments(){

        
        return new Promise((resolve,reject)=>{          
            
            let query = "select * from department";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }
    async getAllDepartmentNames(){

        
        return new Promise((resolve,reject)=>{          
            
            let query = "select name from department";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async getAllEmployees(){

        
        return new Promise((resolve,reject)=>{          
            
            let query = "select * from employee";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async getAllEmployeeNames(){

        
        return new Promise((resolve,reject)=>{          
            
            let query = "select id, first_name,last_name from employee";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async getAllEmployeesFullData(){

        
        return new Promise((resolve,reject)=>{          
            
            let query = `select  e.id,
            first_name,
            last_name,
            r.title,
            r.salary,
            (select concat(e2.first_name,' ',e2.last_name) from employee as e2 where e.manager_id = e2.id) as 'manager',
            d.name
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async getAllManagerNames(){

        
        return new Promise((resolve,reject)=>{          
            
            let query = `select distinct id,
            concat(first_name, ' ',last_name) as 'name'          
            from employee
            where id in (select manager_id from employee where manager_id is not null)`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async getEmployeeByName(fullName){

        
        return new Promise((resolve,reject)=>{          
            
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
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async getEmployeeByID(id){

        
        return new Promise((resolve,reject)=>{          
            
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
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async getEmployeesByDepartment(department){

        
        return new Promise((resolve,reject)=>{          
            
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
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async getEmployeesByManager(manager){

        
        return new Promise((resolve,reject)=>{          
            
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
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async getEmployeesByRole(role){

        
        return new Promise((resolve,reject)=>{          
            
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
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async getAllRoles(){

        
        return new Promise((resolve,reject)=>{          
            
            let query = "select * from role";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async getAllRolesWithDepartmentName(){

        
        return new Promise((resolve,reject)=>{          
            
            let query = `select r.id, title, salary, d.name as 'department'
                        from role as r
                        left join department as d on r.department_id = d.id`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }

    async updateEmployeeRole(employee,role){

        
        return new Promise((resolve,reject)=>{          
            
            let query = `update employee set role_id = ${role.id}
            where id = ${employee.id} `;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve("update successful");
            });    
             
        });
    }

    async addEmployee(employee){

        
        return new Promise((resolve,reject)=>{          
            
            let query = `insert into employee
                        (first_name, last_name, role_id, manager_id)
                        values ('${employee.first_name}',
                                '${employee.last_name}',
                                ${employee.role_id},
                                ${employee.manager_id})`;            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res.insertId);
            });    
             
        });
    }

    async addRole(role){

        
        return new Promise((resolve,reject)=>{          
            
            let query = `insert into role
                        (title, salary, department_id)
                        values ('${role.title}',
                                ${role.salary},
                                ${role.department_id})`;            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                resolve(res.insertId);
            });    
             
        });
    }

    async addDepartment(department){

        
        return new Promise((resolve,reject)=>{          
            
            let query = `insert into department
                        (name)
                        values ('${department}')`;            
            conn.query(query, (err,res)=>{
                
                if (err) throw err;
                resolve(res.insertId);
            });    
             
        });
    }
    async removeDepartment(id){

        
        return new Promise((resolve,reject)=>{          
            
            let query = `delete from department where id = ${id}`;            
            conn.query(query, (err,res)=>{
                
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }
    async removeEmployee(id){

        
        return new Promise((resolve,reject)=>{          
            
            let query = `delete from employee where id = ${id}`;            
            conn.query(query, (err,res)=>{
                
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }
    async removeRole(id){

        
        return new Promise((resolve,reject)=>{          
            
            let query = `delete from role where id = ${id}`;            
            conn.query(query, (err,res)=>{
                
                if (err) throw err;
                resolve(res);
            });    
             
        });
    }
    
}
module.exports = Queries;