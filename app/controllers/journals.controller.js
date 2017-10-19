const responses = require('../models/responses');
const path = require('path');
const apiPrefix = '/api/journals';
const journalModel = require('../models/journal');
const journalsService = require('../services/journals.service')({
	modelService: journalModel
});

module.exports = journalsController;

function journalsController() {
	return {
		getAll: getAll,
		getOneById: getOneById,
		insert: insert,
		updateById: updateById,
		removeById: removeById
	};

	function getAll(req, res) {
		journalsService
			.getAll()
			.then(journals => {
				const responseModel = new responses.ItemsResponse();
				responseModel.items = journals;
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

		journalsService
			.getOne(queryCondition)
			.then(journal => {
				const responseModel = new responses.ItemResponse();
				responseModel.item = journal;
				res.json(responseModel);
			})
			.catch(err => {
				return res.status(500).send(new responses.ErrorResponse(err));
			});
	}

	function insert(req, res) {
		journalsService
			.insert(req.body)
			.then(journal => {
				const responseModel = new responses.ItemResponse();
				responseModel.item = journal;
				res
					.status(201)
					.location(path.join(apiPrefix, journal._id.toString()))
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
		journalsService
			.updateOne(queryCondition, req.body)
			.then(journal => {
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
		journalsService
			.removeOne(queryCondition)
			.then(journal => {
				const responseModel = new responses.ItemResponse();
				responseModel.item = journal;
				res.json(responseModel);
			})
			.catch(err => {
				return res.status(500).send(new responses.ErrorResponse(err));
			});
	}
}
