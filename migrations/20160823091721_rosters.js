'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('rosters', function(table){
    table.increments('id');
    table.string('user_id');
    table.string('class_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rosters');
};
