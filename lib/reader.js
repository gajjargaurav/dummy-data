'use strict';
var fs = require('fs');
var async = require('async');
var path = require('path');
var _ = require('lodash');

function reader(dir, done){
	if (!done) { done = function () {}; }
	async.waterfall([
		_.partial(fs.readdir, dir),
		function(files, cb){
			async.map(files, mapDir.bind(null, dir) , cb);
		},
		function(files, cb) {
			async.map(files, readFileData, cb)
		}],
		function(err, result){
			if (err) done(err);
			done(null, result);	
		}
	);
}

function mapDir(dir, file, done){
	return done(null, path.join(dir, file));
}

function readFileData(file, done){
	fs.readFile(file, 'utf8',function(err, data){
		return done(null,JSON.parse(data));
	});
}

module.exports = reader;
