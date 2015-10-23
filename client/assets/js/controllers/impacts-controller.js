angular.module('app')
	.controller('ImpactsController', ['$scope', 'phases', 'stakeholdersPhases', 'charts', function($scope, phases, stakeholdersPhases, charts) {
		$scope.phases = phases;
		$scope.stakeholdersPhases = stakeholdersPhases;

		function update() {
			$scope.chart = charts.impacts(phases, stakeholdersPhases);
            //$scope.chart = charts.test.impacts; // test data
		}
		update();

		$scope.$watch('phases', update, true);
		$scope.$watch('stakeholdersPhases', update, true);
	}]);
