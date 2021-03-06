const mocha = require('mocha');
const assert = require('assert');
const Snip = require('../models/snip')


// as a reminder:
// const SnipSchema = new Schema({
// 	userId: String,
// 	type: String,
// 	songURI: String,
// 	numLikes: Number,
// 	date: String,
// 	time: String,
// 	canLike: Boolean
// });
describe('Finding Records', function(){
	var snip;

	beforeEach(function(done){
		snip = new Snip({
		 	userId: "jkatzeff",
		 	type: "spotify",
		 	songURI: "spotify:track:3QkTIg9pFStcRvsC3SA10t",
		 	numLikes: 0,
		 	date: "11/11/2018",
		 	time: "9:09:59",
		 	canLike: true
		 });
		snip.save().then(function(resolve){
			done()
		});	
	})

	it('Find one record from DB', function(done){
		Snip.findOne({userId: "jkatzeff"}).then(function(result){
			assert(result.userId === "jkatzeff")
			done();
		})
	})

	it('Find record by id', function(done){
		Snip.findOne({_id: snip._id}).then(function(result){
			assert(result._id.toString() === snip._id.toString());
			done();
		})
	})
})