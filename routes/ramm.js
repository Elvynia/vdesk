var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs((process.env.MONGODB_URI || 'mongodb://ramm:ramm@localhost/ramm'), ['memories', 'tags']);

// Memory collection.

router.get('/memory', function(request, response, next) {
	db.memories.find(function(error, memories) {
		if (error) {
			response.send(error);
		} else {
			// for (var i = memories.length - 1; i >= 0; i--) {
			// 	var memory = memories[i];
			// 	for (var j = memories[i].tags.length - 1; j >= 0; j--) {
			// 		var id = memory.tags[j]["$id"];
			// 		console.log('mem tag from : ' + JSON.stringify(memory.tags[j]));
			// 		console.log('mem tag id : ' + id);
			// 		console.log('mem tag id : ' + memory.tags[j].hasOwnProperty("\"$id\""));
			// 		memory.tags[j] = {};
			// 		memory.tags[j]._id = id;
			// 		console.log('mem tag update : ' + JSON.stringify(memory.tags[j]));
			// 	}
			// }
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
	if (memory.tags) {
		for (var i = memory.tags.length - 1; i >= 0; i--) {
			memory.tags[i] = mongojs.DBRef("tags", mongojs.ObjectId(memory.tags[i]._id));
		}
	}
	console.log('Added new memory :' + JSON.stringify(memory));
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
	console.log('Delete memory with id:' + id);
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

// Tag collection.

router.get('/tag', function(request, response, next) {
	db.tags.find(function(error, memories) {
		if (error) {
			response.send(error);
		} else {
			response.json(memories);
		}
	});
});

router.post('/tag', function(request, response, next) {
	var tag = request.body;
	console.log('Added new tag :' + JSON.stringify(tag));
	if (tag.name) {
		db.tags.save(tag, function(error, result) {
			if (error) {
				response.send(error);
			} else {
				response.json(result);
			}
		});
	} else {
		response.status(400);
		response.json({
			"error": "Bad tag, missing name"
		});
	}
});

router.put('/tag', function(request, response, next) {
	var tag = request.body;
	console.log('Modified tag :' + JSON.stringify(tag));
	if (tag._id) {
		tag._id =  mongojs.ObjectId(tag._id);
		db.tags.save(tag, function(error, result) {
			if (error) {
				response.send(error);
			} else {
				response.json(result);
			}
		});
	} else {
		response.status(400);
		response.json({
			"error": "Bad tag, missing id to update existing tag"
		});
	}
});

router.delete('/tag/:id', function(request, response, next) {
	var id = request.params.id;
	console.log('Delete tag with id:' + id);
	if (id) {
		db.tags.remove({_id: mongojs.ObjectId(id)}, function(error, result) {
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