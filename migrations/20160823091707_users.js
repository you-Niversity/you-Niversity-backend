'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id');
    table.string('first_name');
    table.string('last_name');
    table.string('username');
    table.string('email');
    table.string('password');
    table.string('profile_pic');
    table.string('city');
    table.string('state');
    table.boolean('is_expert');
    table.boolean('is_admin');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
