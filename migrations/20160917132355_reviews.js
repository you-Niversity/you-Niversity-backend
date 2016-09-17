'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table){
    table.increments('id');
    table.integer('teacher_id');
    table.integer('reviewer_id');
    table.text('review');
    table.timestamp('creation_date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('reviews');

};
