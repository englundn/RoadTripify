var mongoose = require('mongoose');
var request = require('request');
var db = require('./dbConfig');

var playlistUris = {
  '1KuPMhQ4z7oIq3zdQEZP0V': 'Soak Up The Sun', /* beachy vibes */
  '2gtr2Tf686zXqjQNiYNPQW': 'Autumn Leaves', /* rainy day fall vibes */
  '5eSMIpsnkXJhXEPyRQCTSc': 'Life Sucks', /* bad day vibes */
  '16BpjqQV1Ey0HeDueNDSYz': 'Afternoon Acoustic', /* self-explanatory */
  '7jyyxDxMmtNs1UeLEOpJcE': 'Songs for Sunsets',
  '6uTuhSs7qiEPfCI3QDHXsL': 'Mood Booster' /* happy songs */
};

for (var plist in playlistUris) {
  var options = {
    method: 'GET', 
    url: 'https://api.spotify.com/v1/users/spotify/playlists/' + plist + '/tracks', 
    headers: {
      /* will have to change the access token when it expires */
      'Authorization': 'Bearer BQAgZOkT4r4UXEgafGLTXpnWwtbzaiuO3fNaxBGNeFoPaYWNiVX3mCYDNALjbGwnaIefBPGvVt690wdI6A5XBzj-T2vsUG2j6VxD4weS9ZmNgooL2MOB817EdrtaalCu-14u340OHwdtAlMfv1aTziPd51CxH_oCPvVqAqmWZFZAnHtABiCK_658zJ0D225t2u8JlD8z3QnaJG2rZFxWeL-y1RQ8Q2zVu7Zw3HXBRCYSwX1Lo60'
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
      }
      var uri = info.href.split('/')[info.href.split('/').length - 2];
      // console.log(uri, ' ', playlistUris[uri], ' ', uris);

      new db.SavedPlaylist({
        playlist_name:  playlistUris[uri],
        playlist_id: uri,
        uri_array: JSON.stringify(uris)})
      .save().then(function(entry) {
        console.log('saved to database ', entry);
      });
    }
  });    
}