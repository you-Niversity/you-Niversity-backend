'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { validatePassword, userExistsInDB } = require('../js/validations.js');
const { sendElasticEmail } = require('../js/email.js');


router.post('/signup', function(req, res, next){

  const { email, first_name, last_name, password, profile_pic, city, state, is_expert} = req.body;

  var info = {
    email,
    passwordError: false,
    error: {}
  };

  validatePassword(req, info);

  userExistsInDB(email).then(function(result) {
      //Roger suggests IF TIME move below logic to userExistsInDB function, returning promise

      if (info.passwordError) {
        res.status(401).json(info.error.password);
        return;
      }

      if (result.length >=1) {
        res.status(401).json({message:'Sorry, but that email already exists!'});
        return;
      }

      bcrypt.hash(password, 10, function(err, hash) {
          knex('users').insert({
            first_name,
            last_name,
            email,
            password: hash,
            profile_pic,
            city,
            state,
            is_expert,
            is_admin: false
          }).returning('id')

          .then(function(id){
            console.log("id:", id);
            var profile = {
              id: id[0],
              first_name,
              last_name,
              token: null
            };

            profile.token = jwt.sign(profile, process.env.SECRET);

            console.log("profile:", profile);

            sendElasticEmail(email, 'Account Confirmation', 'accountconfirm');
            res.send(profile);
          })
          .catch(function(err){
            res.status(500).json({err:err});
          });
      });
  });
});

router.post('/login', function(req, res, next) {

  const { email, password } = req.body;

  userExistsInDB(email).then(function(result){
    if (result.length === 0) {
      res.status(401).json({message:'Email does not exist.'});
      return;
    }

    const {id, first_name, last_name, profile_pic} = result[0];

    bcrypt.compare(password, result[0].password, function(err, result) {
      if (result === false) {
        res.status(401).send({message:'Incorrect email or password'});
        return;
      }

      var profile = {
        id,
        first_name,
        last_name,
        profile_pic
      };

      var token = jwt.sign(profile, process.env.SECRET);
      res.status(200).json({ token:token, profile:profile });
    });
  })
	.catch(function(err){
		res.status(500).json({err:err});
	});
});

module.exports = router;
