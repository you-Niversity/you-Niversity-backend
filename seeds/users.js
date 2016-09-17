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
          first_name: 'Stringer',
          last_name: 'Bell',
          email: 'stringer@gmail.com',
          password: '1234',
          profile_pic: 'http://www.eonline.com/eol_images/Entire_Site/201509/rs_560x415-150109102354-560.Idris-Elba-The-Wire.jl.010915.jpg',
          city: 'Loveland',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 3,
          first_name: 'Snoop',
          last_name: 'Pearson',
          email: 'snoop@gmail.com',
          password: '1234',
          profile_pic: 'https://upload.wikimedia.org/wikipedia/en/e/ee/The_Wire_Snoop.jpg',
          city: 'Guffey',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 4,
          first_name: 'Rhonda',
          last_name: 'Pearlman',
          email: 'rp@gmail.com',
          password: '1234',
          profile_pic: 'http://i.lv3.hbo.com/assets/images/series/the-wire/episodes/4/50/final-grades-05-1024.jpg',
          city: 'Longmont',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 5,
          first_name: 'Kima',
          last_name: 'Greggs',
          email: 'kima@gmail.com',
          password: '1234',
          profile_pic: 'http://www.ballermindframe.com/pop-culture-spin/wp-content/uploads/sites/7/2015/12/kimagreggs.jpg',
          city: 'Fort Collins',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 6,
          first_name: 'Beadie',
          last_name: 'Russell',
          email: 'b@gmail.com',
          password: '1234',
          profile_pic: 'http://placehold.it/225x225',
          city: 'Boulder',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex('users').insert({
          id: 7,
          first_name: 'Jimmy',
          last_name: 'McNulty',
          email: 'j@gmail.com',
          password: '1234',
          profile_pic: 'http://i.onionstatic.com/avclub/5105/62/16x9/960.jpg',
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
          profile_pic: 'http://i.lv3.hbo.com/assets/images/series/the-wire/character/the-port/frank-sobotka-512x512.jpg',
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
          profile_pic: 'http://static.guim.co.uk/sys-images/Arts/Arts_/Pictures/2009/3/18/1237375559629/The-Wires-Omar-Little-pla-001.jpg',
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
          profile_pic: 'http://i.lv3.hbo.com/assets/images/series/the-wire/character/the-street/bubbles-300.jpg',
          city: 'Denver',
          state: 'CO',
          is_expert: true,
          is_admin: false
        }),

        knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 11')

      ]);
    });
};
