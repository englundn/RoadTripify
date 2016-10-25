var mongoose = require('mongoose');
var request = require('request');
//we can change roadtripify, I just put that in for now
mongoose.connect('mongodb://localhost/roadtripify');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo db');
});

//only run this when we need to populate the spotify mood playlist database
var populateSavedPlaylist = true;

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
  //spotify:user:spotify:playlist:1KuPMhQ4z7oIq3zdQEZP0V
  var playlistUris = {
    '1KuPMhQ4z7oIq3zdQEZP0V': 'Soak Up The Sun', /* beachy vibes */
    '2gtr2Tf686zXqjQNiYNPQW': 'Autumn Leaves', /* rainy day fall vibes */
    '5eSMIpsnkXJhXEPyRQCTSc': 'Life Sucks', /* bad day vibes */
    '16BpjqQV1Ey0HeDueNDSYz': 'Afternoon Acoustic', /* self-explanatory */
    '7jyyxDxMmtNs1UeLEOpJcE': 'Songs for Sunsets',
    '6uTuhSs7qiEPfCI3QDHXsL': 'Mood Booster' /* happy songs */
  };

  for (var plist in playlistUris) {
    console.log()
    var options = {
      method: 'GET', 
      url: 'https://api.spotify.com/v1/users/spotify/playlists/' + plist + '/tracks', 
      headers: {
        'Authorization': 'Bearer BQD_aMwvMnVyLec3JxzOomTIAXqO_uAbv97h7QZDPg8-8N1zGfwWlJqTVmKhALVKNhDRZynK4hRtWGbsUMy8fQWeLrFrrrbxRrHYk2m8OodfTrGslOoAyXOd_9qW3Wk0vMzIM2WCDk1ZF9tsxL61zw_KPY8UYqTR4_6KrIVOU-dfbAvbJGmY963Xgpl9vbnf-SYvIRzUs0nIsTR1OyD_t0mTK_Q59O5gRwD_WBZK_AeOoccC-fQ'
      }
    };
    request(options, function(error, response, body) {
      if (error) {
        console.log(error);
      } else if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        var uris = [];
        for (var i = 0; i < info.items.length; i++ ) {
          uris.push(info.items[i].track.uri);
          //console.log('uri 1 is ', info.items[0].track.uri);          
        }
        var uri = info.href.split('/')[info.href.split('/').length - 2];
        // console.log(uri, playlistUris[uri]);
        console.log(uri, ' ', playlistUris[uri], ' ', uris);

        new exports.SavedPlaylist({
          playlist_name:  playlistUris[uri],
          playlist_id: uri,
          uri_array: JSON.stringify(uris)})
        .save().then(function(entry) {
          console.log('saved to database ', entry);
        });
      }
    });    
  }
}