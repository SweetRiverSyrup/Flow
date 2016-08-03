/**
 * Created by cchou on 7/21/2016.
 */
var express = require('express');
var router = express.Router();
var convert = require('../public/javascript/convert.funct');
var flag = require('../flag.js');

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

router.post('/ajax', function(req, res){
    $ = req.dom;
    var check = req.query.check;
    var errors = [];
    var data = [];

//test individual errors
    if(check == false){
        errors.check = "An error occured";
    }

//Test error array
    if (typeof errors === 'undefined' && errors.length < 0) {
        data.errors = errors;
        console.log(data.errors);
    }else{
        data.message = "Yay";
        data.works = "Hell yas bish this shit works on fleeeeeek";
        try{
            data.flag = flag.flag({text: 'AJAX freakin works!!', type:'win', to:'flag-center'});
        }
        catch(err){
            console.log(err.message + " occured using flag function");
            return err.message;
        }
        data.flag = flag.flag({text: 'AJAX freakin works!!', type:'win', to:'flag-center'});
        console.log(data.message);
        console.log(data.works);
        console.log(data.flag);
    }

    res.send(data);
});

//Get Config page
router.get('/config', function(req, res) {
    $ = req.dom;

    res.render('config', {title: "Flow Config"});
});


router.post('/submit', function(req, res) {
    'use strict';
    var conn = req.conn,
        $ = req.dom,
        errTypes = ['ER_WARN_DATA_OUT_OF_RANGE',
            'WARN_DATA_TRUNCATED',
            'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'],
        subTables = ['watercurrenttable', 'methods', 'speciesfound', 'teammembers', 'speciestable2'],
        inputTags = $('input'),
        waterCurrentTable = $('#waterCurrentTable input'),
        tideChangeChartInput = $('#tideChangeChart input'),

        waterCurrentNames = getNames(waterCurrentTable).splice(0, getNames(waterCurrentTable).length - 2),
        waterCurrentArr,  // to separate water current names by row (b/c it is a subtable)
        mergeArrays = function() {
            var i, len = arguments.length;
            if (len > 1) {
                for (i = 1; i < len; i++) {
                    arguments[0].push.apply(arguments[0], arguments[i]);
                }
            }
        },

        physicalDataNames,
        someNames,
        columnNames,
        valueNames,

        dbSize,
        queryString;


    function getErrName(err) {
        return err.message.split(':')[0];
    }

    function getNames(elements) {
        var names = [];
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].attribs.name !== '' && elements[i].attribs.name !== null && typeof elements[i].attribs.name !== 'undefined' && elements[i].attribs.type !== 'hidden') {
                names.push(elements[i].attribs.name);
            }
        }
        return names;
    }

    function removeDuplicates(arr) {
        var seen = {};
        var arr2 = [];
        for (var i = 0; i < arr.length; i++) {
            if (!(arr[i] in seen)) {
                arr2.push(arr[i]);
                seen[arr[i]] = true;
            }
        }
        return arr2;

    }

    function isValidType(name, colName, tableName, fn) {

        conn.query("SELECT COLUMN_NAME, COLUMN_TYPE " +
            "FROM INFORMATION_SCHEMA.COLUMNS " +
            "WHERE TABLE_SCHEMA = 'pi' " +
            "AND TABLE_NAME = '" + tableName +
            "';", function(e, info) {
            if (e) {
                throw e;
            }
            var colTypes = info;
            function isFloat(num, index){
                var size2 = colTypes[index]['COLUMN_TYPE'].charAt(colTypes[index]['COLUMN_TYPE'].length-2),
                    size1 = colTypes[index]['COLUMN_TYPE'].charAt(colTypes[index]['COLUMN_TYPE'].length-4) - size2,
                    size = [size1, size2];
                if (typeof num === "number") {
                    num = num.toString();
                }
                if (typeof num === "string") {
                    if (num.indexOf(".") > -1) {
                        var float = num.split(".");
                        return [float[0].length <= size[0] && float[1].length <= size[1], colTypes[index]['COLUMN_TYPE']];
                    } else {
                        return [num.length < size[0], colTypes[index]['COLUMN_TYPE']];
                    }
                }
            }
            for (var i = 0; i < colTypes.length; i++) {
                if (colTypes[i]['COLUMN_NAME'] === colName) {
                    if (colTypes[i]['COLUMN_TYPE'].search('float') > -1) {    // if database type is a float
                        // if the input matches
                        try {
                            fn(isFloat(req.body[name], i));
                        } catch(err) {
                            console.error("Error" + err.message[0]);
                            fn([false, colTypes[i]['COLUMN_TYPE']]);
                        }
                    } else {
                        dbSize = +colTypes[i]['COLUMN_TYPE'].split(/[()]/)[1];
                        fn([req.body[name].length <= dbSize, colTypes[i]['COLUMN_TYPE']]);
                    }
                }
            }
        });
    }

    function addQuotes(string) {
        return '"' + string + '"';
    }

    function getQuery(names, table_name, fn) {
        /**
         * Takes form input names and returns column names and value names for the query
         */
        var tableColumns = [],
            uniqueTableColumns;
        columnNames = '';
        valueNames = '';

        if (subTables.indexOf(table_name) > -1) {  // if the table is a subtable
            tableColumns = names.map(function(obj) {
                return obj.substring(0, obj.length - 1);  // takes off number
            });
            uniqueTableColumns = removeDuplicates(tableColumns);
        } else {
            tableColumns = names;
        }
        console.log('names: ');
        console.log(names);

        console.log('column names: ');
        console.log(tableColumns);

        function repeatThis (e, fn2) {  // adds to columnNames and valueNames if the user input is valid
            isValidType(names[e], tableColumns[e], table_name, function (validType) {
                if (req.body[tableColumns[e]] !== '' && validType[0]) {
                    columnNames += tableColumns[e] + ',';
                    if (validType[1].search('varchar') > -1) {
                        valueNames += addQuotes(req.body[tableColumns[e]]) + ',';
                    } else {
                        valueNames += req.body[tableColumns[e]] + ',';
                    }
                }
                fn2(columnNames, valueNames);
            });
        }
        function returnSome(cNames, vNames) {
            console.log(cNames, vNames);
            fn(cNames, vNames);
        }
        function doNothing(cNames, vNames) {}
        for (var i = 0; i < tableColumns.length; i++) {
            if (i === names.length - 1) {  // repeats until the last item --> calls callback function
                console.log('get query');
                repeatThis(i, returnSome);
            } else {
                repeatThis(i, doNothing);
            }
        }
    }

    someNames = ['totalTideChange', 'waterCurrentMeasurementObject'];
    physicalDataNames = getNames(tideChangeChartInput);

    mergeArrays(physicalDataNames, someNames);

    getQuery(physicalDataNames, 'physical_data', function(columns, values) {
        if (columns !== '' && values !== '') {
            queryString = 'INSERT INTO physical_data (';
            queryString += columns.substring(0, columns.length - 1) + ')';
            queryString += ' VALUES (' + values.substring(0, values.length - 1);
            queryString += '); ';
            console.log('1: ' + queryString);
            conn.query(queryString, function(e) {
                if (e) {
                    if (errTypes.indexOf(getErrName(e) > -1)) {
                        res.send(getErrName(e));
                    } else {
                        throw e;
                    }
                } else {
                    console.log('Success!! physicalDataNames');
                }
            });
        } else {
            res.send('Empty query, please fill in the form.');
        }
    });
    waterCurrentArr = [];
    waterCurrentArr.push(waterCurrentNames.slice(0, 8));
    waterCurrentArr.push(waterCurrentNames.slice(8, 16));
    waterCurrentArr.push(waterCurrentNames.slice(16, 24));
    console.log(waterCurrentArr);
    for (var i = 0; i < 3; i++) {
        getQuery(waterCurrentArr[i], 'watercurrenttable', function(columns, values) {
            if (columns !== '' && values !== '') {
                for (var i = 0; i < waterCurrentNames.length; i++) {
                    waterCurrentNames[i] = waterCurrentNames[i].substring(0, waterCurrentNames[i].length - 1);
                }
                console.log(waterCurrentNames);
                queryString = 'INSERT INTO watercurrenttable (';
                queryString += columns.substring(0, columns.length - 2) + ')';
                queryString += ' VALUES (' + values.substring(0, values.length - 1);
                queryString += '); ';
                console.log('2: ' + queryString);
                conn.query(queryString, function(e) {
                    if (e) {
                        if (errTypes.indexOf(getErrName(e) > -1)) {
                            res.send(getErrName(e));
                        } else {
                            throw e;
                        }
                    } else {
                        console.log('Success!! waterCurrentArr[' + i + ']');
                    }
                });
            } else {
                res.send('Empty query, please fill in the form.');
            }
        });
    }
});

router.get('/tables', function(req, res) {
    'use strict';
    var tableNames = ['physical_data',
            'watercurrenttable',
            'site_description',
            'biologicalsampling',
            'methods',
            'chemicalanalysis',
            'documentation',
            'speciesfound',
            'teammembers',
            'speciestable2',
            'config'],
        tablesList = [],
        conn = req.conn;
    function pushAndRender(e, t) {
        if (e) {
            throw e;
        }
        tablesList.push(t);
        res.render('tables', {'tables': tablesList});
    }
    function pushTable(e, t) {
        if (e) {
            throw e;
        }
        tablesList.push(t);
    }
    for (var i = 0; i < tableNames.length; i++) {
        var name = tableNames[i];
        var queryString = "SELECT table_name, column_name, column_type AS type, " +
            "character_maximum_length AS max_length " +
            "FROM information_schema.columns " +
            "WHERE table_schema='pi' AND table_name='" + name + "'";
        if (i === tableNames.length - 1) {
            conn.query(queryString, pushAndRender);
        } else {
            conn.query(queryString, pushTable);
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
