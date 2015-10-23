angular.module('app')
	.factory('stakeholdersInterestAreas', ['stakeholders', function(stakeholders) {
		var list = stakeholders.list;
		var stakeholdersInterestAreas = {
			list: list
		};

		stakeholdersInterestAreas.options = [
		    { text: 'None/Negligible', value: 0 },
		    { text: 'Low', value: 1 },
		    { text: 'Moderate', value: 2 },
		    { text: 'High', value: 3 }
		];

		stakeholdersInterestAreas.getOptionByValue = function(value) {
			return stakeholders.getOptionByValue(stakeholdersInterestAreas.options, value);
		};

		stakeholdersInterestAreas.create = function() {
			stakeholders.create();
		};

		stakeholdersInterestAreas.addInterestArea = function(index) {
			list.forEach(function(stackholder) {
				stackholder.data.interestAreas.push({
					facetId: index,
					value: 0
				});
			});
		};

		return stakeholdersInterestAreas;
	}]);
