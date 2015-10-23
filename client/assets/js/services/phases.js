angular.module('app')
	.factory('phases', ['stakeholdersPhases', function(stakeholdersPhases) {
		var phases = {};

		phases.list = [];

		phases.create = function(name) {
			var phase = {
				name: name,
				placeholder: 'Name of Time Phase'
			}
			
			phases.list.push(phase);
			stakeholdersPhases.addPhase(phases.list.indexOf(phase));
		};

		// initialize
		phases.create(''); 

		return phases;
	}]);
