var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "knnopix",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    runInquire();
});

function runInquire() {
    inquirer
        .prompt({
            name: "task",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "View Departments",
                "View Roles",
                "View Employees",
                "Update Employee Role",
                "Done"
            ]
        })
        .then(function({ task }) {
            switch (task) {
                case "Add Department":
                    addDept();
                    break;
                
                case "Add Role":
                    addRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "View Departments":
                    viewDept();
                    break;

                case "View Roles":
                    viewRole();
                    break;

                case "View Employees":
                    viewEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Done":
                    connection.end();
                    break;
            }
        });
}
function addDept(){
    inquirer
    .prompt(
        {
            name: 'name',
            message: "What is your department's name?",
            type: 'input'
        }
    ).then(function ({ name }) {
        connection.query(`INSERT INTO department (name) VALUES ('${name}')`, function (err, data) {
            if (err) throw err;
            console.log("\x1b[33m","Department added!")
            runInquire();
        })
    })
};


function viewDept() {
        connection.query(`SELECT * FROM department`, function (err, data) {
                if (err) throw err;

                console.table(data)
                runInquire();
            })
};

function viewRole() {
    connection.query(`SELECT * FROM role`, function (err, data) {
            if (err) throw err;

            console.table(data)
            runInquire();
        })
};

function viewEmployee() {
    connection.query(`SELECT * FROM employee`, function (err, data) {
            if (err) throw err;

            console.table(data)
            runInquire();
        })
};