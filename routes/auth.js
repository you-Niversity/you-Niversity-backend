'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

//function checks to see if user already exists in db
function userExistsInDB(username) {
  console.log("entered userExistsInDB function");
  return knex.select('*').from('users').where({username: username});
}

//function validates password
function checkPassword(req, info) {
  console.log('entered checkPassword function');
  info.password = req.body.password;
  info.error.password = [];
  if(req.body.password.length <= 7) {
    info.passwordError = true;
    info.error.password.push({message: "Password should be 8 or more characters."});
  }
  var regex = /\d/g;
  if (!req.body.password.match(regex)) {
    info.passwordError = true;
    info.error.password.push({message: "Password must contain at least one number."});
  }
  var regex = /\W/g;
  if (!req.body.password.match(regex)) {
    info.passwordError = true;
    info.error.password.push({message: "Password must contain at least one special character."});
  }
}


router.post('/signup', function(req, res, next){
  var user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    profile_pic: req.body.profile_pic,
    city: req.body.city,
    state: req.body.state,
    is_expert: req.body.is_expert,
    is_admin: false
  };
  var info = {
    user: req.body.username,
    passwordError: false,
    error: {}
  };

  //validate password
  //checkPassword(req, info);

  //check if username exists in db...
  userExistsInDB(user.username)
    .then(function(result) {
      //Roger suggests IF TIME move below logic to userExistsInDB function, returning promise
      if (info.passwordError) {
        console.log(info.error.password);
        res.status(401).json(info.error.password);
        return;
      } else if (result.length >=1) {
        console.log('user already exists in system');
        res.status(401).json({message:'Sorry, but that username already exists!'});
        return;
      } else {
        //create the new user
        //below bcrypt can also be integrated into userExistsInDB function
        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            console.log('made it past bcrypt');
            knex('users').insert({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              username: req.body.username,
              email: req.body.email,
              password: hash,
              profile_pic: req.body.profile_pic,
              city: req.body.city,
              state: req.body.state,
              is_expert: req.body.is_expert,
              is_admin: false
            }).returning('id')

            .then(function(id){
              console.log('made it past knex query');
              var profile = {
                id: id[0],
                username: user.username
              };
              var token = jwt.sign(profile, process.env.SECRET);
              console.log(token);
              // res.status(200).json({ token:token });
              res.send(id);
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
    username: req.body.username,
    password: req.body.password
  };
  //check if username exists in db...
  userExistsInDB(user.username)
  .then(function(result){
    if (result.length === 0) {
      //user does not exist in system
      res.status(401).json({message:'Username does not exist.'});
      return;
    } else {
      user.id = result[0].id;
      bcrypt.compare(user.password, result[0].password, function(err, result) {
        console.log(result);
        if (result === false) {
      // if(user.password !== result.password) {
          res.status(401).send({message:'Incorrect username or password'});
          return;
        } else {
          var profile = {
            id: user.id,
            username: user.username
          };
          console.log(profile);
          var token = jwt.sign(profile, process.env.SECRET);
          res.status(200).json({ token:token, id:profile.id });
        }
      });
    }
  });
});


module.exports = router;
