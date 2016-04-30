var express = require('express');
var port = process.env.PORT || 8080;
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

// configuration ===============================================================
// set the static files location /public/img will be /img for users
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
// log every request to the console
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
