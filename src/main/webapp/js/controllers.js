'use strict';

var rammController = angular.module('rammController', ['ngRoute']);

rammController.controller('BubbleController', function($scope, ngDialog) {
	$scope.addForm = function () {
		ngDialog.open({
			template: 'views/bubble-add.html',
			controller: 'BubbleAddController',
			className: 'ngdialog-theme-default'
		});
    };
})

rammController.controller('BubbleAddController', function($scope, $location, Bubble) {
	$scope.updateFocus = false;
	$scope.contents = [];
    $scope.submit = function () {
    	$scope.updateFocus = true;
    	Bubble.save($scope.bubble, function (bubble) {
    		document.getElementById('bubble.content').value ='';
    		$scope.contents.push(bubble.content);
    		$scope.updateFocus = false;
            $location.path('/');
        });
    };
    $scope.gotoViewPage = function () {
        $location.path("/")
    };
});

rammController.controller('BubbleViewController', function($scope, Bubble) {
	$scope.bubbles = Bubble.query();
});

rammController.controller('BubbleListController', function($scope, $location, Bubble) {
	$scope.bubbles = Bubble.query();
	$scope.gotoViewPage = function () {
		$location.path("/")
	};
});
