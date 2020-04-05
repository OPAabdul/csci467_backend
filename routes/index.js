var express = require('express');
var router = express.Router();

let legacy_connect = require('../database_info/legacy_connect');
let external_connect = require('../database_info/external_connect');

router.get('/getAllCustomers', function(req, res) {
  var query = "SELECT * FROM customers";
  legacy_connect.query(query, (err, results, fields) => {
    if(err)
      return console.error(err.message);

    res.send(results);
  });
});

router.get('/test', function(req, res) {
  var query = "SELECT * FROM test";
  external_connect.query(query, (err, results, fields) => {
    if(err)
      return console.error(err.message);

    res.send(results);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
