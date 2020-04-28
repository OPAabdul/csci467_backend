var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

let external_connect = require('../database_info/external_connect');

router.post('/createLine', function (req, res) {
    var query = "INSERT INTO listi(qid, descr, price, secret_notes) ";
    query += "values(?,?,?,?)";
    var doublePrice = parseFloat(req.body.price);
    external_connect.query(query, [req.body.qid, req.body.descr, doublePrice, req.body.notes], (err, results, fields) => {
        if (err)
            console.error("failed to insert line: " + err.message);

        res.end();
    });
    // console.log(req.body);
});

router.delete('/line/:id', function (req, res) {
    var query = "DELETE FROM listi WHERE lid=?";
    external_connect.query(query, [req.params.id], (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.end();
    });
});

router.get('/lines', function (req, res) {
    var query = "SELECT * FROM listi";
    external_connect.query(query, (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
    });
});

router.get('/lineItems/:qid', function (req, res) {
    var query = "SELECT lid, descr, price, secret_notes FROM listi INNER JOIN quotes ON listi.qid = quotes.qid WHERE listi.qid = ?";
    external_connect.query(query, [req.params.qid], (err, results, fields) => {
        if (err)
            return console.error(err.message);

        res.send(results);
    });
});

router.put('/updateLine/:id/:descr/:price/:notes', function (req, res) {
    var query = "UPDATE associates SET descr=?, price=?, secret_notes=? WHERE lid=?";
    external_connect.query(query,
        [
            req.params.descr,
            parseFloat(req.params.price),
            req.params.notes,
            req.params.id
        ],
        (err, results, fields) => {
            if (err)
                return console.error(err.message)

            res.end();
        });
});

module.exports = router;