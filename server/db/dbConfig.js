var mongoose = require('mongoose');
var request = require('request');
//we can change roadtripify, I just put that in for now
mongoose.connect('mongodb://localhost/roadtripify');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo db');
});

