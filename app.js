
var express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    mysql = require('mysql'),
    j = require('jquery'),
    cheerio = require('cheerio'),
    url = require('url'),
    $ = cheerio.load('./views/form.ejs'),
    flag = require('./flag'),

    routes = require('./routes/index'),
    getById = require('./routes/getById'),

    app = express();

const path = require('path');
console.log("Runtime applet directory: " + __dirname);
/* Use this in the web browser javascript console
* $('body').find("unit-sel").each(function() {
 var superID = $( this ).parent().parent().find("input").attr("id");
 var currID = $(this).attr('id', superID + "Units");
 console.log("ID: " + currID);
 });
* */

//Send useful variables to every page request
app.use(function(req,res,next){
    //Send the connection variable on every request
    //req.query = url.parse(req.url).query;

    req.conn = conn;
    //Establishes the DOM on the server-side for quick manipulations
    // by reading the file contents of form.ejs.bak and converts it to
    // a string, then loads it with the Cheerio module
    fs.readFile(__dirname+"/views/form.ejs", function(err, html){
        if(err) throw err; //Handle unexpected errors
        req.rawHTML = html.toString(); // keep raw html
        $ = cheerio.load(html.toString());//create DOM reference
    });
    req.dom = $; //Send the DOM with each request
    next();//Move on
});


//Create connection variable for use
var conn = mysql.createConnection({
    host: '130.199.94.196', //the ip of the computer running the database, should be localhost when not in testing mode
    user: 'root', //DO NOT CHANGE THIS IN MARIA
    password: 'alpine', //DO NOT CHANGE THIS IN MARIA
    database: 'pi' //DO NOT CHANGE THIS IN MARIA
});

conn.connect(function(err) {
    if (err) throw err;
    console.log('Successful connection to MariaDB server!');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Add these to handle AJAX POST requests
app.post('/fooorm', function (req, res, next) {
    next();
});

app.use('/', routes);
app.use('/data/:id', getById);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
