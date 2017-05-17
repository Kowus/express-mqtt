(function () {
	var app = angular.module('main', ["ng-fusioncharts"]).config(function ($interpolateProvider) {
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	});
	app.controller('StreamController', ['$scope', function ($scope) {

		$scope.longitude = 0;
		$scope.latitude = 0;
		$scope.altitude = 0;
		$scope.battery = 0;
		// $scope.msg=[];
		$scope.rain = rain;
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
				$scope.rain.dataset[0].data.push({value: tempJS.rain});
				$scope.rain.categories[0].category.push({label: date_time});
				// console.log(msg.data);
				$scope.heat.dataset[0].data.push({value: tempJS.temperature});
				$scope.heat.categories[0].category.push({label: date_time});
				$scope.pressure.dataset[0].data.push({value: tempJS.pressure});
				$scope.pressure.categories[0].category.push({label: date_time});
				$scope.light.dataset[0].data.push({value: tempJS.light});
				$scope.light.categories[0].category.push({label: date_time});
				$scope.humidity.dataset[0].data.push({value: tempJS.humidity});
				$scope.humidity.categories[0].category.push({label: date_time});
				$scope.longitude = tempJS.longitude;
				$scope.latitude = tempJS.latitude;
				$scope.altitude = tempJS.altitude;
				$scope.wind_dir.dataset[0].data.push({value: tempJS.light});
				$scope.wind_dir.categories[0].category.push({label: date_time});
				$scope.wind_spd.dataset[0].data.push({value: tempJS.light});
				$scope.wind_spd.categories[0].category.push({label: date_time});
				$scope.battery = tempJS.battery;
			});
		};


		var source = new EventSource('/stream');
		source.addEventListener('message', handleCallback, false)
	}]);

	var rain = {
		"chart": {
			"caption": "Rainfall",
			"subCaption": "Amount of Rainfall, measured in inches",
			"xaxisname": "Date/Time",
			"yaxisname": "Amount in inches",
			"subcaptionFontBold": "0",
			"numberSuffix": "in",
			"theme": "ocean",
			"labeldisplay": "rotate",
			"divlinecolor": "#cccccc",
			"linecolor": "#f94700",
			"showrealtimevalue": "0"
		},
		"categories": [
			{
				"category": []
			}
		],
		"dataset": [
			{
				"data": []
			}
		]
	};
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
			"linecolor": "#7c0300",
			"showrealtimevalue": "0"
		}, "categories": [
			{
				"category": []
			}
		],
		"dataset": [
			{
				"data": []
			}
		]
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
			"linecolor": "#7c0300",
			"showrealtimevalue": "0"
		}, "categories": [
			{
				"category": []
			}
		],
		"dataset": [
			{
				"data": []
			}
		]
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
			"linecolor": "#7c0300",
			"showrealtimevalue": "0"
		}, "categories": [
			{
				"category": []
			}
		],
		"dataset": [
			{
				"data": []
			}
		]
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
			"showrealtimevalue": "0"
		}, "categories": [
			{
				"category": []
			}
		],
		"dataset": [
			{
				"data": []
			}
		]
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
			"showrealtimevalue": "0"
		}, "categories": [
			{
				"category": []
			}
		],
		"dataset": [
			{
				"data": []
			}
		]
	};
	var humidity = {
		"chart": {
			"caption": "Humidity",
			"subcaption": "Amount of moisture in the Atmosphere",
			"xaxisname": "Date/Time",
			"yaxisname": "Moisture Percentage",
			"subcaptionFontBold": "0",
			"numberSuffix": "%",
			"theme": "ocean",
			"labeldisplay": "rotate",
			"divlinecolor": "#cccccc",
			"linecolor": "#7fa2ff",
			"showrealtimevalue": "0"
		}, "categories": [
			{
				"category": []
			}
		],
		"dataset": [
			{
				"data": []
			}
		]
	};
})();