'use strict';

const express = require('express');
const router = express.Router();
const boom = require('boom');

const knex = require('../db/knex');
const { sendElasticEmail } = require('../js/email.js');

router.get('/', (req, res) => {
  knex('classes')
		// .where('unix_timestamp', '>', Number((Date.now()).toString().slice(0,10)))
		.orderBy('unix_timestamp', 'asc')
    .then((data) => {
      res.send(data);
    })
		.catch((err) => {
			res.status(500).json({err});
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
    .first()
    .then((data) => {
      if (!data) {
        res.status(404).json({ err: "class doesn't exist" });
      }

      res.send(data);
    })
		.catch((err) => {
			res.status(500).json({ err: err });
		});
});


//get class comments
router.get('/:id/comments', (req, res) => {
  knex('comments')
    .join('classes', {'classes.id' : 'comments.class_id'})
    .join('users', {'users.id': 'comments.commenter_id'})
    .select('comments.id AS id', 'comments.creation_date AS date', 'commenter_id', 'comment', 'first_name', 'last_name', 'profile_pic')
    .where({'classes.id' : req.params.id})
    .then((data) => {
      res.send(data);
    })
		.catch((err) => {
			res.status(500).json({err});
		});
});

router.post('/:id/comments', (req, res) => {

  const { commenter_id, comment } = req.body;

  const newComment = {
    class_id: req.params.id,
    commenter_id,
    comment,
    creation_date: new Date()
  };
  knex('comments')
    .insert(newComment)
    .then((data) => {
      res.send(data);
    })
		.catch((err) => {
			res.status(500).json({err});
		});
});

//add class
router.post('/', (req, res, next) => {

  const { title, image_url, date, unix_timestamp, lat, lng, address, city, state, zip_code, price, description, prerequisites, start_time, end_time, total_seats, seats_remaining, user_id} = req.body;

  console.log(!isNaN(title));

  //more concise way to do this?
  if (!isNaN(title) || !isNaN(image_url) || !isNaN(date) || !isNaN(city) || !isNaN(state) || !isNaN(description) || !isNaN(prerequisites)) {
    return res.status(400).send('Bad Data');
  }

  const newClass = {
    title,
    image_url,
    date,
		unix_timestamp,
    lat,
    lng,
    address,
    city,
    state,
    zip_code,
    price,
    description,
    prerequisites,
    start_time,
    end_time,
    total_seats,
    seats_remaining,
    user_id,
    creation_date: new Date()
  };

  knex('classes')
    .insert(newClass)
		.returning('id')
    .then((id) => {
      res.send(id);
    }).catch(err => {
      res.status(406).send({err:err});
		});
});



//edit class
router.put('/:id', (req, res) => {

  const id = req.params.id;

  const { title, image_url, date, unix_timestamp, lat, lng, address, city, state, zip_code, price, description, prerequisites, start_time, end_time, total_seats, seats_remaining, user_id} = req.body;

  knex('classes')
    .where({'classes.id': req.params.id})
    .update({
      title,
      image_url,
      date,
  		unix_timestamp,
      lat,
      lng,
      address,
      city,
      state,
      zip_code,
      price,
      description,
      prerequisites,
      start_time,
      end_time,
      total_seats,
      seats_remaining,
      user_id
    })
    .then(() => {
      return knex('rosters')
        .join('users', {'users.id': 'rosters.user_id'})
        .select('users.id AS id', 'first_name', 'last_name', 'email')
        .where({'class_id': id})
        .then((data) => {
          const roster = data;
          roster.forEach((element) => {
						const subject = "The course " + title + " has been updated";
						sendElasticEmail(element.email, subject, "classupdated");
          });
          res.send(roster);
        });
    })
		.catch((err) => {
			res.status(500).json({err});
		});
});

router.delete('/:id', (req, res) => {
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
		res.status(500).json({err});
	});
});

module.exports = router;
