angular.module('app')
	.controller('InterestsController', ['$scope', 'interestAreas', 'stakeholdersInterestAreas', 'charts', function($scope, interestAreas, stakeholdersInterestAreas, charts) {
		$scope.interestAreas = interestAreas;
		$scope.stakeholdersInterestAreas = stakeholdersInterestAreas;

		function update() {
			$scope.chart = charts.interests(interestAreas, stakeholdersInterestAreas);
			//$scope.chart = charts.test.interests; // test data
		}
		update();

		$scope.$watch('interestAreas', update, true);
		$scope.$watch('stakeholdersInterestAreas', update, true);
	}]);
