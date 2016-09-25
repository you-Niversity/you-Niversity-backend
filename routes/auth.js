'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

//// START ELASTIC EMAIL /////
var querystring = require('querystring');
var https = require('https');

function sendElasticEmail(to) {
	// Make sure to add your username and api_key below.
	var post_data = querystring.stringify({
		'username' : 'kristenlfoster@gmail.com',
		'api_key': process.env.ELASTIC_EMAIL,
		'from': 'you.niversity.education@gmail.com',
		'from_name' : 'youNiversity',
		'to' : to,
		'subject' : 'Account Confirmation',
		'template' : 'accountconfirm'
	});

	// Object of options.
	var post_options = {
		host: 'api.elasticemail.com',
		path: '/mailer/send',
		port: '443',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': post_data.length
		}
	};
	var result = '';
	// Create the request object.
	var post_req = https.request(post_options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			result = chunk;
		});
		res.on('error', function (e) {
			result = 'Error: ' + e.message;
      console.log('there was an error on elastic email side');
		});
	});

	// Post to Elastic Email
	post_req.write(post_data);
	post_req.end();
	return result;
}

//// END ELASTIC EMAIL /////

//function checks to see if user already exists in db
function userExistsInDB(email) {
  console.log("entered userExistsInDB function");
  return knex.select('*').from('users').where({email: email});
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
}

router.post('/signup', function(req, res, next){

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
      if (info.passwordError) {
        console.log(info.error.password);
        res.status(401).json(info.error.password);
        return;
      } else if (result.length >=1) {
        console.log('user already exists in system');
        res.status(401).json({message:'Sorry, but that email already exists!'});
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
                first_name: req.body.first_name,
                last_name: req.body.last_name
              };
              var token = jwt.sign(profile, process.env.SECRET);
              console.log(token);

              sendElasticEmail(req.body.email);
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
      console.log('user does not exist');
      //user does not exist in system
      res.status(401).json({message:'Email does not exist.'});
      return;
    } else {
      console.log('user does indeed exist');
      console.log(result);
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
          console.log(profile);
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
