var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

let legacy_connect = require('../database_info/legacy_connect');
let external_connect = require('../database_info/external_connect');

router.get('/customer/:id', function (req, res) {
    var query = "SELECT * FROM customers WHERE id=?";
    legacy_connect.query(query, [req.params.id], (err, results, fields) => {
        if (err)
            return console.error(err.message);

        res.send(results);
    }); 
});

router.get('/customers', function (req, res) {
    var query = "SELECT * FROM customers";
    external_connect.query(query, (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
var bodyParser = require('body-parser');
    });
});

router.post('/addCustomer', function (req, res) {
    var query = "INSERT INTO customers (name, city, street contact) VALUES (?,?,?,?)";
    external_connect.query(query, 
        [req.body.new_id, req.body.new_name, req.body.new_city, req.body.new_street, req.body.new_contact],
         (err, results, fields) => {
        if (err) 
            return console.error(err.message);

        console.log("Inserted a new customer");
        res.end();
    });
});

router.get('/setCustomers', function (req, res) {
    var query = "SELECT * FROM customers";
    legacy_connect.query(query, (err, results, fields) => {
        if (err)
            return console.error(err.message);

        results.forEach(element => {
            customerRefresh(element);
        });

        res.send(results);
    });
});

function customerRefresh(customer_map) {
    var query = "INSERT INTO customers (id, name, city, street, contact) VALUES (?,?,?,?,?)";
    external_connect.query(query, [customer_map.id, customer_map.name, customer_map.city, customer_map.street, customer_map.contact], (err, results, fields) => {
        if (err) 
            return console.error(err.message);
        console.log("Inserted customers");
    }); 
}


module.exports = router;