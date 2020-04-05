const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'sql9.freesqldatabase.com',
    database: 'sql9331512',
    user: 'sql9331512',
    password: 'ynRxHi4bBG',
    port: '3306',
    multipleStatements: true
})

connection.connect(function(error) {
    if (!!error) {
      console.log('Error');
    } else {
      console.log('Connected');
    }
  });

module.exports = connection;