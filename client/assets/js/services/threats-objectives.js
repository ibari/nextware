angular.module('app')
	.factory('threatsObjectives', ['threats', function(threats) {
		var list = threats.list;
		var threatsObjectives = {
			list: list
		};
		
		threatsObjectives.options = [
			{ text: 'Extremely High', value: 3 },
		    { text: 'Very High', value: 2 },
		    { text: 'Moderately High', value: 1 },
		    { text: 'Neither High nor Low', value: 0 },
		    { text: 'Moderately Low', value: -1 },
		    { text: 'Very Low', value: -2 },
		    { text: 'Extremely Low', value: -3 }
		];

		threatsObjectives.getOptionByValue = function(value) {
			return threats.getOptionByValue(threatsObjectives.options, value);
		};

		threatsObjectives.create = function() {
			threats.create();
		};

		threatsObjectives.addObjective = function(index) {
			list.forEach(function(threat) {
				threat.data.objectives.push({
					facetId: index,
					value: 0
				});
			});
		};

		return threatsObjectives;
	}]);
