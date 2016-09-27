'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('reviews').insert({
          id: 1,
          teacher_id: 9,
          reviewer_id: 2,
          review: 'Great speaker with some creative ideas on how to lead an independent work life.',
          creation_date: new Date()
        }),

        knex('reviews').insert({
          id: 2,
          teacher_id: 9,
          reviewer_id: 3,
          review: 'Always enjoy Omar\'s classes.',
          creation_date: new Date()
        }),

        knex('reviews').insert({
          id: 3,
          teacher_id: 4,
          reviewer_id: 10,
          review: 'Love Rhonda. She is a great source of ultrarunning information.',
          creation_date: new Date()
        }),

        knex('reviews').insert({
          id: 4,
          teacher_id: 4,
          reviewer_id: 5,
          review: 'Rhonda is such a great coach and motivator! Take her classes at every opportunity.',
          creation_date: new Date()
        }),

        knex.raw('ALTER SEQUENCE reviews_id_seq RESTART WITH 5')
      ]);
    });
};
