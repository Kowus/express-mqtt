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
				"theme": "ocean",
				"xaxisname": "Date/Time",
				"yaxisname": "Amount in millimeters",
				"numdisplaysets": "10",
				"labeldisplay": "rotate"
			},
			"data":[]
		};
		$scope.heat = temperature;
		var handleCallback = function (msg) {
			$scope.$apply(function () {
				var tempJS=JSON.parse(msg.data);
				var dt = new Date(tempJS.date);
				var date_time= dt.getUTCDate() + '-'+(dt.getUTCMonth()+1).toString()+'-'+dt.getUTCFullYear()+'@'+dt.getUTCHours()+':'+dt.getUTCMinutes()+':'+dt.getSeconds()
				$scope.rain.data.push({value:tempJS.rain,label:date_time});
				$scope.heat.data.push({value:tempJS.temperature,label:date_time});
				// console.log($scope.rain);
			});
		};

		var source = new EventSource('/stream');
		source.addEventListener('message', handleCallback, false)
	}]);

	var temperature = {
		"chart": {
			"caption": "Temperature",
			"subcaption": "Current Temperature",
			"xaxisname": "Date/Time",
			"yaxisname": "Temperature in Degrees Celcius (°C)",
			"subcaptionFontBold": "0",
			"numberSuffix": "°C",
			"theme": "fint",
			"labeldisplay": "rotate",
			"divlinecolor":"#cccccc",
			"linecolor":"#7c0300",
			"labelcolor":"blue"
		},
		"data":[]
	}
})();