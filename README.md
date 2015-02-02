# dummydata  [![NPM Version][npm-image]][npm-url] 
A simple module for mongo to allow dummy data setup and teardown for tests
[npm-image]: https://img.shields.io/badge/npm-v0.1.2-green.svg
[npm-url]: https://npmjs.org/package/dummydata

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
