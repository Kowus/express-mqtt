(function () {
	var app = angular.module('main', ["ng-fusioncharts"]).config(function ($interpolateProvider) {
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	});
	app.controller('StreamController', ['$scope', function ($scope) {
		// $scope.msg=[];
		$scope.rain = {
			"chart": {
				"caption": "Rainfall",
				"subCaption": "Amount of Rainfall, measured in inches",
				"theme": "ocean",
				"xaxisname": "Date/Time",
				"yaxisname": "Amount in inches",
				"numdisplaysets": "10",
				"labeldisplay": "rotate",
				"refreshinterval": "3",
				"numberSuffix":"in"
			},
			"data": []
		};
		$scope.heat = temperature;
		$scope.pressure = pressure;
		$scope.light = light;
		$scope.humidity = humidity;
		var handleCallback = function (msg) {
			$scope.$apply(function () {
				var tempJS = JSON.parse(msg.data);
				var dt = new Date(tempJS.date);
				var date_time = dt.getUTCDate() + '-' + (dt.getUTCMonth() + 1).toString() + '-' + dt.getUTCFullYear() + '@' + dt.getUTCHours() + ':' + dt.getUTCMinutes() + ':' + dt.getSeconds()
				$scope.rain.data.push({value: tempJS.rain, label: date_time});
				$scope.heat.data.push({value: tempJS.temperature, label: date_time});
				$scope.pressure.data.push({value: tempJS.pressure, label: date_time});
				$scope.light.data.push({value: tempJS.light, label: date_time});
				$scope.humidity.data.push({value: tempJS.humidity, label: date_time});
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
			"divlinecolor": "#cccccc",
			"linecolor": "#7c0300",
			"refreshinterval": "3"
		},
		"data": []
	};
	var pressure = {
		"chart": {
			"caption": "Pressure",
			"subcaption": "Atmospheric Pressure",
			"xaxisname": "Date/Time",
			"yaxisname": "Pressure in Pascals (Pa)",
			"subcaptionFontBold": "0",
			"numberSuffix": "Pa",
			"theme": "fint",
			"labeldisplay": "rotate",
			"divlinecolor": "#cccccc",
			"linecolor": "#f0d70b",
			"refreshinterval": "3"
		},
		"data": []
	};
	var light = {
		"chart": {
			"caption": "Light",
			"subcaption": "Light Intensity Measure in Volts",
			"xaxisname": "Date/Time",
			"yaxisname": "Voltage (V)",
			"subcaptionFontBold": "0",
			"numberSuffix": "V",
			"theme": "zune",
			"labeldisplay": "rotate",
			"divlinecolor": "#cccccc",
			"linecolor": "#ffb011",
			"refreshinterval": "3"
		},
		"data": []
	};
	var humidity = {
		"chart": {
			"caption": "Humidity",
			"subcaption": "Check Unit Of Measure and Update accordingly",
			"xaxisname": "Date/Time",
			"yaxisname": "Unit",
			"subcaptionFontBold": "0",
			"numberSuffix": "",
			"theme": "ocean",
			"labeldisplay": "rotate",
			"divlinecolor": "#cccccc",
			"linecolor": "#7fa2ff",
			"refreshinterval": "3"
		},
		"data": []
	};
})();