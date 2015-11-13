'use strict';

var app = angular.module('rammApp', ['rammController', 'focus-if', 'ngDialog', 'ngSanitize']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
            when('/view', {templateUrl:'views/note-view.html', controller:'NoteViewController'}).
            when('/manage/note', {templateUrl:'views/manage-note.html', controller:'ManageNoteController'}).
            when('/manage/reference', {templateUrl:'views/manage-reference.html', controller:'ManageReferenceController'}).
            when('/manage/bubble', {templateUrl:'views/manage-bubble.html', controller:'ManageBubbleController'}).
			when('/math/demo', {templateUrl:'views/math-demo.html', controller:'MathDemoController'}).
            otherwise({redirectTo:'/view'});
}]);
