'use strict';

const express = require('express');
const router = express.Router();

const knex = require('../db/knex');
const { sendElasticEmail } = require('./email.js');

router.get('/', (req, res, next) => {
  knex('classes')
		// .where('unix_timestamp', '>', Number((Date.now()).toString().slice(0,10)))
		.orderBy('unix_timestamp', 'asc')
    .then((data) => {
      res.send(data);
    })
		.catch((err) => {
			res.status(500).json({err:err});
		});
});

//get class
router.get('/:id', (req, res, next) => {

  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('classes')
    .join('users', {'users.id' : 'classes.user_id'})
    .select('*', 'classes.id AS id', 'users.id AS user_id', 'classes.city AS city')
    .where({'classes.id' : id})
  //following is going to require changes on front end
    .first()
    .then((data) => {
      if (!data) {
        console.log("we ain't got no data!");
        res.status(404).json({err:err});
      }

      res.send(data);
    })
		.catch((err) => {
			res.status(500).json({err:err});
		});
});

//update class
router.put('/:id/signup', (req, res, next) => {
  knex('classes')
    .where({'classes.id': req.params.id})
    .update('seats_remaining', req.body.seats_remaining)
    .then((data) => {
      res.sendStatus(200);
    })
  	.catch((err) => {
  		res.status(500).json({err:err});
  	});
});

//get class comments
router.get('/:id/comments', (req, res, next) => {
  knex('comments')
    .join('classes', {'classes.id' : 'comments.class_id'})
    .join('users', {'users.id': 'comments.commenter_id'})
    .select('comments.id AS id', 'comments.creation_date AS date', 'commenter_id', 'comment', 'first_name', 'last_name', 'profile_pic')
    .where({'classes.id' : req.params.id})
    .then((data) => {
      res.send(data);
    })
		.catch((err) => {
			res.status(500).json({err:err});
		});
});

router.post('/:id/comments', (req, res, next) => {
  const comment = {
    class_id: req.params.id,
    commenter_id: req.body.commenter_id,
    comment: req.body.comment,
    creation_date: new Date()
  };
  knex('comments')
    .insert(comment)
    .then((data) => {
      res.send(data);
    })
		.catch((err) => {
			res.status(500).json({err:err});
		});
});

//add class
router.post('/', (req, res, next) => {

  const newClass = {
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
  knex('classes')
    .insert(newClass)
		.returning('id')
    .then((id) => {
      res.send(id);
    })
		.catch((err) => {
			res.status(500).json({err:err});
		});
});

//edit class
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const courseTitle = req.body.title;
  knex('classes')
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
    .then(() => {
      return knex('rosters')
        .join('users', {'users.id': 'rosters.user_id'})
        .select('users.id AS id', 'first_name', 'last_name', 'email')
        .where({'class_id': id})
        .then((data) => {
          const roster = data;
          roster.forEach((element) => {
						const subject = "The course " + courseTitle + " has been updated";
						sendElasticEmail(element.email, subject, "classupdated");
          });
          res.send(data);
        });
    })
		.catch((err) => {
			res.status(500).json({err:err});
		});
});

router.delete('/:id', (req, res, next) => {
  knex('classes')
  	.delete()
  	.where({id: req.params.id})
  	.returning('title')
  	.then((title) => {
  		//TODO: join tables to get class title and students
  		//for each student, send email
  		//const subject = "The course " + title + " has been cancelled by the instructor";
  		//sendElasticEmail(element.email, subject, 'classdeleted');
      res.json(title);
    })
	.catch((err) => {
		res.status(500).json({err:err});
	});
});

module.exports = router;
