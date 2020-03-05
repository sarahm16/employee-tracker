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

function addDepartment(variable) {
    inquirer.prompt(
        [
            {
                type: 'input',
                message: `What ${variable} would you like to add?`,
                name: 'department'
            }
        ]
    ).then(function(response) {
        connection.query(
            `INSERT INTO ${variable} SET ?`,
            {
                name: response[`${variable}`]
            }
        )
    })
}

module.exports = addDepartment;