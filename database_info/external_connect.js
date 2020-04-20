const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'sql9.freesqldatabase.com',
//   database: 'sql9331512',
//   user: 'sql9331512',
//   password: 'ynRxHi4bBG',
//   port: '3306',
//   multipleStatements: true
// })

const connection = mysql.createPool({
  connectionLimit: 10,
  host: 'database-467.c1k3cdwvqcpw.us-east-2.rds.amazonaws.com',
  database: 'quote_system_db',
  user: 'admin',
  password: 'password',
  port: '3306',
  multipleStatements: true
})

console.log("connected to external");

// connection.connect(function(error) {
//     if (!!error) {
//       console.log('Error');
//     } else {
//       console.log('Connected');
//     }
//   });

module.exports = connection;