'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var email = require('./email.js');


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
			res.status(500).json({err:err});
		});
});

router.post('/:id', function(req, res, next){
  var roster = {
    user_id: req.body.user_id,
    class_id: req.params.id
  }
  return knex('rosters')
    .insert(roster)
    .returning('user_id')
    .then(function(id){
      return knex('users')
        .select('email', 'first_name', 'last_name')
        .where({'users.id': JSON.parse(id)})
        .then(function(data){
          res.send(data[0]);
          var user = data[0];
					var subject = "Thanks for signing up, "  + user.first_name + "!";
					email.sendElasticEmail(user.email, subject, 'classconfirm');
        })
				.catch(function(err){
					res.status(500).json({err:err});
				});
    })
		.catch(function(err){
			res.status(500).json({err:err});
		});
});

//delete roster field
router.delete('/:id', function(req, res, next) {
  knex('rosters').delete().where({user_id: req.body.user_id, class_id: req.params.id}).then(function(response) {
    console.log('user removed from roster');
    res.json(response);
  })
	.catch(function(err){
		res.status(500).json({err:err});
	});
});

module.exports = router;
