const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1084829Ss',
    database: 'employee_db'
})

connection.connect(function(err) {
    if(err) throw err;
    console.log(`Connected as id ${connection.threadId}`)
})

inquirer.prompt(
    [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'task',
            choices: ['View all employees', 'View all departments', 'View all roles', 'Add a department', 'Add an employee', 'Add a role']
        }
    ]
).then(function(response) {
    switch(response.task) {
        case 'View all employees':
            console.log('view all');
        break;
        case 'View all departments':
            console.log('view departments');
        break;
        case 'View all roles':

        break;
        case 'Add a department':
            addDepartment();
        break;
        case 'Add an employee':
            addEmployee();
        break;
        case 'Add a role':
            addRole();
        break;
    }
})

function addEmployee() {
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the employees name?',
                name: 'name'
            },
            {
                type: 'list',
                message: 'What is their role?',
                name: 'role',
                choices: []
            }
        ]
    )
}

function addRole() {
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'How much does this role earn annually?',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'Which department is this role in?',
                name: 'department',
                choices: ['0', '1', '2']
            }
        ]

    ).then(function(response) {
        connection.query(
            'INSERT INTO role SET ?',
            {
                title: response.role,
                salary: response.salary,
                department_id: response.department
            }
        )
    })
}

function addDepartment() {

}