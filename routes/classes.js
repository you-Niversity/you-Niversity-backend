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
    .join('users', {'users.id' : 'classes.user_id'})
    .select('*')
    .where({'classes.id' : req.params.id})
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

//update class
router.put('/:id', function(req, res, next){
  return knex('classes')
  .where({'classes.id': req.params.id})
  .update('seats_remaining', req.body.seats_remaining)
  .then(function(data){
    res.sendStatus(200);
  })
  .catch(function(err){
    console.log(err);
  });
});

//get class comments
router.get('/:id/comments', function(req, res, next) {
  return knex('comments')
    .join('classes', {'classes.id' : 'comments.class_id'})
    .join('users', {'users.id': 'comments.commenter_id'})
    .select('comments.id AS id', 'comments.creation_date AS date', 'commenter_id', 'comment', 'first_name', 'last_name', 'profile_pic')
    .where({'classes.id' : req.params.id})
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

router.post('/:id/comments', function(req, res, next){
  var comment = {
    class_id: req.params.id,
    commenter_id: 1,
    comment: req.body.comment,
    creation_date: new Date()
  };
  return knex('comments')
    .insert(comment)
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

//add class
router.post('/', function(req, res, next) {
  console.log(req.body.user_id);
  var newClass = {
    title: req.body.title,
    image_url: req.body.image_url,
    date: req.body.date,
    lat: req.body.lat,
    lng: req.body.lng,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    price: req.body.price,
    description: req.body.description,
    prerequisites: req.body.prerequisites,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    total_seats: req.body.total_seats,
    seats_remaining: req.body.total_seats,
    user_id: req.body.user_id,
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
