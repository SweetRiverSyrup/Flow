/**
 * Created by cchou on 7/21/2016.
 */
var express = require('express'),
    url = require('url'),
    jQuery = require('jquery'),
    mysql = require('mysql'),

    convert = require('../public/javascript/convert.funct'),
    flag = require('../flag.js'),

    router = express.Router();

require("../Math.uuid");


router.post('/config', function(req, res){
    //Get the form values from their name attributes like:
    //var userName = req.body.username
    //theres going to be a lot of this
    var conn = req.conn;
    var river = req.body.selectRiver;
    var riverLocation = req.body.selectRiverLocation;
    var riverLocationSite = req.body.selectRiverLocationSite;
    //END
    var class_uuid = Math.uuid();

    conn.query(
        "UPDATE config " +
        "SET class_uuid = ?," +
        "river = ?, " +
        "location = ?, " +
        "site = ? " +
        "WHERE id=1",
        [class_uuid, river, riverLocation, riverLocationSite],
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
    var errors = [],
        data = {};

//Test error array
    if (typeof errors !== 'undefined' && errors.length > -1) {
        data.errors = errors;
        console.log(data.errors);
    } else {
        data.message = "Yay";
        data.works = "Hell yas bish this shit works on fleeeeeek";
        try {
            data.flag = flag.flag({text: 'AJAX freakin works!!', type:'win', to:'flag-center'});
        }
        catch (err) {
            console.log(err.message + " occurred using flag function");
            return err.message;
        }
        data.flag = flag.flag({text: 'AJAX freakin works!!', type:'win', to:'flag-center'});

        var json = {
            "flag": flag.flag({text: 'AJAX freakin works!!', type: 'win', to: 'flag-center'}),
            "message": "yay"
        };

        console.log(json);
    }

    res.send(json);
});

//Get Config page
router.get('/config', function(req, res) {
    $ = req.dom;

    res.render('config', {title: "Flow Config"});
});

router.post('/submit', function(req, res) {});

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

    conn.query('ALTER TABLE watercurrenttable MODIFY stopTime VARCHAR(32);');

    for (var i = 0; i < tableNames.length; i++) {
        var name = tableNames[i];
        var queryString = "SELECT table_name, column_name, column_type AS type " +
            "FROM information_schema.columns " +
            "WHERE table_schema='pi' AND table_name='" + name + "'";
        if (i === tableNames.length - 1) {
            conn.query(queryString, pushAndRender);
        } else {
            conn.query(queryString, pushTable);
        }
    }
});

router.post('/myaction', function(req, res) {
    if (req.query.test == true) {
        var dat = {result: "potatos"}
    }

    res.send({result: "potatos"});
});

