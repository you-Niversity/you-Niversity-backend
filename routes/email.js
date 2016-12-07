'use strict';
var querystring = require('querystring');
var https = require('https');

module.exports = {

  sendElasticEmail: function(to, subject, template) {
  	// Make sure to add your username and api_key below.
  	var post_data = querystring.stringify({
  		'username' : 'kristenlfoster@gmail.com',
  		'api_key': process.env.ELASTIC_EMAIL,
  		'from': 'you.niversity.education@gmail.com',
  		'from_name' : 'youNiversity',
  		'to' : to,
  		'subject' : subject,
  		'template' : template
  	});

  	// Object of options.
  	var post_options = {
  		host: 'api.elasticemail.com',
  		path: '/mailer/send',
  		port: '443',
  		method: 'POST',
  		headers: {
  			'Content-Type': 'application/x-www-form-urlencoded',
  			'Content-Length': post_data.length
  		}
  	};

  	var result = null;
  	// Create the request object.

  	var post_req = https.request(post_options, function(res) {
  		res.setEncoding('utf8');
  		res.on('data', function (chunk) {
  			result = chunk;
  		});
  		res.on('error', function (e) {
  			result = 'Error: ' + e.message;
  		});
  	});

  	// Post to Elastic Email
  	post_req.write(post_data);
  	post_req.end();
  	return result;
  }
  
};
