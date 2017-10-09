'use strict';

var config = require('../config');
var mongoose = require('mongoose');
var logger = require('../logger');

var dbURI = 'mongodb://' + encodeURIComponent(config.db.username) + ':' + encodeURIComponent(config.db.password) + '@' + config.db.host + ':' + config.db.port + '/' + config.db.name;

mongoose.connect(dbURI);

mongoose.connection.on('error', function(error) {
	if (error) {
		throw error;
	}
});

mongoose.Promise = global.Promise;

module.exports = {
	mongoose,
	models: {
		user: require('./schemas/user.js'),
		room: require('./schemas/room.js')
	}
};