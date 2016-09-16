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
    .select('users.id AS user_id', 'classes.id AS class_id', 'title', 'image_url', 'date')
    .where({'users.id': req.params.id})
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

    .select('users.id AS user_id', 'classes.id AS class_id', 'title', 'image_url', 'date')
    // .select('users.id AS user_id', 'classes.id AS class_id', 'title', 'image_url', 'date')
    .where({'users.id': req.params.id})
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
