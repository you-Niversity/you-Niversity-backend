'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('message_threads', function(table){
    table.increments('id');
    table.integer('sender_id');
    table.integer('recipient_id');
    table.integer('class_id');
    table.boolean('unread_messages');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('message_threads');
};
