'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const { sendElasticEmail } = require('../js/email.js');


//check if thread exists between two users
router.get('/threadcheck/:sender_id/:teacher_id', function(req, res){
  return knex('message_threads')

    .where({
      'message_threads.sender_id' : req.params.sender_id,
      'message_threads.recipient_id': req.params.teacher_id
    })

    .orWhere({
      'message_threads.recipient_id' : req.params.sender_id,
      'message_threads.sender_id': req.params.teacher_id
    })

    .then(function(data){
      var exists = data.length > 0;
      res.send({data, exists});
    })

    .catch(function(err){
  		res.status(500).json({err});
  	});
});

//get all of one user's threads
router.get('/:id', function(req, res) {
  return knex('message_threads')
    .join('users AS sender', {'message_threads.sender_id' : 'sender.id'})
    .join('users AS recipient', {'message_threads.recipient_id' : 'recipient.id'})
    .join('classes', {'message_threads.class_id' : 'classes.id'})
    .select("message_threads.id AS thread_id", "sender.id AS sender_id", "sender.first_name AS sender_first_name", "sender.last_name AS sender_last_name", "recipient.id AS recipient_id", 'recipient.first_name AS recipient_first_name',  'recipient.last_name AS recipient_last_name', 'sender.profile_pic AS sender_profile_pic', 'recipient.profile_pic AS recipient_profile_pic', 'title', 'unread_messages')

    .where({
      'message_threads.sender_id' : req.params.id
    })
    .orWhere({
      'message_threads.recipient_id' : req.params.id
    })

    .orderBy('updated_at', 'desc')

    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
  		res.status(500).json({err});
  	});
});


//get all of one thread's messages
router.get('/thread/:id', function(req, res) {
  return knex('message_threads')
    .join('messages', {'message_threads.id' : 'messages.thread_id'})
    .join('users AS sender', {'messages.sender_id' : 'sender.id'})
    .join('users AS recipient', {'messages.recipient_id' : 'recipient.id'})

    .where({
      'message_threads.id' : req.params.id
    })
    .select('message_threads.id AS thread_id', 'message', 'creation_date', 'read', 'sender.id AS sender_id', 'sender.profile_pic AS sender_profile_pic', 'sender.first_name AS sender_first_name')

    .orderBy('creation_date', 'asc')

    .then(function(data){
      res.send(data);
    })
    .catch(function(err){
  		res.status(500).json({err});
  	});
});

//update the thread as having no unread messages
router.put('/thread/:id', function(req, res){
  return knex ('message_threads')
    .where({
      'message_threads.id': req.params.id
    })
    .update('unread_messages', false)
    .then(function(){
      return knex ('messages')
        .where({
          'messages.thread_id': req.params.id
        })
        .update('read', true)
        .then(function(){
            res.sendStatus(200);
          })
          .catch(function(err){
            console.log(err);
          });
        })
    .catch(function(err){
      res.status(500).json({err});
    });
});


//check if user has unread messages for which they are the recipient
router.get('/unread/:id', function(req, res){
  return knex('messages')
    .where({
      'recipient_id': req.params.id
    })
    .andWhere({
      'read': false
    })
    .then(function(data){
      var unread_messages = data.length > 0;
      res.send({data, unread_messages});
    })
    .catch(function(err){
  		res.status(500).json({err});
  	});
});


//create a thread_id
router.post('/threads', function(req, res){

  const { sender_id, recipient_id, class_id } = req.body;

  var thread = {
    sender_id,
    recipient_id,
    class_id,
    unread_messages: true,
    updated_at: new Date()
  };
  return knex('message_threads')
    .insert(thread)
    .returning('id')
    .then(function(id){
      res.send(id);
    })
    .catch(function(err){
  		res.status(500).json({err});
  	});
});


//create a message--id below will be sender id
router.post('/:id', function(req, res){

  const { thread_id, recipient_id, message } = req.body;

  var newMessage = {
    thread_id,
    sender_id: req.params.id,
    recipient_id,
    message,
    creation_date: new Date(),
    read: false
  };

  return knex('messages')
    .insert(newMessage)
    .then(function(){
      return knex('message_threads')
      .where({'message_threads.id': thread_id})
      .update('updated_at', new Date())

      .then(function(){
        return knex('users')
          .where({'users.id': recipient_id})
          .select('email')

          .then(function(data){
            var recipient = data[0].email;
            sendElasticEmail(recipient, 'You have a new message!', 'MessageAlert');
            res.send(data);
          })
          .catch(function(err){
        		res.status(500).json({err});
        	});
      })
      .catch(function(err){
    		res.status(500).json({err});
    	});
    })
    .catch(function(err){
  		res.status(500).json({err});
  	});
});

//delete a thread
router.delete('/:id', function(req, res) {
  knex('message_threads')
	.delete()
	.where({id: req.params.id})
	.then(function(response) {
    res.json(response);
  })
  .catch(function(err){
		res.status(500).json({err});
	});
});

module.exports = router;
