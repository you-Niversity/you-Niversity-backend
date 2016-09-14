'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('classes', function(table){
    table.increments('id');
    table.string('title');
    table.text('image_url');
    table.string('date');
    table.decimal('lat', 9, 6);
    table.decimal('lng', 9, 6);
    table.string('address');
    table.string('city');
    table.string('state');
    table.integer('zip_code');
    table.integer('price');
    table.text('description');
    table.text('prerequisites');
    table.string('start_time');
    table.string('end_time');
    table.integer('total_seats');
    table.integer('seats_remaining');
    table.integer('user_id');
    table.timestamp('creation_date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('classes');
};
