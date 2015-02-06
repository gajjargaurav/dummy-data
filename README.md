# dummydata  [![npm](https://img.shields.io/npm/v/dummydata.svg)](https://www.npmjs.com/package/dummydata) 
A simple module for mongoDb to allow dummy data setup and teardown

## Installation

  `npm install dummydata --save`


## Usage
```javascript
var Dummy = require('dummydata');

var config_vars = JSON.stringify({
	"connectionUrl": "mongodb://127.0.0.1:27017/",
	"databaseName": 'test_data',
	"datadir": "test_data/"
});

var dummy = new Dummy(config_vars);
// setup dummy database 
dummy.setup(function(err, dummydb){
	if (err) { return console.error(err); }
    // ...
    // your code
    // ...
    dummy.destroy(dummydb, function(err){
			if (err) { return console.error(err); }
		});	
});
```

## Tests
   `npm test`

## License
Copyright (c) 2015 Gaurav Gajjar  
Licensed under the MIT license.
