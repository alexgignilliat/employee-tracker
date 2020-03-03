require("dotenv").config()
const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table');


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "company"
});

connection.connect(err => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

let roles = ["Sales", "Engineering", "Finance", "Legal"]

const questions = [
    {
        type: "list",
        name: "mainChoice",
        message: "What do you want to do?",
        choices: ["Add Department", "Add Role", "Add Employee", "View Departments", "View Roles", "View Employees", "Update Employee Roles"]
    }
]

const prompts = async function (questions) {
    const userInput = await inquirer.prompt(questions);
    console.log(userInput)
    switch (userInput.mainChoice) {
        case "Add Department":
            addDepartment();
            return;
        case "Add Role":
            addRole();
            return;
        case "Add Employee":
            addEmployee()
            return;
        case "View Departments":
            viewDepartments()
            return;
        case "View Roles":
            viewRoles()
            return;
        case "View Employees":
            viewEmployees()
            return;
        case "Update Employee Roles":
            updateRoles()
            return;
    }
}

async function userInput() {
    await prompts(questions)
}

async function viewDepartments() {
    await connection.query("SELECT * FROM department", (err, result) => {
        if (err) throw err;
        console.log("All Departments:")
        console.table(result)
        userInput()
    });
}

async function viewEmployees() {
    await connection.query("SELECT first_name AS 'First Name', last_name AS 'Last Name', salary AS 'Salary', role_id AS 'Role ID' FROM employee LEFT JOIN role on employee.role_id = role.id", (err, result) => {
        if (err) throw err;
        console.log("All Employees:")
        console.table(result)
        console.log("--------------------")
        userInput()
    })
}

async function viewRoles() {
    await connection.query("SELECT id, title, salary FROM role", (err, result) => {
        if (err) throw err;
        console.log("All roles:")
        console.table(result)
        console.log("--------------------")
        userInput()
    })
}

async function addDepartment() {
    const addDepartment = await inquirer.prompt({
        type: "input",
        name: "newDepartment",
        message: "What department would you like to add?",

    })
    await connection.query("INSERT INTO department (name) VALUES (?)", [(addDepartment.newDepartment)], (err, result) => {
        if (err) throw err;
        console.log("Department Added!")
        console.log("--------------------")
        userInput()
    })
}

async function addRole() {
    const addRole = await inquirer.prompt([{
        type: "input",
        name: "newRole",
        message: "What role would you like to add?",

    },
    {
        type: "input",
        name: "newRoleSalary",
        message: "Enter a salary for the new role: ",

    }])
    let values = [addRole.newRole, Number(addRole.newRoleSalary)]
    await connection.query("INSERT INTO role (title, salary) VALUES (?)", [(values)], (err, result) => {
        if (err) throw err;
        console.log("Department Added!")
        console.log("--------------------")
        userInput()
    }
    )
}

async function addEmployee() {
    const test = await inquirer.prompt([
        {
            type: "input",
            name: "employeeFirstName",
            message: "Enter Employee's First Name: ",

        },
        {
            type: "input",
            name: "employeeLastName",
            message: "Enter Employee's Last Name: ",

        },
        {
            type: "list",
            name: "employeeRole",
            message: "Enter Employee's Department: ",
            choices: roles
        }

    ])
    switch (test.employeeRole) {
        case "Sales":
            test.id = 1
            return;
        case "Engineering":
            test.id = 2
            return;
        case "Finance":
            test.id = 3
            return;
        case "Legal":
            test.id = 4
            return;

    }
    let sql = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?)"
    let values = [test.employeeFirstName, test.employeeLastName, test.id]
    await connection.query(sql, [(values)], (err, result) => {
        if (err) throw err;
        console.log("Employee Added.");
        userInput()
    });
};

async function updateRoles(){
    const updateRole = await inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Enter ID of employee you'd like to update: "
        },
        {
         name: "roleId",
         type: "input",
         message: "Enter ID of the new role: ",
         }])
    const updatedRoleId = updateRole.id;
    const roleId = updateRole.roleId;
      
    const query = "UPDATE employee SET role_id=? WHERE id=?";
    await connection.query(query, [roleId, updatedRoleId], function (err, res) {
        if (err) throw err;
         console.log("Employee Role Updated.")
         userInput();
    });
};
      
userInput();