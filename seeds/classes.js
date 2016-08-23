'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      return Promise.all([

        knex('classes').insert({
          id: 1,
          title: 'Ultrarunning 101',
          topic_id: 2,
          date: '2016-09-25T01:00:00-07:00',
          city: 'Boulder',
          state: 'CO',
          zip_code: 80301,
          address: 'Chataqua Park',
          price: 10,
          description: 'Learn the fundamentals or training, fueling, and form in preparation for your first ultramarathon of any distance.',
          prerequisites: 'It is best if you have completed at least a marathon-distance run before beginning to trail for an ultramarathon.',
          duration: 2,
          total_seats: 8,
          seats_remaining: 8,
          user_id: 6,
          creation_date: new Date()
        }),

        knex('classes').insert({
          id: 2,
          title: 'Intro to Beat Mixing',
          topic_id: 1,
          date: '2016-09-15T01:00:00-07:00',
          city: 'Loveland',
          state: 'CO',
          zip_code: 80537,
          address: '972 Winona Circle',
          price: 10,
          description: 'Today we\'ll focus on learning about how beats are mixed, and the technology needed to do so.',
          prerequisites: 'None',
          duration: 2,
          total_seats: 4,
          seats_remaining: 3,
          user_id: 2,
          creation_date: new Date()
        }),

        knex('classes').insert({
          id: 3,
          title: 'Mountain Trail Ride',
          topic_id: 1,
          date: '2016-10-01T10:00:00-07:00',
          city: 'Guffey',
          state: 'CO',
          zip_code: 80820,
          address: '1213 Elk Mountain Ranch Road',
          price: 25,
          description: 'If you\'re hoping to gain comfort in riding your or any horse through the mountains, join me on this trail ride.',
          prerequisites: 'Basic riding experience. If you are in need of a horse, contact me directly and I can set you up with one of mine that matches your riding ability/experience.',
          duration: 5,
          total_seats: 4,
          seats_remaining: 2,
          user_id: 3,
          creation_date: new Date()
        }),

        knex('classes').insert({
          id: 4,
          title: 'Salsa Dance Lessons',
          topic_id: 4,
          date: '2016-10-05T10:00:00-07:00',
          city: 'Longmont',
          state: 'CO',
          zip_code: 80501,
          address: '310 Quail Rd',
          price: 5,
          description: 'Bring a partner and learn the fundamentals of salsa dancing!',
          prerequisites: 'No dance experience necessary, and all levels welcome!',
          duration: 1.5,
          total_seats: 10,
          seats_remaining: 8,
          user_id: 4,
          creation_date: new Date()
        }),

        knex('classes').insert({
          id: 5,
          title: 'How to Publish a Successful Blog',
          topic_id: 5,
          date: '2016-10-09T10:00:00-07:00',
          city: 'Fort Collins',
          state: 'CO',
          zip_code: 80501,
          address: '310 Quail Rd',
          price: 10,
          description: 'This workshop will cover the fundamentals of blog publishing, from choosing a platform, to choosing topics and preparing articles, to marketing for a specific audience. The final hour will be devoted to workshopping the first article.',
          prerequisites: 'Come with an idea of the topic,  purpose and intended audience for your blog, as well as a rough draft or brainstorm for the first post.',
          duration: 3,
          total_seats: 6,
          seats_remaining: 1,
          user_id: 5,
          creation_date: new Date()
        }),

        knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 6')

      ]);
    });
};
