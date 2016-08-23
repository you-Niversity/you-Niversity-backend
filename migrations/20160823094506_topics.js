'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', function(table){
    table.increments('id');
    table.string('title');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics');
};
