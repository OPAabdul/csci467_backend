var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

let external_connect = require('../database_info/external_connect');

router.use(bodyParser.urlencoded({extended: false}));

router.get('/auth', function (req, res) {
    var query = "SELECT * FROM associates WHERE username=?";
    external_connect.query(query, [req.query.username], (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
    });
});

router.post('/createAssociate', function (req,res) {
    var query = "INSERT INTO associates(name,username,password,address) ";
    query += "values(?,?,?,?)";
    external_connect.query(query, [req.body.name,req.body.username,req.body.password,req.body.address], (err, results, fields) => {
        if (err)
            console.error("failed to insert line: " + err.message);

        res.end();
    }); 
    // console.log(req.body);
});

router.get('/associates', function (req, res) {
    var query = "SELECT * FROM associates";
    external_connect.query(query, (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
    });
});

router.get('/associate/:id', function (req, res) {
    var query = "SELECT * FROM associates WHERE aid=?";
    external_connect.query(query, [req.params.id], (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
    });
});

router.delete('/associate/:id', function (req, res) {
    var query = "DELETE FROM associates WHERE aid=?";
    external_connect.query(query, [req.params.id], (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.end();
    });
});

router.put('/updateAssociate/:id/:user/:pass/:addr', function (req, res) {
    var query = "UPDATE associates SET username=?, password=?, address=? WHERE aid=?";
    external_connect.query(query, [req.params.user,req.params.pass,req.params.addr,req.params.id], (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.end();
    });
});

router.put('/updateAssociateCommission/:id/:coms', function (req, res) {
    var query = "UPDATE associates SET total_sales=ROUND((total_sales + ?),2) WHERE aid=?";
    external_connect.query(query, [req.params.coms,req.params.id], (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.end();
    });
});


module.exports = router;