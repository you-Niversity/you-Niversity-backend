'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('message_threads').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('message_threads').insert({
          id: 1,
          sender_id: 1,
          recipient_id: 9,
          class_id: 9,
          unread_messages: true
        }),

        knex('message_threads').insert({
          id: 2,
          sender_id: 5,
          recipient_id: 9,
          class_id: 9,
          unread_messages: true
        }),

        knex('message_threads').insert({
          id: 3,
          sender_id: 6,
          recipient_id: 9,
          class_id: 9,
          unread_messages: true
        }),

        knex('message_threads').insert({
          id: 4,
          sender_id: 10,
          recipient_id: 9,
          class_id: 9,
          unread_messages: true
        }),

        knex.raw('ALTER SEQUENCE rosters_id_seq RESTART WITH 5')


      ]);
    });
};
