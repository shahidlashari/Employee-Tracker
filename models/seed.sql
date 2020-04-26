use employee_db;
insert into department (name) values 
("Human Resources"),
("IT"),
("Sales"),
("Accounting"),
("Logistics"),
("Payroll");

insert into role (title, salary, department_id) values
("Receptionist", 40000, 1),
("Office Culture Manager",65000,1),
("IT Manager",65000,2),
("Full Stack Developer",90000, 2),
("Database Admin",65000,2),
("Prodcut Specialist", 66000,2),
("Fulfillment Director", 70000, 3),
("President of Sales",115000,3),
("Accounts Receivable Analyst",60000,4),
("Accounts Payable Analyst",60000,4),
("Senior Accountant",90000,4),
("Logistics Manager",80000,5),
("Payroll Administrator",55000,6); 

insert into employee (first_name, last_name, role_id, manager_id) values
("James", "Smith",3,null),
("Anissa","Garcia",5,null),
("James ", "Barzetti",6,null),
("Belenos","Schnieder",2,1),
("Johnson","Assenberg",1,2),
("Mathias","Lowry",5,null),
("Joaquin","Jokinen",6,null),
("David","Ventura",7,null),
("Robert ","Martinez",4,null),
("Kamryn","Kinley",5,1),
("Astra","Smith",2,2),
("Michael","Muller",4,4);