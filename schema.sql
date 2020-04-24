DROP DATABASE IF EXISTS organization;
CREATE DATABASE organization;
USE organization;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);


CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50)NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY(department_id) REFERENCES department (id)
   
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL,
    role_id INT NOT NULL, 
    manager_id INT ,
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    FOREIGN KEY(role_id) REFERENCES role(id)
);



INSERT INTO department (name) 
VALUES  ("Engineering"),("Sales"),("Marketing"),("Finance"),("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 95000,2),
("Software Engineer", 80000,2),
("Sales Lead", 60000 ,1),  
("Salesperson", 30000 ,1),
("Accountant",75000,4),
("Legal Team Lead", 90000, 3),
("Lawyer", 100000, 3),


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Smith", 1),
("Maria", "Garcia", 2),
("David", "Smith",3),
("Eric","Arthur",4);