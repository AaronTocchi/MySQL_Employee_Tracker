var mysql = require("mysql");
var inquirer = require("inquirer");
let employees = [];
let roles = [];

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
        .then(function ({ task }) {
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
};

function addDept() {
   
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
                console.log("\x1b[33m", "Department added!")
                runInquire();
            })
        })
};

function addRole() {
    let departments = []
    connection.query(`SELECT * FROM department`, function (err, data) {
        if (err) throw err;
        // add dept data to array to pull from for choices
        for (let i = 0; i < data.length; i++) {
            departments.push(data[i].name)
        }


        inquirer
            .prompt([
                {
                    name: 'title',
                    message: "What is thier role?",
                    type: 'input'
                },
                {
                    name: 'salary',
                    message: 'How much do they make?',
                    type: 'input'
                },
                {
                    name: 'department_id',
                    message: 'What department does this role belong to?',
                    type: 'list',
                    choices: departments
                }
            ]).then(function ({ title, salary, department_id }) {
                let index = departments.indexOf(department_id)

                connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}', '${salary}', ${index})`, function (err, data) {
                    if (err) throw err;
                    console.log("\x1b[33m", "Department added!")
                    runInquire();
                })
            })
    })
};

function addEmployee() {
    connection.query(`SELECT * FROM role`, function (err, data) {
        if (err) throw err;


        for (let i = 0; i < data.length; i++) {
            roles.push(data[i].title);
        }

        connection.query(`SELECT * FROM employee`, function (err, data) {
            if (err) throw err;

            for (let i = 0; i < data.length; i++) {
                employees.push(data[i].first_name);
            }

            inquirer
                .prompt([
                    {
                        name: 'first_name',
                        message: "what's the employees First Name",
                        type: 'input'
                    },
                    {
                        name: 'last_name',
                        message: 'What is their last name?',
                        type: 'input',
                    },
                    {
                        name: 'role_id',
                        message: 'What is their role?',
                        type: 'list',
                        choices: roles,
                    },
                    {
                        name: 'manager_id',
                        message: "Who is thier manager if they have one?",
                        type: 'list',
                        choices: ['none'].concat(employees)
                    }
                ]).then(function ({ first_name, last_name, role_id, manager_id }) {
                    let queryText = `INSERT INTO employee (first_name, last_name, role_id`;
                    if (manager_id != 'none') {
                        queryText += `, manager_id) VALUES ('${first_name}', '${last_name}', ${roles.indexOf(role_id)}, ${employees.indexOf(manager_id) + 1})`
                    } else {
                        queryText += `) VALUES ('${first_name}', '${last_name}', ${roles.indexOf(role_id) + 1})`
                    }
                    console.log(queryText)

                    connection.query(queryText, function (err, data) {
                        if (err) throw err;

                        runInquire();
                    })
                })

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