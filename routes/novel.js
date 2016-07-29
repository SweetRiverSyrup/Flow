var express = require('express'),
    mysql = require('mysql'),

    router = express.Router();

router.get('/',function(req,res){
    var conn = req.conn;
    console.log('Getting data..');
    conn.query("SELECT * FROM config", function(e, docs) {
        console.log(docs);
        res.render('class', {title: 'Documents', links: docs});
    });
});

router.post('/', function(req, res) {
    collection.insert({'greeting': req.body.greeting, 'language': req.body.language});
    res.redirect('back');
});

module.exports = router;
