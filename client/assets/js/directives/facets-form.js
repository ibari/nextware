angular.module('app')
	.directive('facetsForm', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/directives/facets-form.html',
			scope: {
				facets: "="
			},
			controller: function($scope) {
				$scope.addFacet = function() {
					$scope.facets.create();
				};
			}
		};
	});
