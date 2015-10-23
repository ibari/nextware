angular.module('app')
	.controller('ThreatsController', ['$scope', 'objectives', 'threatsObjectives', 'charts', function($scope, objectives, threatsObjectives, charts) {
		$scope.objectives = objectives;
		$scope.threatsObjectives = threatsObjectives;

        function update() {
			$scope.chart = charts.threats(objectives, threatsObjectives);
			//$scope.chart = charts.test.threats; // test data
		}
		update();

		$scope.$watch('objectives', update, true);
		$scope.$watch('threatsObjectives', update, true);
	}]);