/**
 * Created by cchou on 7/18/2016.
 */
var express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next) {
    var conn = req.conn;
    if (req._parsedOriginalUrl.pathname == '/data/delete') {
        id = req._parsedUrl.query.substring(3);
        console.log(id);
        conn.query('DELETE FROM config WHERE id=' + id + 'LIMIT 1', function(e) {
            if (e) throw e;
            res.send('Deleted')
        });
    } else {
        var query = 'SELECT * FROM config WHERE id=' + req.originalUrl.split('/')[2] + ' LIMIT 1';
        conn.query(query, function (err, posts) {
            if (err) throw err;
            res.render('info', {title: 'Config', data: JSON.stringify(posts)});
        });
    }
});


module.exports = router;
