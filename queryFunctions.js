const connection = require('./connection').connection;

// function update(table, col1, value1, col2, value2) {
//     let queryString = 'UPDATE ? SET ? = ? WHERE ? = ?';
//     connection.query(queryString, [table, col1, value1, col2, value2], function(err) {
//         if(err) throw err;
//     })
// }

function insert(table, whatToInsert) {
    let queryString = 'INSERT INTO ?? SET ?';
    connection.query(queryString, [table, whatToInsert], function(err) {
        if(err) throw err;
    })
}

function viewAll(table) {
    let queryString = 'SELECT * FROM ??';
    connection.query(queryString, [table], function(err, result) {
        if(err) throw err;
        console.table(result);
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
    //update: update,
    selectWhere: selectWhere,
    viewAll: viewAll,
    insert: insert
}