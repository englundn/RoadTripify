var SavedPlaylistModel = require('../model/savedPlaylist');

//Find One Trip by condition
function findOne(id, callback) {
  SavedPlaylistModel.find({id: id}, callback);
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
