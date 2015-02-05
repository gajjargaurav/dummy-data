'use strict'
var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var path = require('path');
var mongo = require('mongodb').MongoClient;
var reader = require('./lib/reader');

var defaults = {
	'connectionUrl': 'mongodb://127.0.0.1:27017/',
	'databaseName': 'test_data',
	'datadir': 'test_data/'
}

function processData(db, data, cb){
	async.map(data, function(item, done){
		_.forEach(item,function(n,key){
				 	db.createCollection(key, function(err, collection){
				 		collection.insert(n, function(err, res){
							if(err) {return console.error(err);}
							return done(null, db);
						});
					});
				});
	}, function(err, result){
		if(err) cb(err);
		cb(null, db);
	});
	// async.map(data, function(item,done){
	// 	//console.log(item);
	// 	//console.log('============');
	// 	_.forEach(item, function(documents,collectionName){
	// 		//console.log(documents);
	// 		// console.log(collection);
	// 		db.createCollection(collectionName, function(err, collection){
	// 			if(err) cb(err);
	// 			console.log(collection);
	// 			// collection.insert(documents, function(err, res){
	// 			// 	//cb(err, db);
	// 			// 	if(err) cb(err);
	// 			// });
	// 		});		
	// 	})
	// }, cb(null, db));
}

// function process(data, cb){
// 	async.waterfall([
// 		function(cb){
// 			var collections 
// 			async.map(data, function(item, cb){

// 			})
// 		},
// 		])
// }

// function createCollection(db, collectionName, cb){
// 	db.createCollection(collectionName, cb);
// }

// function insertDocuments(db, documents, cb){
// 	db.insert(documents, cb);
// }

function readTestData(cb){
	var testDataDir = path.join( __dirname, defaults.datadir);
	reader(testDataDir, cb);
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
				dummy.data = result.data;	
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