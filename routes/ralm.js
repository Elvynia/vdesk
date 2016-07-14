var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs((process.env.MONGODB_URI || 'mongodb://ramm:ramm!@localhost/ramm'), ['memories']);

router.get('/memory', function(request, response, next) {
	db.memories.find(function(error, memories) {
		if (error) {
			response.send(error);
		} else {
			response.json(memories);
		}
	});
});

router.get('/memory/:id', function(request, response, next) {
	var id = request.params.id;
	console.log('Get with id:' + id);
	if (id) {
		db.memories.find({_id: mongojs.ObjectId(id)}, function(error, result) {
			if (error) {
				response.send(error);
			} else {
				response.json(result);
			}
		});
	} else {
		response.status(400);
		response.json({
			"error": "Wrong id in url parameter."
		});
	}
});

router.post('/memory', function(request, response, next) {
	var memory = request.body;
	if (memory.content) {
		db.memories.save(memory, function(error, result) {
			if (error) {
				response.send(error);
			} else {
				response.json(result);
			}
		});
	} else {
		response.status(400);
		response.json({
			"error": "Bad memory, missing content"
		});
	}
});

router.delete('/memory/:id', function(request, response, next) {
	var id = request.params.id;
	console.log('Delete with id:' + id);
	if (id) {
		db.memories.remove({_id: mongojs.ObjectId(id)}, function(error, result) {
			if (error) {
				response.send(error);
			} else {
				response.json(result);
			}
		});
	} else {
		response.status(400);
		response.json({
			"error": "Wrong id in url parameter."
		});
	}
});

module.exports = router;