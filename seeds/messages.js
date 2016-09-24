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
          sender_id: 9,
          recipient_id: 1,
          message: 'Can\'t wait for this class, bro! Are there any materials you suggest that I bring? Brisket frankfurter corned beef strip steak boudin salami. Leberkas alcatra short ribs porchetta frankfurter.',
          creation_date: new Date(),
          read: true
        }),

        knex('messages').insert({
          id: 2,
          thread_id: 1,
          sender_id: 1,
          recipient_id: 9,
          message: 'I know, man. Going to be super awesome. Just bring yourself and something to take notes with!',
          creation_date: new Date(),
          read: false
        }),

        knex('messages').insert({
          id: 3,
          thread_id: 2,
          sender_id: 5,
          recipient_id: 9,
          message: 'Bacon ipsum dolor amet meatloaf flank doner capicola porchetta tenderloin, jerky pork loin. Beef ribs picanha ball tip, pork pork loin drumstick andouille ham hock biltong turducken. ',
          creation_date: new Date(),
          read: true
        }),

        knex('messages').insert({
          id: 4,
          thread_id: 2,
          sender_id: 9,
          recipient_id: 5,
          message: 'Brisket frankfurter corned beef strip steak boudin salami. Leberkas alcatra short ribs porchetta frankfurter. Bacon ipsum dolor amet meatloaf flank doner capicola porchetta tenderloin, jerky pork loin. Beef ribs picanha ball tip, pork pork loin drumstick andouille ham hock biltong turducken. ',
          creation_date: new Date(),
          read: false
        }),

        knex('messages').insert({
          id: 5,
          thread_id: 2,
          sender_id: 5,
          recipient_id: 9,
          message: 'Bacon ipsum dolor amet meatloaf flank doner capicola porchetta tenderloin, jerky pork loin. Beef ribs picanha ball tip, pork pork loin drumstick andouille ham hock biltong turducken. ',
          creation_date: new Date(),
          read: false
        }),

        knex('messages').insert({
          id: 6,
          thread_id: 3,
          sender_id: 6,
          recipient_id: 9,
          message: 'Bacon ipsum dolor amet meatloaf flank doner capicola porchetta tenderloin, jerky pork loin. Beef ribs picanha ball tip, pork pork loin drumstick andouille ham hock biltong turducken. ',
          creation_date: new Date(),
          read: false
        }),

        knex('messages').insert({
          id: 7,
          thread_id: 4,
          sender_id: 10,
          recipient_id: 9,
          message: 'Bacon ipsum dolor amet meatloaf flank doner capicola porchetta tenderloin, jerky pork loin. Beef ribs picanha ball tip, pork pork loin drumstick andouille ham hock biltong turducken. ',
          creation_date: new Date(),
          read: false
        }),

        knex.raw('ALTER SEQUENCE messages_id_seq RESTART WITH 8')

      ]);
    });
};
