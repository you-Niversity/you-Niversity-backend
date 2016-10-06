'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var email = require('./email.js');

//function checks to see if user already exists in db
/////todo: get user
function userExistsInDB(email) {
  console.log('user exists in database function');
  return knex.select('*').from('users').where({email: email});
}

//function validates password
//todo: minlength test...use multiple contexts
//generic as possible here...comple error message on client side
function checkPassword(req, info) {
  info.password = req.body.password;
  info.error.password = [];
  if(req.body.password.length <= 7) {
    info.passwordError = true;
    info.error.password.push({message: "Password should be 8 or more characters."});
  }
}

router.post('/signup', function(req, res, next){
  console.log('entering signup function');
  var info = {
    email: req.body.email,
    passwordError: false,
    error: {}
  };

  //validate password
  checkPassword(req, info);

  //check if email exists in db...
  userExistsInDB(req.body.email)
    .then(function(result) {
      //Roger suggests IF TIME move below logic to userExistsInDB function, returning promise
      console.log('made it past user exists in database function');

      if (info.passwordError) {
        res.status(401).json(info.error.password);
        return;
      } else if (result.length >=1) {
        console.log('sorry but that user already exists');

        res.status(401).json({message:'Sorry, but that email already exists!'});
        return;
      } else {
        //create the new user
        //below bcrypt can also be integrated into userExistsInDB function
        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            knex('users').insert({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              password: hash,
              profile_pic: req.body.profile_pic,
              city: req.body.city,
              state: req.body.state,
              is_expert: req.body.is_expert,
              is_admin: false
            }).returning('id')

            .then(function(id){
              var profile = {
                id: id[0],
                first_name: req.body.first_name,
                last_name: req.body.last_name
              };
              var token = jwt.sign(profile, process.env.SECRET);
              email.sendElasticEmail(req.body.email, 'Account Confirmation', 'accountconfirm');
              res.send(profile);
            })
            .catch(function(err){
              res.status(500).json({err:err});
            });
          });
        });
      }
    });
});

router.post('/login', function(req, res, next) {
  var user = {
    email: req.body.email,
    password: req.body.password
  };
  //check if email exists in db...
  userExistsInDB(user.email)
  .then(function(result){
    if (result.length === 0) {
      //user does not exist in system
      res.status(401).json({message:'Email does not exist.'});
      return;
    } else {
      user.id = result[0].id;
      user.first_name = result[0].first_name;
      user.last_name = result[0].last_name;
      user.profile_pic = result[0].profile_pic;
      bcrypt.compare(user.password, result[0].password, function(err, result) {
        if (result === false) {
          res.status(401).send({message:'Incorrect email or password'});
          return;
        } else {
          var profile = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_pic: user.profile_pic
          };
          var token = jwt.sign(profile, process.env.SECRET);
          res.status(200).json({ token:token, profile:profile });
        }
      });
    }
  })
	.catch(function(err){
		res.status(500).json({err:err});
	});
});

module.exports = router;
