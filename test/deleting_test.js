const mocha = require('mocha');
const assert = require('assert');
const SnipModel = require('../models/snipmodel')


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
describe('Deleting Records', function(){
	var snip;

	beforeEach(function(done){
		snip = new SnipModel({
		 	userId: "jkatzeff",
		 	type: "spotify",
		 	songURI: "spotify:track:3QkTIg9pFStcRvsC3SA10t",
		 	numLikes: 0,
		 	date: "11/11/2018",
		 	time: "9:09:59",
		 	canLike: true
		 });
		snip.save().then(function(){
			done()
		});	
	})

	it('Delete a record', function(done){
		SnipModel.findOneAndRemove({userId: "jkatzeff"}).then(function(){
			SnipModel.findOne({userId: "jkatzeff"}).then(function(result){
				assert(result === null);
				done();
			})
		})
	})
})