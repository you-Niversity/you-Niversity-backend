'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

//get all users
router.get('/', function(req, res, next){
  return knex ('users')
    .select('*')
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

//get user
router.get('/:id', function(req, res, next) {
  return knex('users')
    .select('*')
    .where({id: req.params.id})
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

//edit user
router.put('/:id', function(req, res, next) {
  //TODO knex update user
});

//delete user
router.delete('/:id', function(req, res, next) {
  //TODO knex delete user
});

module.exports = router;
