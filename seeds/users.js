'use strict';

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([

        knex('users').insert({
          id: 1,
          first_name: 'Kristen',
          last_name: 'Foster-Marks',
          email: 'kristenlfoster@gmail.com',
          password: '$2a$10$wPP4UswIwvT/wmlRh0CUv.xzYmoqISLAM7jAjteZ873Ku9laaxcZm',
          profile_pic: 'http://placehold.it/225x225',
          city: 'Loveland',
          state: 'CO',
          is_expert: true,
          is_admin: true
        }),

        knex('users').insert({
          id: 2,
          first_name: 'Aaron',
          last_name: 'Marks',
          email: 'aaron@gmail.com',
          password: '1234',
          profile_pic: 'http://placehold.it/225x225',
          city: 'Loveland',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 3,
          first_name: 'Jennie',
          last_name: 'Zinko',
          email: 'jzinko@gmail.com',
          password: '1234',
          profile_pic: 'http://placehold.it/225x225',
          city: 'Guffey',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 4,
          first_name: 'Hannah',
          last_name: 'Caballero',
          email: 'hannah@gmail.com',
          password: '1234',
          profile_pic: 'http://placehold.it/225x225',
          city: 'Longmont',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 5,
          first_name: 'Lydia',
          last_name: 'Page',
          email: 'lydia@gmail.com',
          password: '1234',
          profile_pic: 'http://placehold.it/225x225',
          city: 'Fort Collins',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 6,
          first_name: 'Dakota',
          last_name: 'Jones',
          email: 'dakota@gmail.com',
          password: '1234',
          profile_pic: 'http://placehold.it/225x225',
          city: 'Boulder',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 7,
          first_name: 'Jeffrey',
          last_name: 'Markowitz',
          email: 'jeffrey@gmail.com',
          password: '1234',
          profile_pic: 'http://placehold.it/225x225',
          city: 'Greeley',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 8,
          first_name: 'Frank',
          last_name: 'Sobotka',
          email: 'fsobotka@gmail.com',
          password: '1234',
          profile_pic: 'http://placehold.it/225x225',
          city: 'Denver',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 9,
          first_name: 'Omar',
          last_name: 'Little',
          email: 'omar@gmail.com',
          password: '1234',
          profile_pic: 'http://placehold.it/225x225',
          city: 'Denver',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 10,
          first_name: 'Bubbles',
          last_name: 'Cousins',
          email: 'bubs@gmail.com',
          password: '1234',
          profile_pic: 'http://placehold.it/225x225',
          city: 'Denver',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 11')

      ]);
    });
};
