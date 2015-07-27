'use strict';

angular.module('rammApp', ['bubbleService']).
        config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
            when('/simple/list', {templateUrl:'views/simple-list.html', controller:SimpleListController}).
            when('/simple/add', {templateUrl:'views/simple-form.html', controller:SimpleNewController}).
            when('/simple/:id', {templateUrl:'views/simple-detail.html', controller:SimpleDetailController}).
            otherwise({redirectTo:'/simple/list'});
}]);
