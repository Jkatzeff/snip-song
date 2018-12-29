const mongoose = require('mongoose');


mongoose.connect('mongodb://jkatzeff:cntyd3172yy@ds029456.mlab.com:29456/snip-backend',
	{ useNewUrlParser: true });

//Connect to db before tests

before(function(done){
	mongoose.connection.once('open', function(){
		console.log('Connection has been made.')
		done();
	}).on('error', function(error){
		console.log('Error: ' + error)
	});	
})

//Drop items before each test
beforeEach(function(done){
	mongoose.connection.collections.snips.drop(function(){
		done()
	})
})
