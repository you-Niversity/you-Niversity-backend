'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const { sendElasticEmail } = require('../js/email.js');


//grabs roster for specific class, joins with user info
router.get('/:id', function(req, res){
  return knex('rosters')
    .join('classes', {'classes.id': 'rosters.class_id'})
    .join('users', {'users.id': 'rosters.user_id'})
    .select('users.id', 'first_name', 'last_name', 'profile_pic')
    .where({
      'classes.id' : req.params.id
    })
    .then(function(data){
      res.send(data);
    })
		.catch(function(err){
			res.status(500).json({err});
		});
});

router.post('/:id', function(req, res){

  const roster = {
    user_id: req.body.user_id,
    class_id: req.params.id
  }

  return knex('rosters')
    .insert(roster)
    .returning('user_id')
    .then(function(id){
      return knex('users')
        .select('email', 'first_name', 'last_name')
        .where({
          'users.id': JSON.parse(id)
        })
        .then(function(data){
          res.send(data[0]);
          const {email, first_name} = data[0];
					const subject = "Thanks for signing up, "  + first_name + "!";
					sendElasticEmail(email, subject, 'classconfirm');
        })
				.catch(function(err){
					res.status(500).json({err});
				});
    })
		.catch(function(err){
			res.status(500).json({err});
		});
});

//delete roster field
router.delete('/:id', function(req, res) {

  const { user_id } = req.body;

  knex('rosters')
    .delete()
    .where({
      user_id,
      class_id: req.params.id
    })
    .then(function(response) {
    res.json(response);
  })
	.catch(function(err){
		res.status(500).json({err});
	});
});

module.exports = router;
