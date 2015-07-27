'use strict';

function SimpleListController($scope, $location, Bubble) {
    $scope.bubbles = Bubble.query();
    $scope.gotoSimpleNewPage = function () {
        $location.path("/simple/add")
    };
    $scope.deleteBubble = function (bubble) {
    	bubble.$delete({'id':bubble.title}, function () {
            $location.path('/');
        });
    };
}

function SimpleDetailController($scope, $routeParams, $location, Bubble) {
    $scope.bubble = Bubble.get({id:$routeParams.id}, function (bubble) {});
    $scope.gotoSimpleListPage = function () {
        $location.path("/")
    };
}

function SimpleNewController($scope, $location, Bubble) {
    $scope.submit = function () {
    	Bubble.save($scope.bubble, function (bubble) {
            $location.path('/');
        });
    };
    $scope.gotoSimpleListPage = function () {
        $location.path("/")
    };
}
