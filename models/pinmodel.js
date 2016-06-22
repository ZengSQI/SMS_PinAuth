var mongoose = require('mongoose');
var Pin = mongoose.model('Pin');
var req = require('request');
var Userdata = mongoose.model('Userdata');

exports.reqpin = function( phone, callback){
	var status;
	Pin.
	find({ phone: phone}, function(err, data){
		if(data.length){
			callback(status=-1);
		}else{
			new Pin({
				phone : phone,
				pin		: pingenerator(6),
				date	: Date.now()
			}).save(function(err, data, count ){
				if(err){
					callback(status=0);
				}else{
					var url = "https://oms.every8d.com/API21/HTTP/sendsms.ashx?UID=APITEST88&PWD=APITEST88&SB=verify&MSG=your verify number is " +
										data.pin + ", this verify number will be expired in 5 minutes." + "&DEST=" + phone;
					req(url, function(err, res, body){
						if(err){
							callback(status=0);
						}else{
							callback(status=1);
						}
					});
				}
			});
		}
	});
};
exports.verify = function(phone, pin, callback){
	Pin.
	findOne({ phone: phone},
	function(err, data){
		if (err) {
			callback(status=0);
		}else {
			if (data.pin != pin) {
				data.remove();
				callback(status=-1);
			}else{
				data.remove();
				Userdata.
				findOne({phone: phone},
				function(err, data){
					if (err) {
						callback(status=0);
					}else{
						callback(status=1, data);
					}
				});
			}
		}
	});
};
function pingenerator(n){
	var _s = "";
	var _x;
	for (var i = 0, l = n; i < l; i++) {
		_x = Math.floor(Math.random() * 10);
		_s += _x;
	}
	console.log(_s);
	return _s;
}

module.exports = exports;
