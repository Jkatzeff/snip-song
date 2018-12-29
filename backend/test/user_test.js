const mocha = require('mocha');
const assert = require('assert');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 10;
const myPlaintextPassword = 'somepassWORD';
const someOtherPlaintextPassword = 'not_bacon';

describe('Create user', function(){
	beforeEach(function(done){
		mongoose.connection.collections.users.drop(function(){
			bcrypt.hash(myPlaintextPassword, saltRounds, function(err,hash){
				var user = new User({
					username: "jkatzeff",
					passwd: hash
				})
				user.save().then(() => done());
			})			
		})

	})

	it('Check password still works', function(done){
		User.findOne({username: "jkatzeff"}).then(function(result){
			bcrypt.compare(myPlaintextPassword, result.passwd).then(function(res){
				assert(res === true);
				done();
			})
		})
	})

	it('Check other passwords don\'t work', function(done){
		User.findOne({username: "jkatzeff"}).then(function(result){
			bcrypt.compare(someOtherPlaintextPassword, result.passwd).then(function(res){
				assert(res === false);
				done();
			})
		})	
	})
})