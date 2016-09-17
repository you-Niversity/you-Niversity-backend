'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rosters').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('rosters').insert({
          id: 1,
          user_id: 1,
          class_id: 1
        }),

        knex('rosters').insert({
          id: 2,
          user_id: 2,
          class_id: 1
        }),

        knex('rosters').insert({
          id: 3,
          user_id: 9,
          class_id: 2
        }),

        knex('rosters').insert({
          id: 4,
          user_id: 10,
          class_id: 2
        }),

        knex('rosters').insert({
          id: 5,
          user_id: 7,
          class_id: 3
        }),

        knex('rosters').insert({
          id: 6,
          user_id: 3,
          class_id: 4
        }),

        knex('rosters').insert({
          id: 7,
          user_id: 6,
          class_id: 4
        }),

        knex('rosters').insert({
          id: 8,
          user_id: 9,
          class_id: 4
        }),

        knex('rosters').insert({
          id: 9,
          user_id: 10,
          class_id: 4
        }),

        knex('rosters').insert({
          id: 10,
          user_id: 1,
          class_id: 5
        }),

        knex('rosters').insert({
          id: 11,
          user_id: 7,
          class_id: 5
        }),

        knex('rosters').insert({
          id: 12,
          user_id: 3,
          class_id: 5
        }),

        knex('rosters').insert({
          id: 13,
          user_id: 2,
          class_id: 9
        }),

        knex('rosters').insert({
          id: 14,
          user_id: 3,
          class_id: 9
        }),

        knex('rosters').insert({
          id: 15,
          user_id: 4,
          class_id: 9
        }),

        knex('rosters').insert({
          id: 16,
          user_id: 5,
          class_id: 9
        }),

        knex('rosters').insert({
          id: 17,
          user_id: 6,
          class_id: 9
        }),

        knex('rosters').insert({
          id: 18,
          user_id: 7,
          class_id: 9
        }),

        knex.raw('ALTER SEQUENCE rosters_id_seq RESTART WITH 19')


      ]);
    });
};
