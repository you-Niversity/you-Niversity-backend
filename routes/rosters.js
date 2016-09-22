'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
//// START ELASTIC EMAIL /////
var querystring = require('querystring');
var https = require('https');

function sendElasticEmail(to, name, classname) {
	// Make sure to add your username and api_key below.
	var post_data = querystring.stringify({
		'username' : 'youNiversity',
		'api_key': process.env.ELASTIC_EMAIL,
		'from': 'you.niversity.education@gmail.com',
		'from_name' : 'youNiversity',
		'to' : to,
		'subject' : "Thanks for signing up for " + classname + ", " + name + "!",
		'template' : 'classconfirm'
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
		console.log('entered the email request body');
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

					sendElasticEmail(user.email, user.first_name);

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
