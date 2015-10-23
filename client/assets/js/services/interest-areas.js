angular.module('app')
	.factory('interestAreas', ['stakeholdersInterestAreas', function(stakeholdersInterestAreas) {
		var interestAreas = {};

		interestAreas.list = [];

		interestAreas.create = function(name) {
			var item = {
				name: name,
				placeholder: 'Name of Interest Area'
			};

			interestAreas.list.push(item);
			stakeholdersInterestAreas.addInterestArea(interestAreas.list.indexOf(item));
		};

		// initialize
		interestAreas.create(''); 

		return interestAreas;
	}]);
