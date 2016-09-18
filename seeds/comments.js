'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({
          id: 1,
          class_id: 1,
          commenter_id: 2,
          comment: 'I\'ve always wanted to get into ultrarunning, and have heard that Beadie is a patient and amazing coach. Excited to meet the rest of the class!',
          creation_date: new Date()
        }),

        knex('comments').insert({
          id: 2,
          class_id: 1,
          commenter_id: 3,
          comment: 'Does anybody have any suggestions for what kind of shoes I should wear?',
          creation_date: new Date()
        }),

        knex('comments').insert({
          id: 3,
          class_id: 1,
          commenter_id: 6,
          comment: 'Snoop, I would suggest wearing trail shoes with good tread, as we will be running down some knarly hills in possibly buddy conditions.',
          creation_date: new Date()
        }),

        knex('comments').insert({
          id: 4,
          class_id: 9,
          commenter_id: 8,
          comment: 'Have heard great things about Omar and his self-made life...can\'t wait to be inspired to work for myself!',
          creation_date: new Date()
        }),

        knex('comments').insert({
          id: 5,
          class_id: 9,
          commenter_id: 7,
          comment: 'I\'ve been to one of Omar\'s talks before, and he is truly inspiring.',
          creation_date: new Date()
        }),

        knex('comments').insert({
          id: 6,
          class_id: 9,
          commenter_id: 5,
          comment: 'Anybody available to carpool from Fort Collins?',
          creation_date: new Date()
        }),

        knex('comments').insert({
          id: 7,
          class_id: 9,
          commenter_id: 10,
          comment: 'Kima, I can give you a ride from Fort Collins.',
          creation_date: new Date()
        }),

        knex.raw('ALTER SEQUENCE comments_id_seq RESTART WITH 8')

      ]);
    });
};
