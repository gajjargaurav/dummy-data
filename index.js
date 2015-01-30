'use strict'
var fs = require('fs');
var _ = require('lodash');
var mongo = require('mongodb').MongoClient;

var config_vars = {
	"connectionUrl": "mongodb://127.0.0.1:27017/",
	"datadir": "/test_data"
}

function dummy(config){
	var dummy = {};
	config_vars = _.assign(config_vars, JSON.parse(config));
	
	function setup(cb){
		mongo.connect(config_vars.connectionUrl, function(err, db){
			if (err) { return console.error(err); }
			cb(null,db);
			db.close();	
		});
	}

	function destroy(){

	}

	dummy = {
		setup: setup,
		destroy: destroy 
	};

	return dummy;
}

module.exports.dummy = dummy;