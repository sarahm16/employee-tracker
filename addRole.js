const inquirer = require('inquirer');
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1084829Ss',
    database: 'employee_db'
})

function addRole() {
    connection.query('SELECT * FROM department', function(err, result) {
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
                    choices: function() {
                        let choiceArray = []
                        for(let i=0; i<result.length; i++) {
                            choiceArray.push(result[i].name);
                        }
                        return choiceArray;
                    }
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
    }) 
}

module.exports = addRole;