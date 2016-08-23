'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('topics').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('topics').insert({
          id: 1,
          title: 'mixing beats'
        }),

        knex('topics').insert({
          id: 2,
          title: 'ultrarunning'
        }),

        knex('topics').insert({
          id: 3,
          title: 'western horseback riding'
        }),

        knex('topics').insert({
          id: 4,
          title: 'salsa dancing'
        }),

        knex('topics').insert({
          id: 5,
          title: 'blog writing'
        }),

        knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 6')
      ]);
    });
};
