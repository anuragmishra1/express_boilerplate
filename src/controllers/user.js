'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();
const Services = require('../services');

const login = async (req, res) => {
	let users = [];
	const criteria = {
		email: req.body.email,
		password: Buffer.from(req.body.password, 'base64')
	};

	const projection = {
		__v: 0,
		password: 0
	};

	try {
		users = await Services.user.find(criteria, projection, {});
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	if (users.length === 0) {
		return res.status(404).json({
			status: 'failure',
			message: 'Email or password is incorrect'
		});
	}

	let token = null;
	let userData = users[0];
	try {
		token = jwt.sign(
			{
				id: userData._id,
				role: userData.role,
				email: userData.email
			},
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: '24h'
			}
		);
	} catch (err) {
		return res.status(400).send({
			status: 'failure'
		});
	}

	res.status(200).send({
		status: 'success',
		token: token,
		data: userData
	});
};

const create = async (req, res) => {
	let userData = {};
	req.body.password = Buffer.from(req.body.password, 'base64');

	try {
		userData = await Services.user.create(req.body);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		id: userData._id
	});
};

const update = async (req, res) => {
	let userData = {};

	try {
		userData = await Services.user.findById(req.params.id);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	if (!userData) {
		return res.status(400).json({
			status: 'failure',
			message: 'User Id not exists'
		});
	}

	const criteria = {
		_id: req.params.id
	};

	try {
		userData = await Services.user.update(criteria, req.body, {});
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		message: 'Updated successfully'
	});
};

const getAll = async (req, res) => {
	let users = [];
	const options = {
		limit: req.query.limit || 0,
		skip: req.query.skip || 0
	};
	const projection = {
		__v: 0,
		password: 0
	};

	try {
		users = await Services.user.find({}, projection, options);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		data: users
	});
};

const getDetail = async (req, res) => {
	let userData = {};
	const projection = {
		__v: 0,
		password: 0
	};

	try {
		userData = await Services.user.findById(req.params.id, projection);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		data: userData
	});
};

const remove = async (req, res) => {
	const criteria = {
		_id: req.params.id
	};

	try {
		await Services.user.deleteOne(criteria);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		message: 'Deleted successfully'
	});
};

module.exports = {
	login,
	create,
	update,
	getAll,
	getDetail,
	remove
};
