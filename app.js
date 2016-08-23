'use strict';

require('dotenv').load();

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

var index = require('./routes/index');
var users = require('./routes/users');
var classes = require('./routes/classes');

var app = express();

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);
app.use('/users', users);
app.use('/classes', classes);

app.get('/favicon.ico', function(req, res) {
    res.send(200);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on port " + port);
});

module.exports = app;
