angular.module('app')
	.factory('stakeholders', function($rootScope) {
		var stakeholders = {};
		var list = [];
		
		stakeholders.list = list;

		stakeholders.types = [
			{ text: 'Primary', value: 0 },
		    { text: 'Secondary', value: 1 },
		    { text: 'Tertiary', value: 2 }
		];

		stakeholders.create = function() {
			var stakeholder =  {
				id: 0,
				name: '',
				type: 0,
				data: {
					phases: [],
					interestAreas: []
				}
			};
			var last = list[list.length - 1];

			if (last) {
				stakeholder.data = JSON.parse(JSON.stringify(last.data));

				// reset to default value
				for (var facetType in stakeholder.data) {
					stakeholder.data[facetType].forEach(function(facet) {
						facet.value = 0;
					});
				}
			}

			list.push(stakeholder);
		};

		stakeholders.getOptionByValue = function(options, value) {
			var result = options.filter(function(obj) {
            	return obj.value == value;
            });

            return result[0];
		};

		stakeholders.getTypeByValue = function(value) {
			var result = stakeholders.types.filter(function(obj) {
            	return obj.value == value;
            });

            return result[0];
		};

		// initialize
		stakeholders.create(); 

		return stakeholders;
	});
