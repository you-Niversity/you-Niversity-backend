'use strict';

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


//get all of one user's threads
router.get('/:id/', function(req, res, next) {
  return knex('message_threads')

    .join('users AS sender', {'message_threads.sender_id' : 'sender.id'})
    .join('users AS recipient', {'message_threads.recipient_id' : 'recipient.id'})
    .join('classes', {'message_threads.class_id' : 'classes.id'})
    // .join('messages', {'messages.thread_id' : 'message_threads.id'})

    .select("message_threads.id AS thread_id", "sender.id AS sender_id", "sender.first_name AS sender_first_name", "sender.last_name AS sender_last_name", "recipient.id AS recipient_id", 'recipient.first_name AS recipient_first_name',  'recipient.last_name AS recipient_last_name', 'sender.profile_pic AS sender_profile_pic', 'recipient.profile_pic AS recipient_profile_pic', 'title', 'unread_messages')

    .where({'message_threads.sender_id' : req.params.id})
    .orWhere({'message_threads.recipient_id' : req.params.id})

    // .orderBy('creation_date')

    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});


//get all of one thread's messages
router.get('/thread/:id', function(req, res, next) {
  return knex('message_threads')
    .join('messages', {'message_threads.id' : 'messages.thread_id'})
    .join('users AS sender', {'messages.sender_id' : 'sender.id'})
    .join('users AS recipient', {'messages.recipient_id' : 'recipient.id'})
    // .select('*', 'messages.id AS id', 'message_threads.id AS thread_id')
    .where({'message_threads.id' : req.params.id})
    .select('message_threads.id AS thread_id', 'message', 'creation_date', 'read', 'sender.id AS sender_id', 'sender.profile_pic AS sender_profile_pic', 'sender.first_name AS sender_first_name')
    .orderBy('creation_date', 'asc')

    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});


//create a message--id below will be sender id
router.post('/:id', function(req, res, next){
  var message = {
    thread_id: req.body.thread_id,
    sender_id: req.params.id,
    recipient_id: req.body.recipient_id,
    message: req.body.message,
    creation_date: new Date(),
    read: false
  }
  return knex('messages')
    .insert(message)
    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
      console.log(err);
    });
});

//update a message as read

//delete a message

router.delete('/:id', function(req, res, next) {
  knex('message_threads')
	.delete()
	.where({id: req.params.id})
	.then(function(response) {
    res.json(response);
  }).catch(function(err) {
    console.log(err);
  });
});


module.exports = router;
