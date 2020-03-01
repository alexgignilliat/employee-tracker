insert into department (name) values 
("Sales"),("Engineering"),("Finance"),("Legal"),("Management");

insert into role (title, salary, department_id, manager_id) values
("Manager Person Who Manages The People", 10, 5, null)
("Sales Lead", 100000, 1, 1),
("Salesperson", 80000, 1, 1),
("Lead Engineer", 150000, 2, 1),
("Software Engineer", 120000, 2, 1),
("Accountant", 125000, 3, 1),
("Legal Team Lead", 250000, 4, 1),
("Lawyer", 190000, 4, 1);

insert into employee (first_name, last_name, role_id)