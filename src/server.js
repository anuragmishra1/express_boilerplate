'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

global.APP_ROOT = path.resolve(__dirname, '../');

require('dotenv').config();
require('./db');
const { httpLog, logger } = require('./utils');
global.logger = logger;

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

const { MONGODB_URI, JWT_SECRET_KEY, SERVICE_NAME } = process.env;

if (!MONGODB_URI || !JWT_SECRET_KEY || !SERVICE_NAME) {
	console.error(
		'\x1b[31m%s\x1b[0m',
		'----- Required envs are not available -----'
	);
	process.exit(1);
}

app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(httpLog());

app.use('/', routes);

app.get('/', (req, res) => {
	res.json({
		message: 'App is up'
	});
});

app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

// Middleware error handler
app.use((error, req, res, next) => {
	res.status(error.status || 500).send({
		status: error.status || 500,
		message: error.message || 'Internal Server Error'
	});
	next();
});

app.listen(PORT, () => {
	console.log(
		'\x1b[32m%s\x1b[0m',
		`The server is listening on http://localhost:${PORT}`
	);
});
