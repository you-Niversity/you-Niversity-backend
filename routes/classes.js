'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var email = require('./email.js');

//get all classes
router.get('/', function(req, res, next) {
  return knex ('classes')
    .select('*')
		.where('unix_timestamp', '>', Number((Date.now()).toString().slice(0,10)))
		.orderBy('unix_timestamp', 'asc')
    .then(function(data){
      res.send(data);
    })
		.catch(function(err){
			res.status(500).json({err:err});
		});
});

//get class
router.get('/:id', function(req, res, next) {
  return knex('classes')
    .join('users', {'users.id' : 'classes.user_id'})
    .select('*', 'classes.id AS id', 'users.id AS user_id')
    .where({'classes.id' : req.params.id})
    .then(function(data){
      res.send(data);
    })
		.catch(function(err){
			res.status(500).json({err:err});
		});
});

//update class
router.put('/:id/signup', function(req, res, next){
  return knex('classes')
  .where({'classes.id': req.params.id})
  .update('seats_remaining', req.body.seats_remaining)
  .then(function(data){
    res.sendStatus(200);
  })
	.catch(function(err){
		res.status(500).json({err:err});
	});
});

//get class comments
router.get('/:id/comments', function(req, res, next) {
  return knex('comments')
    .join('classes', {'classes.id' : 'comments.class_id'})
    .join('users', {'users.id': 'comments.commenter_id'})
    .select('comments.id AS id', 'comments.creation_date AS date', 'commenter_id', 'comment', 'first_name', 'last_name', 'profile_pic')
    .where({'classes.id' : req.params.id})
    .then(function(data){
      res.send(data);
    })
		.catch(function(err){
			res.status(500).json({err:err});
		});
});

router.post('/:id/comments', function(req, res, next){
  var comment = {
    class_id: req.params.id,
    commenter_id: req.body.commenter_id,
    comment: req.body.comment,
    creation_date: new Date()
  };
  return knex('comments')
    .insert(comment)
    .then(function(data){
      res.send(data);
    })
		.catch(function(err){
			res.status(500).json({err:err});
		});
});

//add class
router.post('/', function(req, res, next) {

  var newClass = {
    title: req.body.title,
    image_url: req.body.image_url,
    date: req.body.date,
		unix_timestamp: req.body.unix_timestamp,
    lat: req.body.lat,
    lng: req.body.lng,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    price: req.body.price,
    description: req.body.description,
    prerequisites: req.body.prerequisites,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    total_seats: req.body.total_seats,
    seats_remaining: req.body.total_seats,
    user_id: req.body.user_id,
    creation_date: new Date()
  };
  return knex('classes')
    .insert(newClass)
		.returning('id')
    .then(function(id){
      res.send(id);
    })
		.catch(function(err){
			res.status(500).json({err:err});
		});
});

//edit class
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var courseTitle = req.body.title;
  return knex('classes')
    .where({'classes.id': req.params.id})
    .update({
      title: req.body.title,
      image_url: req.body.image_url,
      date: req.body.date,
      lat: req.body.lat,
      lng: req.body.lng,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      price: req.body.price,
      description: req.body.description,
      prerequisites: req.body.prerequisites,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      total_seats: req.body.total_seats,
      seats_remaining: req.body.total_seats,
      user_id: req.body.user_id,
    })
    .then(function(){
      console.log(id);
      return knex('rosters')
        .join('users', {'users.id': 'rosters.user_id'})
        .select('users.id AS id', 'first_name', 'last_name', 'email')
        .where({'class_id': id})
        .then(function(data){
          var roster = data;
          roster.forEach(function(element){
						var subject = "The course " + courseTitle + " has been updated";
						email.sendElasticEmail(element.email, subject, "classupdated");
          });
          res.send(data);
        });
    })
		.catch(function(err){
			res.status(500).json({err:err});
		});
});

// router.delete('/:id', function(req, res, next) {
//   knex('classes')
// 	.delete()
// 	.where({id: req.params.id})
// 	.returning('title')
// 	.then(function(title) {
// 		//TODO: join tables to get class title and students
// 		//for each student, send email
// 		var subject = "The course " + title + " has been cancelled by the instructor";
// 		email.sendElasticEmail(element.email, subject, 'classdeleted');
//     res.json(response);
//   })
// 	.catch(function(err){
// 		res.status(500).json({err:err});
// 	});
// });

module.exports = router;
