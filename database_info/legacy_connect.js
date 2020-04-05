const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'er7lx9km02rjyf3n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: '3306',
    database: 'b25oudnru9u3blk4',
    user: 'rs0czd6o8w8e8r3j',
    password: 'w1ffboir25orrcs4'
})

connection.connect(function(error) {
    if (!!error) {
      console.log('Error');
    } else {
      console.log('Connected');
    }
  });

module.exports = connection;