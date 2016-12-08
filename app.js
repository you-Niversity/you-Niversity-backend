'use strict';

require('dotenv').load();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');

const index = require('./routes/index');
const users = require('./routes/users');
const classes = require('./routes/classes');
const auth = require('./routes/auth');
const rosters = require('./routes/rosters');
const messages = require('./routes/messages');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);
app.use('/users', users);
app.use('/classes', classes);
app.use('/auth', auth);
app.use('/rosters', rosters);
app.use('/messages', messages);

app.get('/favicon.ico', function(req, res) {
    res.send(200);
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on port " + port);
});

module.exports = app;
