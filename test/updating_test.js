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
describe('Updating Records', function(){
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

	it('Update a record in DB', function(done){
		SnipModel.findOneAndUpdate({userId: "jkatzeff"}, {userId: "jacobkatzeff"}).then(function(){
			SnipModel.findOne({_id: snip._id}).then(function(result){
				assert(result.userId === "jacobkatzeff");
				done();
			})
		})
	})
// deprecated
	it('Update a record in DB directly', function(done){
		snip.update({userId: "jacobkatzeff"}).then(function(){
			SnipModel.findOne({_id: snip._id}).then(function(result){
				assert(result.userId === "jacobkatzeff");
				done();
			})
		})
	})


	// updating numLikes
	it('Increments number of likes', function(done){
		SnipModel.update({}, { $inc: {numLikes: 1}}).then(function(){
			SnipModel.findOne({userId: "jkatzeff"}).then(function(result){
				assert(result.numLikes === 1);
				done();
			})
		})
	})
})