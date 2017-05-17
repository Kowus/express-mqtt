var express = require('express'),
	router = express.Router(),
	mqtt = require('mqtt'),
	url = require('url'),
	redis = require('redis'),
	mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883'),
	auth = (mqtt_url.auth || ':').split(':'),
	mychannel = 'weather',
	hosturl = "mqtt://" + mqtt_url.host,
	i = 2000000,
	options = {
		port: mqtt_url.port,
		host:mqtt_url.host,
		username: auth[0],
		password: auth[1],
		keepalive: 60,
		reconnectPeriod: 1000,
		protocolId: 'MQIsdp',
		protocolVersion: 3,
		clean: true,
		encoding: 'utf8'
	};

// create a new redis client and connect to our local redis instance
var redis_cli = redis.createClient(process.env.REDISCLOUD_URL,{no_ready_check:true});
// Handle errors by printing to console
redis_cli.on('error', function (err) {
	console.log("Error " + err);
});

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Weather Station'});
});

// publishing
router.post('/publish', function (req, res, next) {
	var insertedData = req.body;

	redis_cli.setex(/*insertedData.date*/new Date().toISOString(), 3600 * 48, JSON.stringify(insertedData));
	var client = mqtt.connect(hosturl, options);
	client.on('connect', function () {
		client.publish(mychannel, JSON.stringify(insertedData), function () {
			client.end();
			res.writeHead(204, {'Connection': 'keep-alive'});
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
	res.write('\n');

	/**
	 * Timeout timer, send a comment line every 20 seconds
	 * */
	var timer = setInterval(function () {
		res.write(':' + '\n');
	}, 20000);

	var client = mqtt.connect(hosturl, options);
	client.on('connect', function () {
		client.subscribe(mychannel, function () {
			redis_cli.keys("*", function (error, result) {
				if (result) {
					console.log("Records found: " + result.length);
					result.forEach(function (item) {
						redis_cli.get(item, function (err, cursor) {
							if (cursor) {
								res.write('data:' + cursor + '\n\n');
							} else {
								console.log("no cache found: " + error);
							}
						})
					})
				} else {
					console.log("no cache found: " + error);
				}
			});
			client.on('message', function (topic, msg, pkt) {
				res.write('data:' + msg + '\n\n')
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