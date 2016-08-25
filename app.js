'use strict';

require('dotenv').load();

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var classes = require('./routes/classes');
var topics = require('./routes/topics');
var auth = require('./routes/auth');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//allows cross-origin requests
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use('/', index);
app.use('/users', users);
app.use('/classes', classes);
app.use('/topics', topics);
app.use('/auth', auth);

app.get('/favicon.ico', function(req, res) {
    res.send(200);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on port " + port);
});

module.exports = app;
