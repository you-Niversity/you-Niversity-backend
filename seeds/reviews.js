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
          teacher_id: 9,
          reviewer_id: 4,
          review: 'Great guy, great classes. Keep up the good work, Omar.',
          creation_date: new Date()
        }),

        knex('reviews').insert({
          id: 4,
          teacher_id: 9,
          reviewer_id: 5,
          review: 'I didn\'t really think that this guy lived up to all the hype. A lot of the advice was trite and unrealistic.',
          creation_date: new Date()
        }),

        knex.raw('ALTER SEQUENCE rosters_id_seq RESTART WITH 5')
      ]);
    });
};
