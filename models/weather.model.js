var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var weatherSchema = new Schema({
	location: {
		longitude: {
			type: Number,
			required: true
		}, latitude: {
			type: Number,
			required: true
		}
	},
	rain:{
		type: Number,
		required: true
	},
	wind_dir:{
		type: Number,
		required: true
	},
	wind_speed:{
		type: Number,
		required:true
	},
})