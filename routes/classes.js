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
      console.log(err);
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
      console.log(err);
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
    console.log(err);
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
      console.log(err);
    });
});

router.post('/:id/comments', function(req, res, next){
  var comment = {
    class_id: req.params.id,
    commenter_id: 1,
    comment: req.body.comment,
    creation_date: new Date()
  };
  return knex('comments')
    .insert(comment)
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

//add class
router.post('/', function(req, res, next) {
  console.log(req.body.user_id);
  var newClass = {
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
    creation_date: new Date()
  };
  return knex('classes')
    .insert(newClass)
    .then(function(data){
      res.send(data);
    })
    .catch(function(err) {
      console.log(err);
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
            console.log(element.email);
            Gmailer.send({
              subject: "The course " + courseTitle + " has been updated",
              from: "youNiversity",
              to: {
                  email: element.email,
                  name: element.first_name,
                  surname: element.last_name
              }
            });
          });
          res.send(data);
        });
    })
    .catch(function(err){
      console.log(err);
    });
});

//delete class
router.delete('/:id', function(req, res, next) {
  knex('classes').delete().where({id: req.params.id}).then(function(response) {
    console.log('class deleted');
    res.json(response);
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
