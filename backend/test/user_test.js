const mocha = require('mocha');
const assert = require('assert');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

describe('Create user', function(){
	beforeEach(function(done){
		mongoose.connection.collections.snips.drop(function(){
			bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash){
				var user = new User({
					username: "jkatzeff",
					password: hash
				})
				user.save().then(done());
			})			
		})

	})

	it('Check password still works', function(done){
		User.findOne({username: "jkatzeff"}).then(function(result){
			bcrypt.compare(myPlaintextPassword, result.password).then(function(res){
				assert(res === true);
				done();
			})
		})
	})

	it('Check other passwords don\'t work', function(done){
		User.findOne({username: "jkatzeff"}).then(function(result){
			bcrypt.compare(someOtherPlaintextPassword, result.password).then(function(res){
				assert(res === false);
				done();
			})
		})	
	})
})