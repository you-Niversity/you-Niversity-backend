'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      return Promise.all([

        knex('classes').insert({
          id: 1,
          title: 'Ultrarunning 101',
          image_url: 'https://hd.unsplash.com/photo-1456613820599-bfe244172af5',
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
          image_url: 'https://hd.unsplash.com/photo-1470225620780-dba8ba36b745',
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
          image_url: 'https://hd.unsplash.com/photo-1458838224802-28a9ca87e100',
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
          image_url: 'http://98441.cdx.c.ooyala.com/41Y3djczqSIyADi4gLvsSgIjSvTi3yW4/promo251658312',
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
          image_url: 'https://hd.unsplash.com/photo-1452830978618-d6feae7d0ffa',
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

        knex('classes').insert({
          id: 6,
          title: 'Yoga on the Ridge',
          image_url: 'https://hd.unsplash.com/photo-1447452001602-7090c7ab2db3',
          date: '2016-11-09T10:00:00-07:00',
          city: 'Fort Collins',
          state: 'CO',
          zip_code: 80526,
          address: 'Rotary Park',
          price: 6,
          description: 'Let\'s do yoga together! This class is for beginner to intermediate students, and will be a fast-paced cardio workout. If we\'re lucky, we\'ll be interrupted by the local deer.',
          prerequisites: 'No prior experience with yoga is necessary! Please remember to bring your own mat, some water, and probably a towel.',
          duration: 1,
          total_seats: 10,
          seats_remaining: 10,
          user_id: 4,
          creation_date: new Date()
        }),

        knex('classes').insert({
          id: 7,
          title: 'Parenting: The Good, the Bad, the Ugly',
          image_url: 'https://hd.unsplash.com/photo-1438962136829-452260720431',
          date: '2016-10-19T10:00:00-07:00',
          city: 'Greeley',
          state: 'CO',
          zip_code: 80634,
          address: '5401 W 20th St',
          price: 15,
          description: 'Are you thinking about becoming a parent, or have one on the way? Come have a candid discussion about the joys and miseries of parenthood, and walk away with plenty of tips and advice. Topics will include feeding, crying, changing diapers, and finding reliable babysitters.',
          prerequisites: null,
          duration: 4,
          total_seats: 10,
          seats_remaining: 10,
          user_id: 3,
          creation_date: new Date()
        }),

        knex('classes').insert({
          id: 8,
          title: 'Sharing Household Chores the Right Way',
          image_url: 'https://hd.unsplash.com/photo-1462475279937-40cb2b162a99',
          date: '2016-10-12T10:00:00-07:00',
          city: 'Berthoud',
          state: 'CO',
          zip_code: 80513,
          address: '236 Welch Ave',
          price: 10,
          description: 'One of the primary causes of relationship distress is the inequitable distribution of household chores. In this class, listen to and be guided by a certified marital and family counselor in developing healthy strategies for distributing duties and handling conflict related to household chores.',
          prerequisites: 'Bring your partner or roommate to this one! Progress is made only when both parties are on board to make changes. Reserving one seat assumes that two people will come for the class.',
          duration: 2,
          total_seats: 5,
          seats_remaining: 5,
          user_id: 2,
          creation_date: new Date()
        }),

        knex('classes').insert({
          id: 9,
          title: 'Living a Life of Self-Employment',
          image_url: 'https://hd.unsplash.com/photo-1458847462994-d6e8043299f6',
          date: '2016-10-23T10:00:00-07:00',
          city: 'Loveland',
          state: 'CO',
          zip_code: 80537,
          address: '623 Denver Ave',
          price: 10,
          description: 'If you\re tired of working for the man, come listen and learn how to make it on your own. Topics will include how to make your new employment dream a reality, how to quit your present job tactfully, and how to live frugally while you\re figuring it out.',
          prerequisites: 'Job dissatisfaction!',
          duration: 1.5,
          total_seats: 8,
          seats_remaining: 8,
          user_id: 9,
          creation_date: new Date()
        }),

        knex('classes').insert({
          id: 10,
          title: 'Critically Consuming News',
          image_url: 'https://hd.unsplash.com/photo-1444653614773-995cb1ef9efa',
          date: '2016-10-26T10:00:00-07:00',
          city: 'Fort Collins',
          state: 'CO',
          zip_code: 80524,
          address: '120 W Laurel St',
          price: 15,
          description: 'With the proliferation of citizen reporting and easy access to information, it has never seemed more important to critically evaluate our sources of information. Take part in this workshop that explains the ideas of purpose, context, and stakeholders, and how these combine to create carefully crafted messages for the public.',
          prerequisites: 'Come with two things printed: An article that you believe has some bias, as well as four or five reader comments written in response to that article. We will analyze these together.',
          duration: 3,
          total_seats: 10,
          seats_remaining: 10,
          user_id: 4,
          creation_date: new Date()
        }),

        knex.raw('ALTER SEQUENCE classes_id_seq RESTART WITH 11')

      ]);
    });
};
