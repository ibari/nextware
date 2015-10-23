angular.module('app')
	.directive('stakeholdersFacetsForm', ['stakeholders', function(stakeholders) {
		return {
			restrict: 'E',
			templateUrl: 'templates/directives/stakeholders-facets-form.html',
			scope: {
				facets: "=",
				stakeholdersfacets: "=",
				stakeholdertypes: "=",
				type: "="
			},
			controller: function($scope) {
				$scope.stakeholders = stakeholders;

				$scope.addStakeholderFacets = function() {
					$scope.stakeholdersfacets.create();
				};
			}
		};
	}]);
