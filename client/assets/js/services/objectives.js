angular.module('app')
	.factory('objectives', ['threatsObjectives', function(threatsObjectives) {
		var objectives = {};

		objectives.list = [];

		objectives.create = function(name) {
			var objective = {
				name: name,
				placeholder: 'Name of Threat Objective'
			}
			
			objectives.list.push(objective);
			threatsObjectives.addObjective(objectives.list.indexOf(objective));
		};

		// initialize
		objectives.create('Impact'); 
		objectives.create('Likelihood'); 

		return objectives;
	}]);
