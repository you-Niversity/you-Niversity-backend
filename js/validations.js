'use strict';

const knex = require('../db/knex');

module.exports = {

  userExistsInDB: (email) => {
    console.log("made it to user exists function");
    return knex.select('*').from('users').where({email: email});
  },

  validatePassword: (req, info) => {
    console.log('made it to validatepassword function');
    info.password = req.body.password;
    info.error.password = [];

    if(req.body.password.length <= 7) {
      info.passwordError = true;
      info.error.password.push({message: "Password should be 8 or more characters."});
    }
  }

};
