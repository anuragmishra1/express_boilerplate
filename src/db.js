'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
};

// Create the database connection
mongoose.connect(process.env.MONGODB_URI, options, (err) => {
	if (err) {
		console.err(`DB Error: ${err}`);
		process.exit(1);
	} else {
		console.log('MongoDB Connected');
	}
});

// When connection successfully established
mongoose.connection.on('connected', function () {
	console.log(`Mongoose default connection open to ${process.env.MONGODB_URI}`);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
	console.error(`Mongoose default connection error: ${err}`);
	process.exit(1);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose default connection disconnected');
	process.exit(1);
});
