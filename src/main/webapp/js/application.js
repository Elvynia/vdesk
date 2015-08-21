'use strict';

var app = angular.module('rammApp', ['rammController', 'focus-if', 'ngRoute', 'ngDialog', 'bubbleService']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
            when('/bubble/view', {templateUrl:'views/bubble-view.html', controller:'BubbleViewController'}).
            when('/bubble/list', {templateUrl:'views/bubble-list.html', controller:'BubbleListController'}).
            otherwise({redirectTo:'/bubble/view'});
}]);
