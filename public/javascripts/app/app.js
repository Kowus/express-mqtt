(function () {
	var app = angular.module('main', []).config(function ($interpolateProvider) {
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	}).factory('sse', function($rootScope) {
		var sse = new EventSource('/stream');
		return {
			addEventListener: function(eventName, callback) {
				sse.addEventListener(eventName, function() {
					var args = arguments;
					$rootScope.$apply(function () {
						callback.apply(sse, args);
					});
				});
			}
		};
	});
	function LogCtrl($scope, sse) {
		$scope.values = [];
		sse.addEventListener('message', function (e) {
			$scope.values.push({value: e.data});
		});
	}
})();