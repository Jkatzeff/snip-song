const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: String,
	passwd: String,
	spotifyUsername: String
}, {timestamps: true});

const User = mongoose.model('user', UserSchema)

module.exports = User;