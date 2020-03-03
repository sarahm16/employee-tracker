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

function addEmployee() {
    connection.query('SELECT * FROM role', function(err, results) {
        inquirer.prompt(
            [
                {
                    type: 'input',
                    message: 'What is the employees first name?',
                    name: 'first'
                },
                {
                    type: 'input',
                    message: 'What is their last name?',
                    name: 'last'
                },
                {
                    type: 'list',
                    message: 'What is their role?',
                    name: 'role',
                    choices: function() {
                        let choiceArray = [];
                        for(let i=0; i<results.length; i++) {
                            choiceArray.push(results[i].title)
                        }
                        return choiceArray;
                    }
                }
            ]
        ).then(function(response) {
            addDB(response.first, response.last, response.role);
        })
    })
}

function addDB(first, last, role) {
    console.log(role);
    connection.query(
        'INSERT INTO employee SET ?',
        {
            first_name: first,
            last_name: last,
        }
    )
}

module.exports = addEmployee;