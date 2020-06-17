'use strict';

const { createLogger, format, transports } = require('winston');
require('dotenv').config();

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

const Logformat = format.combine(
	format.timestamp({
		format: 'YYYY-MM-DD HH:mm:ss'
	}),
	format.errors({ stack: true }),
	format.splat(),
	format.json()
);

const dateFormat = () => {
	return new Date(Date.now()).toUTCString();
};

const IsJsonObj = (str) => {
	if (typeof str === 'object') {
		return true;
	}
	return false;
};

const logLevel = (level) => {
	level = level.toUpperCase();
	if (level === 'ERROR') return `\x1b[31m${level}\x1b[0m`;
	if (level === 'HTTP') return `\x1b[35m${level}\x1b[0m`;
	if (level === 'DEBUG') return `\x1b[33m${level}\x1b[0m`;
	return `\x1b[32m${level}\x1b[0m`;
};

const wrapInColor = (msg, colorCode) => {
	return `\x1b[${colorCode}m${msg}\x1b[0m`;
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
		colorize: false,
		format: Logformat
	},
	httpLog: {
		level: 'http',
		filename: `${APP_ROOT}/logs/http.log`,
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
		format: Logformat
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true,
		format: format.printf((info) => {
			let message = `${dateFormat()} | ${logLevel(info.level)} | `;
			message = message + `${wrapInColor('app.log', 34)} | `;
			message = IsJsonObj(info.message)
				? message + `data: ${wrapInColor(JSON.stringify(info.message), 36)}`
				: message + `msg: ${wrapInColor(info.message, 36)}`;
			return message;
		})
	},
	http: {
		host: 'localhost', // Change this value with your api server host
		port: '3003', // Change this value with your api server port
		path: '/log', // Change this value with api path
		// auth: 'None',
		ssl: false // make it true if your server is configured with SSL
	}
};

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
	defaultMeta: {
		service: process.env.SERVICE_NAME
	},
	levels: levels,
	transports: [
		new transports.File(options.httpLog),
		new transports.File(options.file),
		new transports.Console(options.console)
		// new transports.Http(options.http)
	],
	exitOnError: false // do not exit on handled exceptions
});

module.exports = logger;
