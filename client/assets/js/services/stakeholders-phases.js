angular.module('app')
	.factory('stakeholdersPhases', ['stakeholders', function(stakeholders) {
		var list = stakeholders.list;
		var stakeholdersPhases = {
			list: list
		};
		
		stakeholdersPhases.options = [
			{ text: 'Highly Beneficial', value: 3 },
			{ text: 'Moderately Beneficial', value: 2 },
			{ text: 'Slightly Beneficial', value: 1 },
			{ text: 'None', value: 0 },
			{ text: 'Slightly Damaging', value: -1 },
			{ text: 'Moderately Damaging', value: -2 },
			{ text: 'Highly Damaging', value: -3 }
		];

		stakeholdersPhases.getOptionByValue = function(value) {
			return stakeholders.getOptionByValue(stakeholdersPhases.options, value);
		};

		stakeholdersPhases.create = function() {
			stakeholders.create();
		};

		stakeholdersPhases.addPhase = function(index) {
			list.forEach(function(stackholder) {
				stackholder.data.phases.push({
					facetId: index,
					value: 0
				});
			});
		};

		return stakeholdersPhases;
	}]);
