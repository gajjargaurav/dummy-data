'use strict'
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var mongo = require('mongodb').MongoClient;

var config_vars = {
	"connectionUrl": "mongodb://127.0.0.1:27017/",
	"databaseName": 'test_data',
	"datadir": "test_data/"
}

// Really bad function, fix this asap
function createCollection(db,cb){
	var fs = require('fs');
	var root = path.join( __dirname,config_vars.datadir);
	fs.readdir(root,function(err,files){
		if(err) console.error(err);
		files.forEach(function(file){
			fs.readFile(root+file,'utf8', function(err, data){
				if(err) return console.error(err);
				_.forEach(JSON.parse(data),function(n,key){
				 	db.createCollection(key, function(err, collection){
				 		collection.insert(n, function(err, res){
							if(err) {return console.error(err);}
							return cb(null, db);
						});
					});
				});
			});
		});
	});
}

function dummy(config){
	var dummy = {};
	if(config)
	{
		config_vars = _.assign(config_vars, JSON.parse(config));
	}
	
	function setup(cb){
		mongo.connect(config_vars.connectionUrl + config_vars.databaseName, function(err, db){
			if (err) { return console.error(err); }
			createCollection(db, function(err, db){
				cb(null,db);
			});
		});
	}

	function destroy(db, cb){
		db.dropDatabase();
		db.close();
		
		if(cb){
			return cb();
		}
	}

	dummy = {
		setup: setup,
		destroy: destroy 
	};

	return dummy;
}

module.exports = dummy;