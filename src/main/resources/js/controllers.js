'use strict';

var rammController = angular.module('rammController', ['ngRoute', 'bubbleService', 'referenceService', 'ui.select']);

rammController.controller('BubbleController', function($scope, ngDialog) {
	$scope.addForm = function () {
		ngDialog.open({
			template: 'views/bubble-add.html',
			controller: 'BubbleAddController',
			className: 'ngdialog-theme-default'
		});
    };
})

rammController.controller('BubbleAddController', function($scope, $location, Bubble, Reference) {
	$scope.refs = Reference.query();
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

rammController.controller('BubbleListController', function($scope, Bubble) {
	$scope.bubbles = Bubble.query();
});

rammController.controller('ManageReferenceController', function($scope, Reference) {
	$scope.references = Reference.query();
	if ($scope.references.length > 0) {
		$scope.selectedRef = $scope.references[0];
	}
	$scope.createRef = function () {
		Reference.save($scope.newRef);
	}
	$scope.deleteRef = function (id) {
		Reference.remove(id);
	}
});
