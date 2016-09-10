'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('classes', function(table){
    table.increments('id');
    table.string('title');
    table.text('image_url');
    table.timestamp('date');
    table.string('city');
    table.string('state');
    table.integer('zip_code');
    table.string('address');
    table.integer('price');
    table.text('description');
    table.text('prerequisites');
    table.float('duration');
    table.integer('total_seats');
    table.integer('seats_remaining');
    table.integer('user_id');
    table.timestamp('creation_date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('classes');
};
