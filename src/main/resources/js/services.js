'use strict';

angular.module('bubbleService', ['ngResource']).
	factory('Bubble', function ($resource) {
	    return $resource('spring/bubble/:id');
	});

angular.module('referenceService', ['ngResource']).
	factory('Reference', function ($resource) {
		return $resource('spring/reference/:id');
	});
