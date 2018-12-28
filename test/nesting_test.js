const mocha = require('mocha');
const assert = require('assert');
const ArtistModel = require('../models/artistmodel')
const mongoose = require('mongoose');

describe('Nesting Records', function(){
	var gizz;

	beforeEach(function(done){
		mongoose.connection.collections.artistmodels.drop(function(){
			gizz = new ArtistModel({
				name: "King Gizzard & The Lizard Wizard",
				albums: [
					{
						name: "Nonagon Infinity",
						numSongs: 9,
						releaseDate: "2016",
						songs: [
						{
							name: "Robot Stop",
							length: 322,
							id: 1
						},
						{
							name: "Big Fig Wasp",
							length: 295,
							id: 2
						}
						]
					},
					{
						name: "Flying Microtonal Banana",
						numSongs: 9,
						releaseDate: "2017",
						songs: [
						{
							name: "Rattlesnake",
							length: 468,
							id: 1
						},
						{
							name: "Melting",
							length: 327,
							id: 2
						}
						]
					}
				]
			})
			gizz.save().then(function(){
				done()
			});				
		})

	})
	it('Finds Gizz Record and asserts length', function(done){
		ArtistModel.findOne({name: "King Gizzard & The Lizard Wizard"}).then(function(result){
			assert(result.albums.length === 2);
			assert(result.albums[0].songs.length === 2);
			done();
		})
	})

	it("Adds a song to an album", function(done){
		ArtistModel.findOne({name: "King Gizzard & The Lizard Wizard"}).then(function(result){
			result.albums[0].songs.push({
				name: "Gamma Knife",
				length: 261,
				id: 3
			})
			result.save().then(function(){
				ArtistModel.findOne({name: "King Gizzard & The Lizard Wizard"}).then(function(result){
					assert(result.albums[0].songs.length === 3);
					done();
				})
			})
		})
	})
})