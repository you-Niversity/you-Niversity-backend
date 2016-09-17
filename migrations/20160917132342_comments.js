'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments('id');
    table.integer('class_id');
    table.integer('commenter_id');
    table.text('comment');
    table.timestamp('creation_date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comments');
};
