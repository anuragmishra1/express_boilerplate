'use strict';

const { createLogger, format, transports } = require('winston');

// define custom levels
const levels = {
	http: 0,
	error: 1,
	warn: 2,
	info: 3,
	verbose: 4,
	debug: 5,
	silly: 6
};

// define the custom settings for each transport (file, console)
const options = {
	file: {
		level: 'debug',
		filename: `${APP_ROOT}/logs/app.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false
	},
	httpLog: {
		level: 'http',
		filename: `${APP_ROOT}/logs/http.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true
	},
	http: {
		host: 'localhost',
		port: '3003',
		path: '/log'
	}
};

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
	defaultMeta: { service: 'express-boilerplate' },
	levels: levels,
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	transports: [
		new transports.File(options.httpLog),
		new transports.File(options.file),
		new transports.Console(options.console),
		// new transports.Http(options.http)
	],
	exitOnError: false, // do not exit on handled exceptions
});

// // create a stream object with a 'write' function that will be used by `morgan`
// logger.stream = {
// 	write: function (message, encoding) {
// 		// use the 'info' log level so the output will be picked up by both transports (file and console)
// 		logger.info(message);
// 	},
// };

module.exports = logger;
