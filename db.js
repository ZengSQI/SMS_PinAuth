var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Userdata = new Schema({
	name				: String,
	user_id			: String,
	password		: String,
	phone				: { type: String, minlength: 10 },
	ip					: String
});

var Pin = new Schema({
	phone				: { type: String, minlength: 10 },
	pin					: { type: String, minlength: 6, maxlength: 6 },
	date				: { type: Date, expires: '5m' }
});


mongoose.model( 'Userdata', Userdata );
mongoose.model( 'Pin', Pin );
mongoose.connect( 'mongodb://localhost:27017/authdata' );
