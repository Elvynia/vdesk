'use strict';

var rammController = angular.module('rammController', ['ngRoute', 'rammService', 'ui.select', 'cfp.hotkeys']);

rammController.controller('BubbleController', function($scope, ngDialog) {
	$scope.addForm = function () {
		ngDialog.open({
			template: 'views/bubble-add.html',
			controller: 'BubbleAddController',
			className: 'ngdialog-theme-default'
		});
    };
})

rammController.controller('BubbleAddController', function($scope, $location, Bubble, Reference, Note) {
	$scope.newBubble = {};
	$scope.refs = Reference.query();
	$scope.updateFocus = false;
	$scope.contents = [];
	$scope.selection = {
		selectedRefs: [],
	};
    $scope.addBubble = function () {
    	if ($scope.bubble.content.length > 0) {
	    	$scope.updateFocus = true;
	    	Bubble.save($scope.newBubble, function (response) {
	    		//$scope.newBubble.id = response.id;
	    		$scope.contents.push($scope.newBubble);
	    		$scope.updateFocus = false;
	    		document.getElementById('bubble.content').value ='';
	        });
    	} else {
    		alert('Please type at least one word for saving the bubble.')
    	}
    };
    $scope.submit = function () {
    	var note = {
    		bubbles : [],
    		references: [],
    	};
    	var bubbles = $scope.contents;
    	if (bubbles !== undefined && bubbles.length > 0) {
    		// Store bubble content identifiers.
    		for (var i = 0; i < bubbles.length; ++i) {
    			note.bubbles.push(bubbles[i].id);
    		}
    		var selectedRefs = $scope.selection.selectedRefs;
    		if (selectedRefs !== undefined) {
    			// Store references identifiers.
	    		for (var i = 0; i < selectedRefs.length; ++i) {
	    			note.references.push(selectedRefs[i].id);
	    		}
    		}
    		// Save note.
    		console.debug('Saving note...');
    		Note.save(note);
    	} else {
    		alert('Please type at least one comment for saving the note.')
    	}
    }
});

rammController.controller('BubbleViewController', function($scope, Note) {
	$scope.notes = Note.query();
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
		Reference.save($scope.newRef, function(newRef) {
			$scope.references.push(newRef);
		});
	}
	$scope.deleteRef = function (id, index) {
		Reference.remove(id, function() {
			$scope.references.splice(index, 1);
		});
	}
});
