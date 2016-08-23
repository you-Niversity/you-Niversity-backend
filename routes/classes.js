'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

//get all classes
router.get('/', function(req, res, next) {
  return knex ('classes')
    .select('*')
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

//get class
router.get('/:id', function(req, res, next) {
  return knex('classes')
    .select('*')
    .where({id:req.params.id})
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

//add class
router.post('/', function(req, res, next) {
  //TODO knex insert class
});

//edit class
router.put('/:id', function(req, res, next) {
  //TODO knex update class
});

//delete class
router.delete('/:id', function(req, res, next) {
  //TODO knex delete class
});

module.exports = router;
