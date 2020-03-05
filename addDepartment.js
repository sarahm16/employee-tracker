const inquirer = require('inquirer');
const mysql = require('mysql')

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

function addDepartment() {
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What department would you like to add?',
                name: 'department'
            }
        ]
    ).then(function(response) {
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: response.department
            }
        )
    })
}

module.exports = addDepartment;