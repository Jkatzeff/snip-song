const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema and model

//reminder: a snip is of form
		// let newSnip = {
		// 	userId: this.state.userId,
		// 	type: "spotify",
		// 	songURI: track.uri,
		// 	numLikes: 0,
		// 	date: date,
		// 	time: time,
		// 	canLike: true
		// };

const SnipSchema = new Schema({
	userId: String,
	type: String,
	songURI: String,
	numLikes: Number,
	date: String,
	time: String,
	canLike: Boolean
	//likedBy: [String]
});

const Snip = mongoose.model('snip', SnipSchema)

module.exports = Snip;