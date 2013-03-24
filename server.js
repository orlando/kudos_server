var express = require('express');
var app = express();
var mongoose = require('mongoose');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  mongoose.connect('mongodb://localhost/kudos');
});

app.configure('production', function(){
  app.use(express.errorHandler());
  mongoose.connect(process.env.MONGOHQ_URL);
});

var Kudo = require('./app/models/Kudo.js');

app.post('/kudos', function (req, res) {
    var kudo = new Kudo({
        article: req.body.article,
        title: req.body.title,
        url: req.body.url
    });

    kudo.save(function (err) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write('error');
            res.send();
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write('kosher');
            res.send();
        }
    });
});

app.get('/kudos', function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var kudos = Kudo.find({}, function (err, kudos) {
        if (!err){
            res.write(JSON.stringify(kudos));
            res.send();
        } else {
            res.send("error");
        }
    });
});

app.listen(3000, function(){
  console.log("Express server listening on port %d", this.address().port);
});
