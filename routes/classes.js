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
  var newClass = {
    title: req.body.title,
    //topic_id: 2,
    //date: '2016-09-25T01:00:00-07:00',
    image_url: req.body.image_url,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    address: req.body.address,
    price: req.body.price,
    description: req.body.description,
    prerequisites: req.body.prerequisites,
    duration: req.body.duration,
    total_seats: req.body.total_seats,
    seats_remaining: req.body.total_seats,
    //user_id: 6,
    creation_date: new Date()
  };
  return knex('classes')
    .insert(newClass)
    .then(function(data){
      res.send(data);
    })
    .catch(function(err) {
      console.log(err);
    });
});

//edit class
router.put('/:id', function(req, res, next) {
  //TODO knex update class
});

//delete class
router.delete('/:id', function(req, res, next) {
  knex('classes').delete().where({id: req.params.id}).then(function() {
    console.log('class deleted');
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
