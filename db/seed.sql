use employee_db;
insert into department (name) values 
("Human Resources"),
("IT"),
("Sales"),
("Accounting"),
("Logistics"),
("Payroll");

insert into role (title, salary, department_id) values
("Receptionist", 40000, 6),
("IT Manager",65000,2),
("Database Admin",65000,2),
("Payroll Administrator",55000,6),
("Office Culture Manager",65000,1),
("Fulfillment Director", 70000, 3),
("President of Sales",115000,3),
("Accounts Receivable Analyst",60000,4),
("Accounts Payable Analyst",60000,4),
("Project Accountant",80000,4),
("Senior Accountant",90000,4),
("Prodcut Specialist", 66000,2),
("Full Stack Developer",90000, 2); 

insert into employee (first_name, last_name, role_id, manager_id) values
("Annora", "Merrit",20,null),
("Anissa","Escarcega",18,null),
("Ikram", "Barzetti",19,null),
("Belenos","Schnieder",2,1),
("Eva","Assenberg",1,2),
("Mathias","Lowry",5,null),
("Joaquin","Jokinen",6,null),
("Kalman","Ventura",7,null),
("Yadira","Robert",8,null),
("Kamryn","Kinley",17,1),
("Astra","Pavic",13,2),
("Heli","Muller",15,4);