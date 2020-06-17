'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		first_name: { type: String, required: true },
		last_name: { type: String, required: true },
		email: { type: String, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ['admin', 'operation', 'sales'],
			default: 'operation'
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('user', userSchema);
