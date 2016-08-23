'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

//get all topics
router.get('/', function(req, res, next) {
  return knex ('topics')
    .select('*')
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

//get topic
router.get('/:id', function(req, res, next) {
  return knex('topics')
    .select('*')
    .where({id:req.params.id})
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

//add topic
router.post('/', function(req, res, next) {
  console.log(req.body);
  return knex('topics')
    .insert({title:req.body.title})
    .then(function(data){
      res.send(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

//edit topic
router.put('/:id', function(req, res, next) {
  //TODO knex update topic
});

//delete topic
router.delete('/:id', function(req, res, next) {
  knex('topics').delete().where({id: req.params.id}).then(function() {
    console.log('topic deleted');
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
