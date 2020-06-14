'use strict';

const { logger } = require('../config');

const log = () => {
	return (req, res, next) => {
		const { rawHeaders, httpVersion, method, socket, url } = req;
		const { remoteAddress, remoteFamily } = socket;

		logger.http({
			rawHeaders,
			httpVersion,
			method,
			remoteAddress,
			remoteFamily,
			url
		});
		next();
	}
};

module.exports = log;
