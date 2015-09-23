'use strict';

var rammService = angular.module('rammService', ['ngResource']);

rammService.factory('Bubble', function ($resource) {
    return $resource('spring/bubble/:id');
});

rammService.factory('Reference', function ($resource) {
	return $resource('spring/reference/:id');
});

rammService.factory('Note', function ($resource) {
	return $resource('spring/note/:id');
});

rammService.factory('Memory', function ($resource) {
	return $resource('spring/memory/:id', {}, {
		query: {
			method: 'POST',
			isArray: false,
			params: {
				screenX: '@screenX',
				screenY: '@screenY'
			},
		}
	});
});
