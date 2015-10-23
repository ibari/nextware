angular.module('app')
	.directive('threatsFacetsForm', ['threats', function(threats) {
		return {
			restrict: 'E',
			templateUrl: 'templates/directives/threats-facets-form.html',
			scope: {
				facets: "=",
				threatsfacets: "=",
				type: "="
			},
			controller: function($scope) {
				$scope.threats = threats;

				$scope.addThreatFacets = function() {
					$scope.threatsfacets.create();
				};
			}
		};
	}]);
