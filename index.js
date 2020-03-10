const connection = require('./connection').connection;
const inquirer = require('inquirer');
const selectWhere = require('./queryFunctions').selectWhere;
const insert = require('./queryFunctions').insert;
const viewAll = require('./queryFunctions').viewAll;
//const update = require('./queryFunctions').update;

function start() {
    inquirer.prompt(
        [
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'task',
                choices: ['View all employees', 'View all departments', 'View all roles', 'Add a department', 'Add an employee', 'Add a role', 'Update employee role', 'Exit']
            }
        ]
    ).then(function(response) {
        switch(response.task) {
            case 'test':
                getEmployees();
            break;
            case 'View all employees':
                displayEmployees();
            break;
            case 'View all departments':
                viewAll('department', start());
            break;
            case 'View all roles':
                viewAll('role', start());
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
            case 'Exit':
                connection.end();
            break;
            default: break
        }
    })
}

function displayEmployees() {
    connection.query(
        'SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department on role.department_id = department.id', function(err, result) {
            if(err) throw err;
            console.table(result);
            start()
        }
    )
}
    
function updateRole() {
    connection.query('SELECT * FROM employee', function(err, result) {
        inquirer.prompt(
            {
                type: 'list',
                message: 'Which employee would you like to update?',
                name: 'update',
                choices: function() {
                    let choiceArray = [];
                    for(let i=0; i<result.length; i++) {
                        let employee = `${result[i]['first_name']} ${result[i]['last_name']}, id: ${result[i].id}`;
                        choiceArray.push(employee);
                    }
                    return choiceArray;
                }
            }
        ).then(function(employeeToUpdate) {
            let employee = employeeToUpdate['update'].split(' ');
            let employee_id = employee[employee.length-1];
            connection.query('SELECT * FROM role', function(err, roles) {
                inquirer.prompt(
                    {
                        type: 'list',
                        message: 'What is their new role?',
                        name: 'new-role',
                        choices: function() {
                            let choiceArray = [];
                            for(let i=0; i<roles.length; i++) {
                                let role = `${roles[i].title}`;
                                choiceArray.push(role);
                            }
                            return choiceArray;
                        }
                    }
                ).then(function(newRole) {
                    selectWhere('id', 'role', 'title', newRole['new-role'], function(res) {
                        let roleID = res[0].id;
                        connection.query(`UPDATE employee SET role_id = ${roleID} WHERE id = ${employee_id}`, function(err) {
                            if(err) throw err;
                            console.log('Employee role successfully updated')
                        })
                        start();
                        //update('employee', 'role_id', `${role_id}`, 'id', employee_id);
                    })
                })
            })
        })
    })
}

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
            if(response.role.toLowerCase() !== 'manager') {
                connection.query('SELECT * FROM employee', function(err, result) {
                    inquirer.prompt(
                        {
                            type: 'list',
                            message: 'Who is their manager?',
                            name: 'department-manager',
                            choices: function() {
                                let choiceArray = [];
                                for(let i=0; i<result.length; i++) {
                                    //console.log(result[i]);
                                    let employee = `${result[i]['first_name']} ${result[i]['last_name']}, id: ${result[i].id}`;
                                    choiceArray.push(employee);
                                }
                                return choiceArray;
                            }
                        }
                    ).then(function(managerResponse) {
                        let manager = managerResponse['department-manager'].split(' ');
                        let manager_id = manager[manager.length-1];
                        //console.log(manager_id);
                        selectWhere('id', 'role', 'title', response.role, function(result) {
                            let id = result[0].id;
                            let whatToInsert = {
                                first_name: response.first,
                                last_name: response.last,
                                role_id: id,
                                manager_id: manager_id
                            }
                            insert('employee', whatToInsert);
                            console.log('Employee added successfully');
                            start()
                        })
                    })
                })
            }
            else {
                selectWhere('id', 'role', 'title', response.role, function(result) {
                    let id = result[0].id;
                    let whatToInsert = {
                        first_name: response.first,
                        last_name: response.last,
                        role_id: id
                    }
                    insert('employee', whatToInsert);
                    console.log('Employee added successfully');
                    start();
                })
            }
        })
    })
}

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
        let whatToInsert = {name: response.department};
        insert('department', whatToInsert);
        start();
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
                let whatToInsert = {
                    title: response.role,
                    salary: response.salary,
                    department_id: id
                }
                insert('role', whatToInsert);
                start();
            })
        })
    })
}

start();

module.exports = {
    start: start
}