'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


//grabs roster for specific class, joins with user info
router.get('/:id', function(req, res, next){
  return knex('rosters')
    .join('classes', {'classes.id': 'rosters.class_id'})
    .join('users', {'users.id': 'rosters.user_id'})
    .select('users.id', 'first_name', 'last_name', 'profile_pic')
    .where({'classes.id' : req.params.id})
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

router.post('/:id', function(req, res, next){
  var roster = {
    user_id: req.body.user_id,
    class_id: req.params.id
  }
  return knex('rosters')
    .insert(roster)
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

module.exports = router;
