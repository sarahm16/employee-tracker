const mysql = require('mysql');
const inquirer = require('inquirer');
const addEmployee = require('./employee');
const addRole = require('./addRole');
const addDepartment = require('./addDepartment');
const view = require('./view');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1084829Ss',
    database: 'employee_db'
})

connection.connect(function(err) {
    if(err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    start();
})

function start() {
    inquirer.prompt(
        [
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'task',
                choices: ['View all employees', 'View all departments', 'View all roles', 'Add a department', 'Add an employee', 'Add a role', 'Update employee role']
            }
        ]
    ).then(function(response) {
        switch(response.task) {
            case 'View all employees':
                displayEmployees();
            break;
            case 'View all departments':
                view('department');
            break;
            case 'View all roles':
                view('role');
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
            case 'Update employee role':
                updateRole();
            break;
        }
    })    
}