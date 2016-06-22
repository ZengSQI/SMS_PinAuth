var mongoose = require('mongoose');
var Userdata = mongoose.model('Userdata');
var Pin = require('../models/pinmodel');
exports.create = function( req, res){
	new Userdata({
		name				: req.body.name,
		user_id			: req.body.user,
		password		: req.body.pass,
		phone				: req.body.phone,
		ip					: req.body.ip
	}).save( function(err, data, count ){
		res.send(data.phone +' is ready.');
	});
};

exports.reqpin = function(req, res){
	res.set("Content-Type", "application/json");
	Userdata.
	find({ phone: req.body.phone },
	function(err, data){
		try{
			Pin.reqpin(data[0].phone, function(status){
				console.log(status==1?req.body.phone + " request pin.":req.body.phone + " is already in pin table.");
				res.send(JSON.stringify({ status : status }));
			});
		}
		catch(errmsg){
			console.log(req.body.phone + " try to requset.");
			res.send(JSON.stringify({ status : 0 }));
		}
	});
};

exports.verify = function(req, res){
	res.set("Content-Type", "application/json");
	Pin.verify(req.body.phone , req.body.pin, function(status, data){
		if (status==1) {
			res.send({status: status, data: data});
		}else{
			res.send({status: status});
		}
	});
};
exports.index = function(req, res){
	Userdata.
	find().
	exec( function (err, datas){
		res.render('index', {
			datas : datas
		});
	});
};

module.exports = exports;
