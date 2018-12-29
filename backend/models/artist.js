const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema and model

const SongSchema = new Schema({
	name: String,
	length: Number,
	id: Number //position of song on album
})

const AlbumSchema = new Schema({
	name: String,
	numSongs: Number,
	releaseDate: String,
	songs: [SongSchema]
});

const ArtistSchema = new Schema({
	name: String,
	albums: [AlbumSchema]
})

const Artist = mongoose.model('artist', ArtistSchema)

module.exports = Artist;