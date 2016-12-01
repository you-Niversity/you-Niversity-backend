'use strict';

var environment = process.env.NODE_ENV || 'development';
var knexConfig  = require('../knexfile')[environment];
var knex = require('knex')(knexConfig);

module.exports = knex;
