'use strict'
var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var path = require('path');
var mongo = require('mongodb').MongoClient;

var  defaults = {
	"connectionUrl": "mongodb://127.0.0.1:27017/",
	"databaseName": 'test_data',
	"datadir": "test_data/"
}

function createCollections(db, data, cb){
	_.forEach(JSON.parse(data),function(n,key){			
		db.createCollection(key, function(err, collection){
			if(err) {return cb(err);}
			collection.insert(n, function(err, res){
				if(err) {return cb(err);}
				return cb(null, db);
			});
		});
	});
}

// Really bad function, fix this asap
function readTestData(operation){
	var fs = require('fs');
	var root = path.join( __dirname, defaults.datadir);
	fs.readdir(root,function(err,files){
		if(err) return console.error(err);
		files.forEach(function(file){
			fs.readFile(root+file,'utf8', function(err, data){
				operation(err, data);
			});
		});
	});
}

function dummy(config){
	var dummy = {};
	if(config)
	{
		defaults = _.assign(defaults, JSON.parse(config));
	}
	
	function create(cb){
		mongo.connect( defaults.connectionUrl +  defaults.databaseName, function(err, db){
			return cb(err, db);
		});
	}

	function setup(cb){		
		async.parallel({
			db: create,
			data: readTestData
			}, function (err, result){
				createCollections(result.db, result.data, cb);
		});
	}

	function destroy(db, cb){
		db.dropDatabase();	
		close(db, cb);
	}

	function close(db, cb){
		db.close();

		if(cb){ return cb(); }
	}

	dummy = {
		create: create,
		setup: setup,
		destroy: destroy,
		close: close
	};

	return dummy;
}

module.exports = dummy;