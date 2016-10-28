var UserModel = require('../model/user');

//Find One User by condition
var findOne = (parameter, callback) => {
  UserModel.findOne(parameter, callback);
};

//Find All Users
var findAll = (callback) => {
  UserModel.find({}, callback);
};

//Inser One User
var insertOne = (user, callback) => {
  UserModel.create(user, callback);
};


exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
