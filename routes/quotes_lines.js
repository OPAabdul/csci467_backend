var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

let external_connect = require('../database_info/external_connect');

router.use(bodyParser.urlencoded({extended: false}));

router.post('/createQuote', function (req,res) {
    var query = "INSERT INTO quotes(cid, aid, status, email) ";
    query += "values(?,?,0,?)";
    external_connect.query(query, [req.body.cid,req.body.aid,req.body.email], (err, results, fields) => {
        if (err)
            console.error("failed to insert quote: " + err.message);

        res.end();
    }); 
    console.log(req.body);
});

router.get('/quotetest', function (req,res) {
    console.log('quote test');
    res.end();
})

router.get('/quotes_info', function (req, res) {
    var query = "SELECT quotes.qid, customers.name AS cname, associates.name AS aname, ";
    query += "quotes.total_price, quotes.email, quotes.date_ordered FROM quotes ";
    query += "INNER JOIN customers ON quotes.cid = customers.id INNER JOIN associates ON quotes.aid = associates.aid;";
    external_connect.query(query, (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
    });
});

router.get('/quotes', function (req, res) {
    var query = "SELECT * FROM quotes";
    external_connect.query(query, (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
    });
});

router.get('/lineItems/:qid', function (req, res) {
    var query = "SELECT lid, descr, price, secret_notes FROM listi INNER JOIN quotes ON listi.qid = quotes.qid WHERE qid = ?";
    external_connect.query(query, [req.params.qid], (err, results, fields) => {
        if (err)
            return console.error(err.message);

        res.send(results);
    }); 
});

module.exports = router;