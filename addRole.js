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
            getDepartmentId(response.role, response.salary, response.department)
        })
    }) 
}

function getDepartmentId(role, salary, department) {
    connection.query('SELECT id FROM department WHERE name = ?', [department], function(err, result) {
        if(err) throw err;
        let departmentID = result[0].id;
        //console.log(departmentID);
        addDB(role, salary, departmentID)
    })
}

function addDB(role, salary, departmentID) {
    connection.query(
        'INSERT INTO role SET ?',
        {
            title: role,
            salary: salary,
            department_id: departmentID
        }
    )
}

module.exports = addRole;