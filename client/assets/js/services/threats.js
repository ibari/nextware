angular.module('app')
	.factory('threats', function($rootScope) {
		var threats = {};
		var list = [];
		
		threats.list = list;

		threats.create = function() {
			var threat =  {
				id: 0,
				name: '',
				data: {
					objectives: []
				}
			};
			var last = list[list.length - 1];

			if (last) {
				threat.data = JSON.parse(JSON.stringify(last.data));

				// reset to default value
				for (var facetType in threat.data) {
					threat.data[facetType].forEach(function(facet) {
						facet.value = 0;
					});
				}
			}

			list.push(threat);
		};

		threats.getOptionByValue = function(options, value) {
			var result = options.filter(function(obj) {
            	return obj.value == value;
            });

            return result[0];
		};

		// initialize
		threats.create(); 

		return threats;
	});
