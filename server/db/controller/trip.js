var TripModel = require('../model/trip');

//Find One Trip by condition
function findOne(id, callback) {
  TripModel.find({id: id}, callback);
}

//Find All Trip
function findAll(callback) {
  TripModel.find({}, callback);
}

//Inser One Trip
function insertOne(trip, callback) {
  TripModel.create(trip, callback);
}


exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
