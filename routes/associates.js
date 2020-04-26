var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

let external_connect = require('../database_info/external_connect');

router.use(bodyParser.urlencoded({extended: false}));

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

module.exports = router;