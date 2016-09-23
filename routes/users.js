'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


//get all users
router.get('/', function(req, res, next){
  return knex ('users')
    .select('*')
    .then(function(data){
      console.log(data);
      res.json(data);
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

//get user classes teaching
router.get('/:id/teaching', function(req, res, next) {
  return knex('users')
    .join('classes', {'users.id': 'classes.user_id'})
    .select('users.id AS user_id', 'classes.id AS class_id', 'title', 'image_url', 'date', 'unix_timestamp')
    .where('unix_timestamp', '>', Number((Date.now()).toString().slice(0,10)))
    .andWhere({'users.id': req.params.id})
    .orderBy('unix_timestamp', 'asc')
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

//get user classes taking
router.get('/:id/taking', function(req, res, next) {
  return knex('rosters')
    .join('users', {'rosters.user_id': 'users.id'})
    .join('classes', {'rosters.class_id': 'classes.id'})
    .select('users.id AS user_id', 'classes.id AS class_id', 'title', 'image_url', 'date', 'unix_timestamp')
    .where('unix_timestamp', '>', Number((Date.now()).toString().slice(0,10)))
    .andWhere({'users.id': req.params.id})
    .orderBy('unix_timestamp', 'asc')
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

//get user reviews
router.get('/:id/reviews', function(req, res, next) {
  return knex('reviews')
    .join('users', {'reviews.reviewer_id': 'users.id'})
    .select('reviews.id AS id', 'reviews.reviewer_id AS reviewer_id', 'first_name', 'last_name', 'profile_pic', 'review', 'creation_date')

    .where({'reviews.teacher_id': req.params.id})
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

router.post('/:id/reviews', function(req, res, next) {
  var review = {
    teacher_id: req.params.id,
    reviewer_id: 1,
    review: req.body.review,
    creation_date: new Date()
  };
  return knex('reviews')
    .insert(review)
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
  knex('users').delete().where({id: req.params.id}).then(function() {
    console.log('user account deleted');
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
