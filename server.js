var express = require('express');
var app = express();
var mongoose = require('mongoose');

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
};

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(allowCrossDomain);
app.use(app.router);

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/kudos';
app.use(express.errorHandler({dumpExceptions: true}));
mongoose.connect(mongoUri);

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
    var command = {
        'group' : {
            'ns' : 'kudos',
            'initial' : {'kudoCount': 0},
            '$reduce' : 'function(doc, out){ out.kudoCount++ }',
            'key' : {'article': 1, 'title': 1, 'url': 1}
        }
    };
    mongoose.connection.db.executeDbCommand(command, function (err, dbres) {
        var ret = dbres.documents[0].retval;
        if (!err) {
            res.write(JSON.stringify(ret));
            res.send();
        } else {
            res.write("error");
            res.send();
        }

    });
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on port ", port);
});
