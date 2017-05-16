(function () {
	var app = angular.module('main', ["ng-fusioncharts"]).config(function ($interpolateProvider) {
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	});
	app.controller('StreamController', ['$scope',function ($scope) {
		// $scope.msg=[];
		$scope.rain = {
			"chart":{
				"caption": "Rainfall",
				"subCaption": "Live Stream Data: Last 48 Hours",
				"theme":"zune"
			},
			"data":[]
		};

		var handleCallback = function (msg) {
			$scope.$apply(function () {
				// $scope.msg.push(JSON.parse(msg.data));
				var tempJS=JSON.parse(msg.data);
				$scope.rain.data.push({value:tempJS.rain,label:tempJS.date})
			});
		};

		var source = new EventSource('/stream');
		source.addEventListener('message', handleCallback, false)

	}]);

})();