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
  host: 'sql9.freemysqlhosting.net',
  database: 'sql9333046',
  user: 'sql9333046',
  password: 'CsX1D7mQRD',
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