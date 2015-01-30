var fs = require('fs');
fs.readFile('./dummy-data.conf.json', 'utf8' , function(err, config){
	if (err) throw err;
	var dummy = require('./').dummy(config);

	dummy.setup(function(err, data){
		console.log(data);
	});
});

// var dummy = require('./').dummy();
// 	dummy.setup(function(err, data){
// 		console.log(data);
// 	});