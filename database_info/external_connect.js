const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'sql9.freesqldatabase.com',
//   database: 'sql9331512',
//   user: 'sql9331512',
//   password: 'ynRxHi4bBG',
//   port: '3306',
//   multipleStatements: true
// })

const connection = mysql.createConnection({
  host: 'database-467.c1k3cdwvqcpw.us-east-2.rds.amazonaws.com',
  database: 'quote_system_db',
  user: 'admin',
  password: 'password',
  port: '3306'
})

connection.connect(function(error) {
    if (!!error) {
      console.log('Error external');
    } else {
      console.log('Connected external');
    }
  });

module.exports = connection;