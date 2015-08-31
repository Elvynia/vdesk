'use strict';

var app = angular.module('rammApp', ['rammController', 'focus-if', 'ngDialog', 'ngSanitize']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
            when('/bubble/view', {templateUrl:'views/bubble-view.html', controller:'BubbleViewController'}).
            when('/bubble/list', {templateUrl:'views/bubble-list.html', controller:'BubbleListController'}).
            when('/manage/reference', {templateUrl:'views/manage-reference.html', controller:'ManageReferenceController'}).
            when('/manage/bubble', {templateUrl:'views/manage-bubble.html', controller:'ManageBubbleController'}).
            otherwise({redirectTo:'/bubble/view'});
}]);
