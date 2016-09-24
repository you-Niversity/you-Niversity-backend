'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table){
    table.increments('id');
    table.integer('thread_id');
    table.integer('sender_id');
    table.integer('recipient_id');
    table.text('message');
    table.timestamp('creation_date');
    table.boolean('read');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('messages');
};
