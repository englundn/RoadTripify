var SavedPlaylistModel = require('../model/savedPlaylist');

//Find One Trip by condition
var findOne = (name, callback) => {
  SavedPlaylistModel.findOne({'playlist_name': name}, callback);
};

//Find All Trip
var findAll = (callback) => {
  SavedPlaylistModel.find({}, callback);
};

//Insert One Trip
var insertOne = (playlist, callback) => {
  SavedPlaylistModel.create(playlist, callback);
};


exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
