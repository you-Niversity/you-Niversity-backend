'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('rosters', function(table){
    table.increments('id');
    table.integer('user_id');
    table.integer('class_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rosters');
};
