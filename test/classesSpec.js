'use strict';

process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');

var allClasses = null;

beforeEach((done) => {
  knex.migrate.latest().then(() => {
    knex.seed.run().then(() =>{
      knex('classes').then(classes => {
        allClasses = classes;
        done();
      });
    });
  });
});

afterEach((done) => {
  knex.migrate.rollback()
  .then(() => {
    done();
  });
});

xdescribe('GET /classes', () => {
  it('gets all classes', done => {
    request(app)
    .get('/classes')
    .expect('Content-Type', /json/)
    .end((err,res) => {
      expect(res.body.length).to.equal(allClasses.length);
      expect(res.status).to.equal(200);
      done();
    });
  });
});

xdescribe('GET /classes/:id', () => {
  it('gets a single class', done => {
    request(app)
    .get('/classes/11')
    .expect('Content-Type', /json/)
    .end((err,res) => {
      expect(res.body.title).to.equal("Intro to Javascript");
      expect(res.body.address).to.equal('242 Linden St');
      expect(res.body.price).to.equal(15);
      expect(res.status).to.equal(200);
      done();
    });
  });
});

xdescribe('POST /classes', () => {
  const newclass = {
    class: {
      title: 'This is the new test class',
      image_url: 'https://hd.unsplash.com/photo-1452830978618-d6feae7d0ffa',
      date: 'March 8th, 2017',
      unix_timestamp: 1488931200,
      lat: 40.56482200000001,
      lng: -105.12657000000002,
      address: '2618 Somerville Court',
      city: 'Fort Collins',
      state: 'CO',
      zip_code: 80501,
      price: 10,
      description: 'This workshop will cover the fundamentals of blog publishing, from choosing a platform, to choosing topics and preparing articles, to marketing for a specific audience. The final hour will be devoted to workshopping the first article.',
      prerequisites: 'Come with an idea of the topic,  purpose and intended audience for your blog, as well as a rough draft or brainstorm for the first post.',
      start_time: '7:00 a.m.',
      end_time: '8:30 a.m.',
      total_seats: 6,
      seats_remaining: 3,
      user_id: 5,
    }
  };

  const incorrectDataTypes = {
    class: {
      title: 7,
      image_url: 'https://hd.unsplash.com/photo-1452830978618-d6feae7d0ffa',
      date: 'March 8th, 2017',
      unix_timestamp: 1488931200,
      lat: 40.56482200000001,
      lng: -105.12657000000002,
      address: '2618 Somerville Court',
      city: 'Fort Collins',
      state: 'CO',
      zip_code: 80501,
      price: 10,
      description: true,
      prerequisites: false,
      end_time: '8:30 a.m.',
      total_seats: 6,
      seats_remaining: 3,
      user_id: 5,
    }
  };

  it('successfully creates a class', done => {
    request(app)
    .post('/classes')
    .type('form')
    .send(newclass.class)
    .end((err,res)=> {
      knex('classes').orderBy('id').then(classes => {
        expect(classes.length).to.equal(allClasses.length + 1);
        expect(classes[16].id).to.equal(17);
        expect(classes[16].title).to.equal('This is the new test class');
        expect(classes[16].user_id).to.equal(5);
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  it('returns a 400 if the data types added are incorrect', done => {
   request(app)
   .post('/classes')
   .type('form')
   .send(incorrectDataTypes.class)
   .end((err,res) =>{
      expect(res.status).to.equal(400);
      done();
  });
});
});


describe('PUT /classes/:id', () => {
  const updatedClass = {
    class: {
      title: 'How to Publish the Most Successful of Successful Blog',
      image_url: 'https://hd.unsplash.com/photo-1452830978618-d6feae7d0ffa',
      date: 'March 8th, 2017',
      unix_timestamp: 1488931200,
      lat: 40.56482200000001,
      lng: -105.12657000000002,
      address: '2618 Somerville Court',
      city: 'Fort Collins',
      state: 'CO',
      zip_code: 80501,
      price: 10,
      description: 'This workshop will cover the fundamentals of blog publishing, from choosing a platform, to choosing topics and preparing articles, to marketing for a specific audience. The final hour will be devoted to workshopping the first article.',
      prerequisites: 'Come with an idea of the topic,  purpose and intended audience for your blog, as well as a rough draft or brainstorm for the first post.',
      start_time: '7:00 a.m.',
      end_time: '8:30 a.m.',
      total_seats: 6,
      seats_remaining: 3,
      user_id: 5,
    }
  };
  // const incorrectDataTypes = {
  //
  // };

  it('updates a class successfuly', done => {
   request(app)
   .put('/classes/1')
   .type('form')
   .send(updatedClass)
   .end((err,res) =>{
     knex('classes').orderBy('id').then(classes => {
       expect(classes[0].title).to.equal('How to Publish the Most Successful of Successful Blog');
      //  expect(classes[0].WHAT).to.equal(WHAT);
      //  expect(classes[0].WHAT).to.equal(WHAT);
       expect(res.status).to.equal(200);
       done();
     });
  });
});

  xit('returns a 400 if the data types added are incorrect', done => {
   request(app)
   .put('/classes/3')
   .type('form')
   .send(incorrectDataTypes)
   .end((err,res) =>{
      expect(res.status).to.equal(400);
      done();
    });
  });

  xit('returns a 404 if the id can not be found', done => {
   request(app)
   .put('/classes/10')
   .type('form')
   .send(updatedClass)
   .end((err,res) =>{
      expect(err.statusCode).to.equal(404);
      done();
    });
  });
});

// describe('DELETE /classes/:id', () => {
//   it('deletes a class and its corresponding movies', done => {
//    request(app)
//    .delete('/classes/3')
//    .end((err,res)=> {
//     knex('classes').then(classes => {
//       expect(classes).to.have.lengthOf(allclasses.length-1);
//       expect(res.body[0].id).to.equal(3);
//     }).then(() => {
//       knex('movies').where('class_id', res.body[0].id).then(movies => {
//         expect(movies).to.have.lengthOf(0);
//         done();
//       });
//     })
//   });
//  })
//
//   it('returns a 404 if the id can not be found', done => {
//    request(app)
//    .delete('/classes/10')
//    .end((err,res) =>{
//     expect(err.statusCode).to.equal(404)
//     done();
//   })
//  })
// });
