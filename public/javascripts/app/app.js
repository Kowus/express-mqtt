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
				"refreshinterval":"5",
				"labeldisplay": "rotate",
				"numberSuffix":"in"
			},
			"categories": [
				{
					"category": []
				}
			],
			"dataset": [
				{
					"data":[]
				}
			]
		};
		$scope.heat = temperature;
		$scope.pressure = pressure;
		$scope.light = light;
		$scope.humidity = humidity;
		$scope.wind_dir = wind_dir;
		$scope.wind_spd = wind_spd;
		var handleCallback = function (msg) {
			$scope.$apply(function () {
				var tempJS = JSON.parse(msg.data);
				var dt = new Date(tempJS.date);
				var date_time = dt.getUTCDate() + '-' + (dt.getUTCMonth() + 1).toString() + '-' + dt.getUTCFullYear() + '@' + dt.getUTCHours() + ':' + dt.getUTCMinutes() + ':' + dt.getSeconds()
				$scope.rain.dataset[0].data.unshift({value: tempJS.rain});
				$scope.rain.categories[0].category.unshift({label: date_time});
				console.log(msg.data);
				/*$scope.heat.data.unshift({value: tempJS.temperature, label: date_time});
				$scope.pressure.data.unshift({value: tempJS.pressure, label: date_time});
				$scope.light.data.unshift({value: tempJS.light, label: date_time});
				$scope.humidity.data.unshift({value: tempJS.humidity, label: date_time});*/
			});
		};

		var source = new EventSource('/stream');
		source.addEventListener('message', handleCallback, false)
	}]);

	var wind_dir = {
		"chart": {
			"caption": "Wind Direction",
			"subcaption": "Bearings",
			"xaxisname": "Date/Time",
			"yaxisname": "Bearing in Degrees",
			"subcaptionFontBold": "0",
			"numberSuffix": "°",
			"theme": "fint",
			"labeldisplay": "rotate",
			"divlinecolor": "#cccccc",
			"linecolor": "#7c0300"
		},
		"data": []
	};
	var wind_spd = {
		"chart": {
			"caption": "Wind Speed",
			"subcaption": "Gust",
			"xaxisname": "Date/Time",
			"yaxisname": "Windspeed",
			"subcaptionFontBold": "0",
			"numberSuffix": "mph",
			"theme": "fint",
			"labeldisplay": "rotate",
			"divlinecolor": "#cccccc",
			"linecolor": "#7c0300"
		},
		"data": []
	};
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
			"linecolor": "#7c0300"
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
			"linecolor": "#f0d70b"
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
			"linecolor": "#ffb011"
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
			"linecolor": "#7fa2ff"
		},
		"data": []
	};
})();