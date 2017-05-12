var express = require('express'),
	router = express.Router(),
	os = require('os'),
	url = require('url'),
	mqtt = require('mqtt'),
	mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883'),
	auth = (mqtt_url.auth || ':').split(':');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'MQTT'});
});

router.post('/publish', function (req, res, next) {
	var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {username: auth[0], password: auth[1]});
	client.on('connect', function () {
		client.publish('mychannel', new Date().toString(),function () {
			client.end();
			res.writeHead(204,{'Connection':'keep-alive'})
			res.end();
		});
	});
});




module.exports = router;
