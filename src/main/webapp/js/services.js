'use strict';

angular.module('bubbleService', ['ngResource']).
        factory('Bubble', function ($resource) {
            return $resource('spring/simple/:id', {}, {
                'save': {method:'PUT'}
            });
        });
