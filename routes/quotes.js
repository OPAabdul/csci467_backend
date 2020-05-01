var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

let external_connect = require('../database_info/external_connect');

router.use(bodyParser.urlencoded({extended: false}));

// POST requests
router.post('/createQuote', function (req,res) {
    var query = "INSERT INTO quotes(cid, aid, status, email) ";
    query += "values(?,?,0,?)";
    external_connect.query(query, [req.body.cid,req.body.aid,req.body.email], (err, results, fields) => {
        if (err)
            console.error("failed to insert quote: " + err.message);

        res.end();
    }); 
    // console.log(req.body);
});

// PUT requests
router.put('/updateQuotePrice/:id', function (req, res) {
    var query = "UPDATE quotes SET total_price=ROUND((SELECT SUM(price) FROM listi WHERE listi.qid=?),2) WHERE quotes.qid=?";
    external_connect.query(query, [req.params.id, req.params.id], (err, results, fields) => {
        if (err)
            console.error("failed to update quote price: " + err.message);
        // console.log(req.params.id);
        res.end();
    }); 
});

router.put('/updateQuoteStatus/:id/:status', function (req, res) {
    var query = "UPDATE quotes SET status=? WHERE quotes.qid=?";
    external_connect.query(query, [req.params.status, req.params.id], (err, results, fields) => {
        if (err)
            console.error("failed to update quote price: " + err.message);
        console.log(req.params.id);
        res.end();
    }); 
});

router.put('/setDiscountedQuote/:id', function (req, res) {
    var query = "UPDATE quotes SET ";
    query += "total_price = ROUND((total_price - (dis_percentage * ROUND((SELECT SUM(price) FROM listi WHERE listi.qid=?),2)) ";
    query += "- dis_dollar),2) WHERE quotes.qid=?";
    external_connect.query(query, [req.params.id,req.params.id], (err, results, fields) => {
        if (err)
            console.error("failed to update quote price: " + err.message);
        console.log(req.params.id);
        res.end();
    }); 
});

router.put('/setQuoteDiscDollar/:id/:disc/:dollar', function (req, res) {
    var query = "UPDATE quotes SET dis_dollar = dis_dollar + ?, dis_percentage = dis_percentage + ? WHERE quotes.qid=?";
    external_connect.query(query, [req.params.disc, req.params.dollar, req.params.id], (err, results, fields) => {
        if (err)
            console.error("failed to update quote price: " + err.message);
        // console.log(req.params.id);
        res.end();
    }); 
});

router.put('/updateProcessDate/:id/:date', function (req, res) {
    var query = "UPDATE quotes SET date_processed = ? WHERE quotes.qid=?";
    console.log(req.params);
    external_connect.query(query, [req.params.date, req.params.id], (err, results, fields) => {
        if (err)
            console.error("failed to update quote price: " + err.message);
        // console.log(req.params.id);
        res.end();
    }); 
});

// GET requests
router.get('/quotes', function (req, res) {
    var query = "SELECT * FROM quotes";
    external_connect.query(query, (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
    });
});

router.get('/quotes_admin', function (req, res) {
    var query = "SELECT quotes.qid, customers.name AS cname, associates.name AS aname, ";
    query += "quotes.total_price, quotes.email, DATE(quotes.date_ordered) AS date_ordered, IF(quotes.status=0, 'finalized', ";
    query += " IF(quotes.status=1, 'sanctioned','ordered')) AS status, date_processed FROM quotes ";
    query += "INNER JOIN customers ON quotes.cid = customers.id INNER JOIN associates ON quotes.aid = associates.aid;";
    external_connect.query(query, (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
    });
});

router.get('/quote/:id', function (req, res) {
    var query = "SELECT * FROM quotes WHERE qid=?";
    external_connect.query(query, [req.params.id], (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
    });
});

router.get('/quotetest', function (req,res) {
    console.log('quote test');
    res.end();
})

router.get('/quotes_info', function (req, res) {
    var query = "SELECT quotes.qid, customers.name AS cname, associates.name AS aname, ";
    query += "quotes.total_price, quotes.email, quotes.date_ordered, quotes.dis_dollar, quotes.dis_percentage FROM quotes ";
    query += "INNER JOIN customers ON quotes.cid = customers.id INNER JOIN associates ON quotes.aid = associates.aid WHERE status=0";
    external_connect.query(query, (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
    });
});

router.get('/quotes_sanc', function (req, res) {
    var query = "SELECT quotes.qid, customers.name AS cname, associates.name AS aname, ";
    query += "quotes.total_price, quotes.email, quotes.date_ordered, quotes.dis_dollar, quotes.dis_percentage FROM quotes ";
    query += "INNER JOIN customers ON quotes.cid = customers.id INNER JOIN associates ON quotes.aid = associates.aid WHERE status=1";
    external_connect.query(query, (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
    });
});

router.get('/quotes_order', function (req, res) {
    var query = "SELECT quotes.qid, customers.name AS cname, associates.name AS aname, ";
    query += "quotes.total_price, quotes.email, quotes.date_ordered, quotes.dis_dollar, quotes.dis_percentage FROM quotes ";
    query += "INNER JOIN customers ON quotes.cid = customers.id INNER JOIN associates ON quotes.aid = associates.aid WHERE status=2";
    external_connect.query(query, (err, results, fields) => {
        if (err)
            return console.error(err.message)

        res.send(results);
    });
});


router.get('/quote/:email/:cid/:aid', function (req, res) {
    var query = "SELECT * FROM quotes WHERE email=? AND cid=? AND aid=? ORDER BY date_ordered DESC";
    external_connect.query(query, [req.params.email,req.params.cid,req.params.aid], (err, results, fields) => {
        if (err)
            return console.error(err.message)
        console.log(results);
        res.send(results);
    });
});

module.exports = router;