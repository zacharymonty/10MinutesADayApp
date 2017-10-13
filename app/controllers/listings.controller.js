const responses = require('../models/responses');
const path = require('path');
const apiPrefix = '/api/listings';
const listingModel = require('../models/listing');
const listingsService = require('../services/listings.service')({
	modelService: listingModel
});

module.exports = listingsController;

function listingsController() {
	return {
		getAll: getAll,
		getOneById: getOneById,
		insert: insert,
		updateById: updateById,
		removeById: removeById
	};

	function getAll(req, res) {
		listingsService
			.getAll()
			.then(listings => {
				const responseModel = new responses.ItemsResponse();
				responseModel.items = listings;
				res.json(responseModel);
			})
			.catch(err => {
				res.status(500).send(new responses.ErrorResponse(err));
			});
	}

	function getOneById(req, res) {
		let queryCondition = {
			_id: req.params.id
		};

		listingsService
			.getOne(queryCondition)
			.then(listing => {
				const responseModel = new responses.ItemResponse();
				responseModel.item = listing;
				res.json(responseModel);
			})
			.catch(err => {
				return res.status(500).send(new responses.ErrorResponse(err));
			});
	}

	function insert(req, res) {
		listingsService
			.insert(req.body)
			.then(listing => {
				const responseModel = new responses.ItemResponse();
				responseModel.item = listing;
				res
					.status(201)
					.location(path.join(apiPrefix, listing._id.toString()))
					.json(responseModel);
			})
			.catch(err => {
				return res.status(500).send(new responses.ErrorResponse(err));
			});
	}

	function updateById(req, res) {
		let queryCondition = {
			_id: req.params.id
		};
		listingsService
			.updateOne(queryCondition, req.body)
			.then(listing => {
				const responseModel = new responses.ItemResponse();
				res.status(204).json(responseModel);
			})
			.catch(err => {
				return res.status(500).send(new responses.ErrorResponse(err.stack));
			});
	}

	function removeById(req, res) {
		let queryCondition = {
			_id: req.params.id
		};
		listingsService
			.removeOne(queryCondition)
			.then(listing => {
				const responseModel = new responses.ItemResponse();
				responseModel.item = listing;
				res.json(responseModel);
			})
			.catch(err => {
				return res.status(500).send(new responses.ErrorResponse(err));
			});
	}
}
