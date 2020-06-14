'use strict';

const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkAuth = (req, res, next) => {
	let decoded;
	if (!req.headers['authorization']) {
		return res.status(401).send({
			status: 'failure',
			message: 'You are not authorized'
		});
	}

	let token = req.headers['authorization'].split(' ')[1];
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
	} catch (err) {
		return res.status(401).send({
			status: 'failure',
			message: err.message || 'Email or password is incorrect'
		});
	}

	req.userData = {
		id: decoded.id,
		role: decoded.role,
		email: decoded.email
	};
	next();
};

module.exports = {
	checkAuth
};
