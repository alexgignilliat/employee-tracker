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
