'use strict';

const Models = require('../models');

module.exports = (model) => {
	const module = {};

	module.create = async (objToSave) => {
		const data = await new Models[model.toString()](objToSave).save();
		return data.toObject();
	};

	module.findById = async (id, projection = {}, options = {}) => {
		return await Models[model.toString()].findById(id, projection, options);
	};

	module.find = async (criteria = {}, projection = {}, options = {}) => {
		options.lean = true;
		return await Models[model.toString()].find(criteria, projection, options);
	};

	module.findOne = async (criteria = {}, projection = {}, options = {}) => {
		options.lean = true;
		return await Models[model.toString()].findOne(
			criteria,
			projection,
			options
		);
	};

	module.update = async (criteria, dataToSet, options = {}) => {
		options.lean = true;
		options.new = true;
		return await Models[model.toString()].findOneAndUpdate(
			criteria,
			dataToSet,
			options
		);
	};

	module.deleteOne = async (criteria) => {
		return await Models[model.toString()].deleteOne(criteria);
	};

	module.count = async (criteria = {}) => {
		return await Models[model.toString()].countDocuments(criteria);
	};

	return module;
};
