'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('messages').insert({
          id: 1,
          thread_id: 1,
          sender_id: 2,
          recipient_id: 4,
          message: 'Really excited for this class, Rhonda! Can you suggest some good trail shoes?',
          creation_date: new Date(),
          read: true
        }),

        knex('messages').insert({
          id: 2,
          thread_id: 1,
          sender_id: 4,
          recipient_id: 2,
          message: 'Glad that you are excited! I recommend Mizuno Wave Kayate. Good teeth, and they last relatively longer than other brands.',
          creation_date: new Date(),
          read: true
        }),

        knex('messages').insert({
          id: 3,
          thread_id: 2,
          sender_id: 5,
          recipient_id: 4,
          message: 'Rhonda, is it okay if I skip the run?',
          creation_date: new Date(),
          read: true
        }),

        knex('messages').insert({
          id: 4,
          thread_id: 3,
          sender_id: 6,
          recipient_id: 9,
          message: 'Super excited for this class! Should I quit my job now, or after?',
          creation_date: new Date(),
          read: false
        }),

        knex('messages').insert({
          id: 5,
          thread_id: 4,
          sender_id: 2,
          recipient_id: 9,
          message: 'Really excited for this class! Is it okay if I show up a few minutes late? I am coming from work.',
          creation_date: new Date(),
          read: true
        }),

        knex('messages').insert({
          id: 6,
          thread_id: 4,
          sender_id: 9,
          recipient_id: 2,
          message: 'That is no problem at all!',
          creation_date: new Date(),
          read: true
        }),

        knex.raw('ALTER SEQUENCE messages_id_seq RESTART WITH 7')

      ]);
    });
};
