var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//uri array will be a JSON stringified array of all of the song uris associated with the playlist
var savedPlaylistSchema = new Schema({
  playlist_name:  String,
  playlist_id: String,
  uri_array: String
});

var SavedPlaylistModel = mongoose.model('SavedPlaylist', savedPlaylistSchema);

module.exports = SavedPlaylistModel;