const connection = require('./index')

function viewAll(table) {
    let queryString = 'SELECT * FROM ?';
    connection.query(queryString, [table], function(err, result) {
        if(err) throw err;
        console.table(result);
    })
}

module.exports = viewAll;