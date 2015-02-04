'use strict'
var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var path = require('path');
var mongo = require('mongodb').MongoClient;
var Reader = require('./lib/reader');

var defaults = {
	'connectionUrl': 'mongodb://127.0.0.1:27017/',
	'databaseName': 'test_data',
	'datadir': 'test_data/'
}

function processData(db, data, cb){
	//console.log(data);
	async.map(data, function(item,done){
		_.forEach(item, function(documents,collection){
			db.createCollection(collection, function(err, collection){
				if(err) cb(err);
				collection.insert(documents, function(err, res){
					cb(err, db);
				});
			});		
		})
	}, cb)
	// _.forEach(data,function(n,key){		
	// 	console.log(n, key);
	// 	db.createCollection(key, function(err, collection){
	// 		if(err) cb(err);
	// 		collection.insert(n, function(err, res){
	// 			cb(err, db);
	// 		});
	// 	});
	// });
}

function readTestData(cb){
	var testDataDir = path.join( __dirname, defaults.datadir);
	var reader = new Reader(testDataDir);
	reader.read(cb);
	// async.waterfall([
	// 	function(cb){
	// 		fs.readdir(testDataDir,cb)		
	// 	},
	// 	function(files,cb){
	// 		async.each(files,cb);
	// 	},
	// 	function(file, cb){
	// 		readFileData(testDataDir + file, cb);
	// 	}
	// 	],
	// 	function(err, result){
	// 		cb(err,result);
	// 	})
	// fs.readdir(testDataDir,function(err,files){
	// 	if(err) cb(err);
	// 	files.forEach(function(file){
	// 			readFileData(testDataDir + file, cb)			
	// 	});
	// });
}

function dummy(config){
	var dummy = {};
	if(config)
	{
		defaults = _.assign(defaults, JSON.parse(config));
	}
	
	function create(cb){
		mongo.connect( defaults.connectionUrl + defaults.databaseName, function(err, db){
			return cb(err, db);
		});
	}

	function setup(cb){		
		async.parallel({
			db: create,
			data: readTestData
			}, function (err, result){
				if(err) { return cb(err) }
				//	console.log(result.db.databaseName);
				//console.log(JSON.stringify(result.data));
				//console.log(JSON.stringify(result.data));
				processData(result.db, result.data, cb);
		});
	}

	function destroy(db, cb){
		db.dropDatabase();	
		db.close();

		if(cb){ return cb(); }
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