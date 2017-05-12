(function () {
	var app = angular.module('main', []).config(function ($interpolateProvider) {
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	});
	app.controller('StreamController', ['$scope',function ($scope) {
		$scope.msg=[];
		var handleCallback = function (msg) {
			$scope.$apply(function () {
				$scope.msg.push(msg.data);
			});
		};

		var source = new EventSource('/stream');
		source.addEventListener('message', handleCallback, false)
	}]);

})();