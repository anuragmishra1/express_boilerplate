'use strict';

const body = (schema) => {
	return validate(schema, 'body');
};

const headers = (schema) => {
	return validate(schema, 'headers');
};

const params = (schema) => {
	return validate(schema, 'params');
};

const validate = (schema, where) => {
	return (req, res, next) => {
		const { error } = schema.validate(req[where.toString()]);
		const valid = error === undefined;

		if (valid) {
			next();
		} else {
			const { details } = error;
			const message = details.map((i) => i.message).join(',');

			res.status(422).json({ error: message });
		}
	};
};

module.exports = {
	body,
	headers,
	params
};
