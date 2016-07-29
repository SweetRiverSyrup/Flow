/**
 * Created by ifabricatore on 7/15/2016.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('form', { title: 'Flow' });
});

/* GET users listing. */
router.post('/', function(req, res) {

});

module.exports = router;

