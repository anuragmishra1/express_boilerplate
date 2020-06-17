'use strict';

const Joi = require('@hapi/joi');

const user = {
	login: Joi.object()
		.keys({
			email: Joi.string().email().required(),
			password: Joi.string().required()
		})
		.required(),

	createUser: Joi.object()
		.keys({
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			role: Joi.string()
				.valid('admin', 'operation', 'sales')
				.default('operation')
		})
		.required(),

	updateUser: Joi.object()
		.keys({
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			role: Joi.string()
				.valid('admin', 'operation', 'sales')
				.default('operation')
		})
		.required(),

	getUserId: Joi.object()
		.keys({
			id: Joi.string()
				.regex(/^[0-9a-fA-F]{24}$/)
				.message('Invalid id provided')
				.required()
		})
		.required()
};

module.exports = {
	user
};
