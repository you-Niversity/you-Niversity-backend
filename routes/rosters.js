'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Gmailer = require("gmail-sender");

Gmailer.options({
	smtp: {
		service: "Gmail",
		user: "you.niversity.education@gmail.com",
		pass: process.env.MAIL_PASS
	}
});


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
    .returning('user_id')
    .then(function(id){
      return knex('users')
        .select('email', 'first_name', 'last_name')
        .where({'users.id': JSON.parse(id)})
        .then(function(data){
          res.send(data[0]);
          var user = data[0];
          Gmailer.send({
            subject: "Thanks for signing up for this class!",
            text: "*********CHANGE*******",
            from: "youNiversity",
            to: {
                email: user.email,
                name: user.first_name,
                surname: user.last_name
            }
          });
        })
        .catch(function(err){
          console.log(err);
        });
    })
    .catch(function(err){
      console.log(err);
    });
});

//delete roster field
router.delete('/:id', function(req, res, next) {
  knex('rosters').delete().where({user_id: req.body.user_id, class_id: req.params.id}).then(function(response) {
    console.log('user removed from roster');
    res.json(response);
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
