
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('config', {title: "Config", loggedIn: false});
});


module.exports = router;
