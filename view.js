const inquirer = require('inquirer');
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1084829Ss',
    database: 'employee_db'
})

function view(table) {
    connection.query(`SELECT * FROM ${table}`, function(err, result) {
        if(err) throw err;
        console.table(result);
    })
}

module.exports = view;