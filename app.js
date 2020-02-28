require("dotenv").config()
const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table');


const connection = mysql.createConnection({
    host: process.env.HOST,
    port: 3306,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(err => {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    // console.log("connected as id " + connection.threadId);
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
            return;
        case "Add Role":
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
    }
    )
}

async function viewEmployees() {
    await connection.query("SELECT * FROM employee", (err, result) => {
        if (err) throw err;
        console.log("All Employees:")
        console.table(result)
        console.log("--------------------")
        userInput()
    }
    )
}

async function viewRoles() {
    await connection.query("SELECT id, title, salary FROM role", (err, result) => {
        if (err) throw err;
        console.log("All roles:")
        console.table(result)
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
            message: "Enter Employee's Role: ",
            choices: roles

        }

    ])
    switch (test.employeeRole) {
        case "Sales":
            test.id = 1
            break;
        case "Engineering":
            test.id = 2
            break;
        case "Finance":
            test.id = 3
            break;
        case "Legal":
            test.id = 4

    }
    let sql = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?)"
    let values = [test.employeeFirstName, test.employeeLastName, test.id]
    await connection.query(sql, [(values)], (err, result) => {
        if (err) throw err;
        console.log("Employee Added.");
        viewEmployees()
        userInput()
    }
    )
}


userInput();