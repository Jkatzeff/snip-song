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
describe('Saving Records', function(){
	it('Saves record (only userId) to DB', function(done){
		var snip = new Snip({
			userId: "jacobkatzeff"
		});
		snip.save().then(function(resolve){
			assert(snip.isNew === false);
			done();
		});
	})

	it('Saved record (full Snip data) to DB', function(done){
		 var snip = new Snip({
		 	userId: "jkatzeff",
		 	type: "spotify",
		 	songURI: "spotify:track:3QkTIg9pFStcRvsC3SA10t",
		 	numLikes: 0,
		 	date: "11/11/2018",
		 	time: "9:09:59",
		 	canLike: true
		 });
		snip.save().then(function(resolve){
			assert(snip.isNew === false);
			done();
		});
	})
})