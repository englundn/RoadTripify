var TripModel = require('../model/trip');

//Find One Trip by condition
var findOne = (id, callback) => {
  TripModel.findOne({id: id}, callback);
};

var find = (parameter, callback) => {
  TripModel.find(parameter).sort({ created_at: -1 }).exec(callback);
};

//Find All Trip
var findAll = (callback) => {
  TripModel.find({}, callback);
};

//Inser One Trip
var insertOne = (trip, callback) => {
  TripModel.create(trip, callback);
};


exports.findOne = findOne;
exports.find = find;
exports.findAll = findAll;
exports.insertOne = insertOne;
