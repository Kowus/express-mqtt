var express = require('express'),
	router = express.Router(),
	os = require('os'),
	url = require('url'),
	mqtt = require('mqtt'),
	mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883'),
	auth = (mqtt_url.auth || ':').split(':'),
	mychannel = 'mychannel',
	i = 2000000,
	options = {
		port: mqtt_url.port,
		host: mqtt_url.hostname,
		username: auth[0],
		password: auth[1],
		keepalive: 60,
		reconnectPeriod: 1000,
		protocolId: 'MQIsdp',
		protocolVersion: 3,
		clean: true,
		encoding: 'utf8'
	};


/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'MQTT'});
});

// publishing
router.post('/publish', function (req, res, next) {
	// var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {username: auth[0], password: auth[1]});
	var client = mqtt.connect('mqtt://localhost:1883',options);
	client.on('connect', function () {
		client.publish(mychannel, new Date().toString(), function () {
			client.end();
			res.writeHead(204, {'Connection': 'keep-alive'})
			res.end();
		});
	});
});

router.get('/stream', function (req, res, next) {
//	set timeout as high as possible
	req.socket.setTimeout(i *= 6);

	/**
	 * send headers for event-stream connection
	 * see spec for more information
	 * */
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});
	res.write('\n')

	/**
	 * Timeout timer, send a comment line every 20 seconds
	 * */
	var timer = setInterval(function () {
		res.write(':' + '\n');
	}, 20000);

	/*
	var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
		username: auth[0],
		password: auth[1]
	});
	*/
	var client = mqtt.connect('mqtt://localhost:1883',options);
	client.on('connect', function () {
		client.subscribe(mychannel, function () {
			client.on('message', function (topic, msg, pkt) {
				res.write('data:' + options + '\n\n')
			});
		});
	});
	/**
	 * When the request is closed, we search through the open connections and remove this connection.
	 * */
	req.on("close", function () {
		clearTimeout(timer);
		client.end();
	});

});


module.exports = router;
