const inquirer = require('inquirer');
const mysql = require('mysql');
//const connection = require('./index');

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
        let object = {name: response.department}
        insert('department', object, function(err) {
            if(err) throw err;
        })
    })
}

function addRole() {
    connection.query(`SELECT * FROM department`, function(err, result) {
        inquirer.prompt(
            [
                {
                    type: 'input',
                    message: 'What role would you like to add?',
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
            selectWhere('id', 'department', 'name', response.department, function(result) {
                let id = result[0].id;
                let object = {
                    title: response.role,
                    salary: response.salary,
                    department_id: id
                }
                insert('role', object);
            })
        })
    })
}

function insert(table, object) {
    let queryString = 'INSERT INTO ?? SET ?';
    connection.query(queryString, [table, object], function(err) {
        if(err) throw err;
    })
}

function selectAll(table, cb) {
    let queryString = 'SELECT * FROM ?';
    connection.query(queryString, [table], function(err, result) {
        if(err) throw err;
        cb(result);
    })
}

function selectWhere(whatToSelect, table, col, colValue, cb) {
    let queryString = 'SELECT ?? FROM ?? WHERE ?? = ?';
    connection.query(queryString, [whatToSelect, table, col, colValue], function(err, result) {
        if(err) throw err;
        cb(result);
    });
}

module.exports = {
    addRole: addRole,
    addDepartment: addDepartment,
    selectWhere: selectWhere
}