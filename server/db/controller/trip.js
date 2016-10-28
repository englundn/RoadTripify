var TripModel = require('../model/trip');

//Find One Trip by condition
function findOne(id, callback) {
  TripModel.findOne({id: id}, callback);
}

function find(parameter, callback) {
  TripModel.find(parameter).sort({ created_at: -1 }).exec(callback);
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
exports.find = find;
exports.findAll = findAll;
exports.insertOne = insertOne;
