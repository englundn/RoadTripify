var UserModel = require('../model/user');

//Find One User by condition
function findOne(parameter, callback) {
  UserModel.findOne(parameter, callback);
}

//Find All Users
function findAll(callback) {
  UserModel.find({}, callback);
}

//Inser One User
function insertOne(user, callback) {
  UserModel.create(user, callback);
}


exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
