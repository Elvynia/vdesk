'use strict';

var rammController = angular.module('rammController', ['ngRoute', 'rammService', 'ui.select', 'cfp.hotkeys']);

rammController.controller('ViewController', function($scope, ngDialog) {
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
    	if ($scope.newBubble.content.length > 0) {
	    	$scope.updateFocus = true;
			var bubble = new Bubble({content: $scope.newBubble.content});
			bubble.$save();
			$scope.contents.push(bubble);
	    	$scope.updateFocus = false;
	    	document.getElementById('bubble.content').value ='';
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
    			note.bubbles.push({id: bubbles[i].id});
    		}
    		var selectedRefs = $scope.selection.selectedRefs;
    		if (selectedRefs !== undefined) {
    			// Store references identifiers.
	    		for (var i = 0; i < selectedRefs.length; ++i) {
	    			note.references.push({id: selectedRefs[i].id});
	    		}
    		}
    		// Save note.
    		console.debug('Saving note...');
    		Note.save(note);
			$rootScope.$broadcast('reloadNotes');
    	} else {
    		alert('Please type at least one comment for saving the note.')
    	}
    }
});

rammController.controller('NoteViewController', function($scope, $window, Memory) {
	$scope.memoryMap = new Memory({
		screenX: $window.innerWidth,
		screenY: $window.innerHeight
	});
	$scope.memoryMap.$query();
	$scope.$on('reloadNotes', function() {
		$scope.memoryMap = Memory.query();
	});
});

rammController.controller('ManageNoteController', function($scope, Note) {
	$scope.notes = Note.query();
	$scope.deleteNote = function(note, index) {
		Note.remove(note, function() {
			$scope.notes.splice(index, 1);
		});
	};
});

rammController.controller('ManageBubbleController', function($scope, Bubble) {
	$scope.bubbles = Bubble.query();
	$scope.updateFocus = false;
	$scope.edition = {};
	$scope.editBubble = function(bubble, index) {
		$scope.updateFocus = true;
		$scope.edition = bubble;
	}
	$scope.saveEdition = function() {
		$scope.updateFocus = false;
		Bubble.save($scope.edition);
		$scope.edition = {};
	};
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
	$scope.deleteRef = function (ref, index) {
		Reference.remove(ref, function() {
			$scope.references.splice(index, 1);
		});
	}
});
