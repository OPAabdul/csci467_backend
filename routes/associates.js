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


module.exports = router;