router.post('/fooorm', function (req, res) {
    const WATER_CURRENT_TBL_LENGTH = 7;
    var data = {
            message: null,
            flag: null
        },
        conn1 = mysql.createConnection({
            host: '130.199.94.196', // should be localhost outside of testing mode
            user: 'root',
            password: 'alpine',
            database: 'pi'
        }),

        rfuOptions = ['Rising', 'Falling', 'Unchanged'],
        directionOptions = [
            'North',
            'South',
            'East',
            'West',
            'Northeast',
            'Southeast',
            'Northwest',
            'Southwest'
        ],
        ebbFlowSlackOptions = ['Ebb Tide', 'Flood (Flow) Tide', 'Slack Tide'],
        beaufortScaleDescriptions = [
            'calm',
            'light air',
            'light breeze',
            'gentle breeze',
            'moderate breeze',
            'fresh breeze',
            'strong breeze',
            'near gale'
        ],

        subTables = [
            'watercurrenttable',
            'methods',
            'speciesfound',
            'teammembers',
            'speciestable2'
        ],

        physicalDataNames = [
            'tideChangeAtTime10',
            'tideIsRFUAtTime10',
            'tideChangeAtTime20',
            'tideIsRFUAtTime20',
            'tideChangeAtTime30',
            'tideIsRFUAtTime30',
            'totalTideChange',
            'waterCurrentMeasurementObject',
            'currentSpeedCMpSAvg',
            'currentSpeedKntsAvg',
            'time1',
            'tempF1',
            'tempC1',
            'time2',
            'tempF2',
            'tempC2',
            'time3',
            'tempF3',
            'tempC3',
            'cloudCover',
            'windDirection',
            'windSpeedMph',
            'windSpeedKnots',
            'windBeaufortScale'
        ],
        waterCurrentNames = [
            'startTime1',
            'stopTime1',
            'distanceTraveled1',
            'direction1',
            'currentSpeedCmPerSec1',
            'currentSpeedKnots1',
            'ebbFlowSlack1',
            'startTime2',
            'stopTime2',
            'distanceTraveled2',
            'direction2',
            'currentSpeedCmPerSec2',
            'currentSpeedKnots2',
            'ebbFlowSlack2',
            'startTime3',
            'stopTime3',
            'distanceTraveled3',
            'direction3',
            'currentSpeedCmPerSec3',
            'currentSpeedKnots3',
            'ebbFlowSlack3'
        ],
        // create array separating the rows of water current names
        waterCurrentArr = [
            waterCurrentNames.slice(0, WATER_CURRENT_TBL_LENGTH),
            waterCurrentNames.slice(WATER_CURRENT_TBL_LENGTH, WATER_CURRENT_TBL_LENGTH * 2),
            waterCurrentNames.slice(WATER_CURRENT_TBL_LENGTH * 2, WATER_CURRENT_TBL_LENGTH * 3)
        ],
        waterCurrentId = 1,
        actualTotalTideChange = 0,
        dbSize,
        queryString;

    function isValidType(name, colName, tableName, fn) {

        conn1.query("SELECT COLUMN_NAME, COLUMN_TYPE " +
            "FROM INFORMATION_SCHEMA.COLUMNS " +
            "WHERE TABLE_SCHEMA = 'pi' " +
            "AND TABLE_NAME = '" + tableName +
            "';", function (e, info) {
            if (e) {
                throw e;
            }
            var colTypes = info;

            function isFloat(num, index) {

                // for example: the column_type 'float{10,5)' would have a size of [5, 5]
                var sizeSplit = colTypes[index]['COLUMN_TYPE'].split(/[()]/)[1].split(','),
                    size1 = sizeSplit[0] - sizeSplit[1],
                    size2 = sizeSplit[1],
                    size = [size1, size2];

                if (typeof num === "number") {
                    num = num.toString();
                }
                if (typeof num === "string") {
                    if (num.indexOf(".") > -1) {
                        var float = num.split(".");
                        return [float[0].length <= size[0] && float[1].length <= size[1], colTypes[index]['COLUMN_TYPE']];
                    } else {
                        return [num.length <= size[0], colTypes[index]['COLUMN_TYPE']];
                    }
                }
            }

            for (var i = 0; i < colTypes.length; i++) {
                if (colTypes[i]['COLUMN_NAME'] === colName) {
                    if (colTypes[i]['COLUMN_TYPE'].search('float') > -1) {  // if database type is a float
                        // if the input matches
                        try {
                            fn(isFloat(req.body[name], i));
                        } catch (err) {
                            console.error("Error" + err.message[0]);
                            fn([false, colTypes[i]['COLUMN_TYPE']]);
                        }
                    } else {
                        // gets the size (integer) if the column_type is not a float
                        dbSize = +colTypes[i]['COLUMN_TYPE'].split(/[()]/)[1];

                        // to handle undefined req.body[name] for unchecked radio buttons
                        // typically gives an empty field error to the user for them to fix it
                        if (typeof req.body[name] === 'undefined') {
                            fn([false, colTypes[i]['COLUMN_TYPE']]);
                        } else {
                            fn([req.body[name].length <= dbSize, colTypes[i]['COLUMN_TYPE']]);
                        }
                    }
                }
            }
        });
    }

    function addQuotes(string) {
        return "'" + string + "'";
    }

    function addGrave(string) {
        return '`' + string + '`';
    }

    function getQuery(names, table_name, fn) {
        /**
         * Takes form input names and returns column names and value names for the query
         */
        var tableColumns = [],
            columnNames,  // names have index numbers, while column names have no numbers (for sub-tables)
            valueNames;

        function repeatThis(e, fn2) {

            // adds to columnNames and valueNames if the user input is valid
            isValidType(names[e], tableColumns[e], table_name, function (validType) {
                if (req.body[names[e]] !== '' && validType[0]) {
                    columnNames += addGrave(tableColumns[e]) + ',';
                    if (req.body[names[e]].search('tideChange') > -1) {
                        valueNames += addQuotes(req.body[names[e]].replace(',', ''));
                    } else {
                        valueNames += addQuotes(req.body[names[e]]);
                    }
                    valueNames += ',';
                } else {
                    console.log('Not a valid type: ' + names[e] + ' ' + req.body[names[e]] + ' ' + validType[1]);
                }
                fn2(columnNames, valueNames);
            });
        }

        function returnSome(cNames, vNames) {
            fn(cNames, vNames);
        }

        function doNothing(cNames, vNames) {
        }

        if (subTables.indexOf(table_name) > -1) {  // if the table is a sub-table
            tableColumns = names.map(function(obj) {
                return obj.substring(0, obj.length - 1);  // takes off number
            });
        } else {
            tableColumns = names;
        }
        columnNames = '';
        valueNames = '';
        for (var i = 0; i < names.length; i++) {
            if (i === names.length - 1) {  // repeats until the last item --> calls callback function
                repeatThis(i, returnSome);
            } else {
                repeatThis(i, doNothing);
            }
        }
    }

    function getQueriesWaterCurrentTable(index) {  // this is repeated 3 times for each row in the water current table

        getQuery(waterCurrentArr[index], 'watercurrenttable', function (columns, values) {
            if (columns !== '' && values !== '') {
                columns = '`key`,' + columns;
                values = addQuotes(waterCurrentId.toString()) + ',' + values;
                queryString = 'INSERT INTO watercurrenttable (';
                queryString += columns.substring(0, columns.length - 1) + ')';
                queryString += ' VALUES (' + values.substring(0, values.length - 1);
                queryString += '); ';
                console.log('2: ' + queryString);
                conn1.query(queryString, function (e) {
                    if (e) {
                        throw e;
                    } else {
                        console.log('Success!! waterCurrentArr[' + index + ']');
                    }
                });
            }
        });
    }

    // Adds the vertical tide change values to use to later check with the 'Total Tide Change' input
    if (req.body['tideIsRFUAtTime10'] === 'Rising') {
        actualTotalTideChange += Number(req.body['tideChangeAtTime10']);
    } else if (req.body['tideIsRFUAtTime10'] === 'Falling') {
        actualTotalTideChange -= Number(req.body['tideChangeAtTime10']);
    }

    if (req.body['tideIsRFUAtTime20'] === 'Rising') {
        actualTotalTideChange += Number(req.body['tideChangeAtTime20']);
    } else if (req.body['tideIsRFUAtTime20'] === 'Falling') {
        actualTotalTideChange -= Number(req.body['tideChangeAtTime20']);
    }

    if (req.body['tideIsRFUAtTime30'] === 'Rising') {
        actualTotalTideChange += Number(req.body['tideChangeAtTime30']);
    } else if (req.body['tideIsRFUAtTime30'] === 'Falling') {
        actualTotalTideChange -= Number(req.body['tideChangeAtTime30']);
    }

    // form validation
    for (var key in req.body) {
        // TODO check if numbers are logically too small or large after converting to one unit

        // hasOwnProperty check, skips unit selects for now
        if (! req.body.hasOwnProperty(key) || (physicalDataNames.indexOf(key) === -1 && waterCurrentNames.indexOf(key) === -1)) {
            continue;
        }

        // if key is in either physicalDataNames or waterCurrentNames
        if (physicalDataNames.indexOf(key) > -1 || waterCurrentNames.indexOf(key) > -1) {

            if (req.body[key] === '') {
                data.message = 'Empty field.';

            } else if (key.indexOf('tideIsRFU') > -1 && req.body[key] === 'Unchanged'
                && req.body['tideChangeAtTime' + key.substring(15)] !== '0') {
                data.message = 'An unchanged value means vertical tide change should be 0.';
            } else if (key.indexOf('tideIsRFU') > -1 && req.body['tideChangeAtTime' + key.substring(15)] === '0'
                && req.body[key] !== 'Unchanged') {
                data.message = 'A tide change of 0 means that the tide was Unchanged.';

            } else if (key.indexOf('RFU') > -1 && rfuOptions.indexOf(req.body[key]) === -1) {
                data.message = 'Input must be \'Rising\', \'Falling\', or \'Unchanged\'';

            } else if ((key.toLowerCase().indexOf('tidechange') > -1 || key.indexOf('distance') > -1 ||
                key.indexOf('currentSpeed') > -1 || key.indexOf('temp') > -1 || key.indexOf('windSpeed') > -1)
                && !/^-?([1-9]\d*|0)(\.\d+)?$/.test(req.body[key])) {
                data.message = 'Invalid number format.';

            } else if (key === 'waterCurrentMeasurementObject' && /\d/.test(req.body[key])) {
                data.message = 'Input should not only consist of numbers.';

            } else if (key.toLowerCase().indexOf('time') > -1 && key.indexOf('tide') === -1 &&
                ! /^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/.test(req.body[key])) {
                data.message = 'The correct time format is 0:00 am/pm.';

            } else if (key.toLowerCase().indexOf('direction') > -1 && directionOptions.indexOf(req.body[key]) === -1) {
                data.message = 'Direction must be \'North\', \'South\', \'East\', or \'West\'.';

            } else if (key === 'totalTideChange' && req.body[key] != Math.abs(actualTotalTideChange)) {
                data.message = 'Total tide change does not match increments of tide change.';

            } else if (key.indexOf('ebbFlowSlack') > -1 && ebbFlowSlackOptions.indexOf(req.body[key]) === -1) {
                data.message = 'Your input must be a choice in the dropdown menu.';

            } else if ( (key === 'currentSpeedCMpSAvg' && Math.round(Number(req.body[key])) !== Math.round((Number(req.body['currentSpeedCmPerSec1']) +
                Number(req.body['currentSpeedCmPerSec2']) + Number(req.body['currentSpeedCmPerSec3'])) / 3)) ||
                (key === 'currentSpeedKntsAvg' && Math.round(Number(req.body[key])) !== Math.round((Number(req.body['currentSpeedKnots1']) +
                Number(req.body['currentSpeedKnots2']) + Number(req.body['currentSpeedKnots3'])) / 3)) ) {
                data.message = 'Average is not calculated correctly.' + Math.round(Number(req.body[key]));

            } else if (key.indexOf('tempF') > -1 && Math.round(Number(req.body['tempC' + key.charAt(key.length - 1)]))
                !== Math.round(convert.f2c(Number(req.body[key])))) {
                data.message = 'Conversion is incorrect. Formula: F = (9/5) x C + 32';

            } else if (key === 'windBeaufortScale' && beaufortScaleDescriptions.indexOf(req.body[key]) === -1) {
                data.message = 'Input does not match a given option. Please select from the dropdown menu.';

            } else {  // no errors yet
                continue;
            }

            data.flag = {text: data.message};
            data.flag.nameRef = key;
            data.flag.type = 'ewarn';

            break;  // break at the first error (temporary)
        }

    }

    if (data.message === null) {  // if no error was sent
        console.log(req.body);
        conn1.connect(function(err) {
            if (err) throw err;
            console.log('Connected to MariaDB inside /fooorm');
            // these are names not included in sub-tables
            conn1.query('SELECT id FROM physical_data', function(err, dataFromQuery) {
                if (err) throw err;
                if (dataFromQuery.length > 0) {
                    var dataValues = dataFromQuery.map(function(obj) {
                        return parseInt(obj.id);
                    });
                    waterCurrentId = Math.max.apply(null, dataValues) + 1;
                }
                getQuery(physicalDataNames, 'physical_data', function(columns, values) {
                    if (columns !== '' && values !== '') {
                        queryString = 'INSERT INTO physical_data (' + columns.substring(0, columns.length - 1) + ')'
                            + ' VALUES (' + values.substring(0, values.length - 1) + '); ';

                        console.log('1: ' + queryString);
                        conn1.query(queryString, function(e) {
                            if (e) {
                                throw e;
                            } else {
                                console.log('Success!! physicalDataNames');
                            }
                        })
                    }
                });
                for (var i = 0; i < 3; i++) {
                    getQueriesWaterCurrentTable(i);
                }
            });
        });
    }
    res.send(data);

});

module.exports = router;
