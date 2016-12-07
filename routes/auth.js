'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const email = require('./email.js');


////************ EXPORT THESE TWO FUNCTIONS ************/////////
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
  console.log('*************');
  console.log(req.body);
  console.log('*************');

  info.password = req.body.password;
  info.error.password = [];
  if(req.body.password.length <= 7) {
    info.passwordError = true;
    info.error.password.push({message: "Password should be 8 or more characters."});
  }
}
////************ EXPORT THESE TWO FUNCTIONS ************/////////


router.post('/signup', function(req, res, next){

  const { email, first_name, last_name, password, profile_pic, city, state, is_expert} = req.body;

  var info = {
    email,
    passwordError: false,
    error: {}
  };
  console.log("info", info);

  //validate password
  checkPassword(req, info);

  //check if email exists in db...
    userExistsInDB(email)
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
              var profile = {
                id: id[0],
                first_name,
                last_name
              };
              var token = jwt.sign(profile, process.env.SECRET);
              email.sendElasticEmail(email, 'Account Confirmation', 'accountconfirm');
              res.send(profile);
            })
            .catch(function(err){
              res.status(500).json({err:err});
            });
          });
      }
    });
});

router.post('/login', function(req, res, next) {

  const { email, password } = req.body;

  //check if email exists in db...
  userExistsInDB(email)
  .then(function(result){

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
