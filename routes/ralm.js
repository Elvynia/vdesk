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

router.post('/memory', function(request, response, next) {
	console.log('Server request body : ', request.body);
	var memory = request.body;
	if (memory.title && memory.content) {
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
			"error": "Bad memory, missing title or content"
		});
	}
});

module.exports = router;