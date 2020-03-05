const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1084829Ss',
    database: 'employee_db'
})

function viewEmployees() {
    connection.query('SELECT ')
}

module.exports = viewEmployees;