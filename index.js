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

        break;
        case 'Add an employee':
        
        break;
        case 'Add a role':
        
        break;
    }
})