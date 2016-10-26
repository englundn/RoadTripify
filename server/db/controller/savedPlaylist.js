var SavedPlaylistModel = require('../model/savedPlaylist');

//Find One Trip by condition
function findOne(name, callback) {
  SavedPlaylistModel.findOne({'playlist_name': name}, callback);
}

//Find All Trip
function findAll(callback) {
  SavedPlaylistModel.find({}, callback);
}

//Inser One Trip
function insertOne(playlist, callback) {
  SavedPlaylistModel.create(playlist, callback);
}


exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
