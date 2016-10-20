var express = require('express'),
    url = require('url'),
    jQuery = require('jquery'),
    mysql = require('mysql'),

    flag = require('../flag.js'),

    router = express.Router();
    var fs = require('fs');

require("../Math.uuid");

router.post('/workaround', function (req, res) {
    console.log(req.body);
    var writeStream = fs.createWriteStream(`bin/dump/${Math.uuid(29)}`, {flags: 'w', encoding: 'utf-8',mode: 0666});
    writeStream.on('open', function(fd) {
      writeStream.write(JSON.stringify(req.body));
res.send("done");
    });


  writeStream.on('error', function (err) {
    console.log(err);
  });
});

module.exports = router;
