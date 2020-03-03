drop database if exists company;
create database company;
use company;

create table department (
    id int not null auto_increment primary key,
    name varchar(30) not null
);

create table role (
    id int not null auto_increment primary key,
    title varchar(30) not null,
    salary decimal not null,
    department_id int,
    foreign key (department_id) references department(id)
);

create table employee (
    id int not null auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int,
	manager_id int,
    foreign key (role_id) references role(id),
    foreign key (manager_id) references role (id)
);

insert into department (name) values 
("Sales"),("Engineering"),("Finance"),("Legal");

insert into role (title, salary, department_id) values
("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

insert into employee (first_name, last_name, role_id, manager_id) values 
("Frank", "Reynolds", 1, null),
("Charlie", "Kelly", 2, 1),
("Ronald", "Macdonald", 2, 1),
("Dennis", "Reynolds", 3, 1),
("Dee", "Reynolds", 4, 1);
