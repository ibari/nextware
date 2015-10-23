angular.module('app')
	.directive('stakeholderChart', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/directives/chart.html',
			transclude: true,
			scope: {
				name: "="
			},
			link: function($scope, element) {
                $scope.downloadImage = function() {
					var canvas = element.find('canvas')[0];
					var link = element.find('a')[0];

					link.href = canvas.toDataURL();
					link.download = $scope.name + '.png';
                };
			}
		};
	});
