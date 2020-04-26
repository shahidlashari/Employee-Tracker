drop database if exists employee_db;
create database employee_db;
use employee_db;
create table employee (
id int not null primary key auto_increment,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id int not null,
manager_id int);

create table role (
id int not null primary key auto_increment,
title varchar(30) not null,
salary decimal not null,
department_id int not null);

create table department (
id int not null primary key auto_increment,
name varchar(30) not null);