var mongoose = require('mongoose');
//we can change roadtripify, I just put that in for now
mongoose.connect('mongodb://localhost/roadtripify');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo db');
});

var populateSavedPlaylist = false;

var Schema = mongoose.Schema;
//uri array will be a JSON stringified array of all of the song uris associated with the playlist
var savedPlaylistSchema = new Schema({
  playlist_name:  String,
  playlist_id: String,
  uri_array: String
});

var userSchema = new Schema({
  username:  String,
});

var tripSchema = new Schema({
  username: String,
  trip_name: String,
  playlist_uri: String,
  start_latitude: String,
  start_longitude: String,
  end_latitude: String,
  end_longitude: String
  }, { timestamps: { createdAt: 'created_at' } });

exports.SavedPlaylist = mongoose.model('SavedPlaylist', savedPlaylistSchema);
exports.User = mongoose.model('User', userSchema);
exports.Trip = mongoose.model('Trip', tripSchema);

if (populateSavedPlaylist) {
  //code to populate playlist. Need to figure out how to do this since the requests to the necessary endpoints require 
  //auth
}
