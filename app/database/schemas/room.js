'use strict';

var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	connections: {
		type: [
			{
				userId: String,
				socketId: String
			}
		]
	}
});

var roomModel = mongoose.model('room', RoomSchema);

module.exports = roomModel;