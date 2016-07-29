/**
 * Created by cchou on 7/21/2016.
 */
var express = require('express');
var router = express.Router();
var convert = require('../public/javascript/convert.funct');

router.post('/config', function(req, res){
    //Get the form values from their name attributes like:
    //var userName = req.body.username
    //theres going to be a lot of this
    var conn = req.conn;
    var river = req.body.selectRiver;
    var riverLocation = req.body.selectRiverLocation;
    var riverLocationSite = req.body.selectRiverLocationSite;
    //END

    conn.query(
        "UPDATE config " +
        "SET river = ?, " +
        "location = ?, " +
        "site = ? " +
        "WHERE id=1",
        [river, riverLocation, riverLocationSite],
        function(err, result) {
            if (err) throw err;

            console.log("Raspberry Pi classroom geolocation configuration updated successfully...");
            console.log("changes made: ");
            console.log(result);
            return result;
        }
    );
    res.send("Your RasPi was successfully configured... Your class is stationed at the " + river + " within location '" + riverLocation + "' at site " + riverLocationSite);
    res.end();
});

/* GET home page. */
router.get('/', function(req, res, next) {
    $ = req.dom;

    var conn = req.conn;
    var nav = [];
    var query = conn.query(
        "SELECT * " +
        "FROM config " +
        "LIMIT 1", function(err, rows){
            if(err) throw err;

            console.log("Data read from table `config` successful.");
            console.log("Inside the query: " + rows[0].river);

            nav[0] = rows[0].river;
            nav[1] = rows[0].location;
            nav[2] = rows[0].site;
            res.render('form', { title: 'Flow', river: nav[0], location: nav[1], site: nav[2] });
        });
});

//Get Config page
router.get('/config', function(req, res) {
    $ = req.dom;

    res.render('config', {title: "Flow Config"});
});


router.post('/submit', function(req, res) {
    var conn = req.conn,
        names = [],
        $ = req.dom,
        inputTags = $('input'),
        i, queryString;
    console.log("HI");
    console.log(inputTags[0]);
    console.log(inputTags[2]);
    for (i = 0; i < inputTags.length; i++) {
        if (inputTags[i].attribs.name != '' && inputTags[i].attribs.name != null && typeof inputTags[i].attribs.name !== 'undefined' && inputTags[i].attribs.type != 'hidden') {
            names.push(inputTags[i].attribs.name);
        }
    }
    console.log(names);

    // queryString = 'INSERT INTO physical_data VALUES (' + req.body.tideChangeAtTime0 + ', ' + req.body.tideIsRFUAtTime0;
    // conn.query('INSERT INTO physical_data', function () {
    //
    // });

    res.send('Form elements: ' + names);
});

router.get('/tables', function(req, res) {
    var tableNames = ['physical_data',
        'watercurrenttable',
        'site_description',
        'biologicalsampling',
        'chemicalanalysis',
        'documentation',
        'speciesfound',
        'teammembers',
        'speciestable2',
        'config'],
        tablesList = [],
        conn = req.conn;
    req.conn.query()
    for (var i = 0; i < tableNames.length; i++) {
        var name = tableNames[i];
        var queryString = "SELECT table_name, column_name, column_type AS type, character_maximum_length AS max_length FROM information_schema.columns " +
            "WHERE table_schema='pi' AND table_name='" + name + "'";
        if (i == tableNames.length - 1) {
            conn.query(queryString, function(e, table) {
                if (e) throw e;
                tablesList.push(table);
                res.render('tables', {'tables': tablesList});
            });
        } else {
            conn.query(queryString, function(e, table) {
                if (e) throw e;
                tablesList.push(table);
            });
        }
    }
});


router.get('/mess', function(req, res) {
    var conn = req.conn;
    conn.query("SELECT * FROM information_schema.columns WHERE table_schema='pi'", function(e, mess){
        if (e) throw e;
        res.send(mess);
    });
});


router.post('/myaction', function(req, res) {
    res.render('myaction', {'title': 'Flow', 'result': convert.f2c(req.body.test)});
});

module.exports = router;
