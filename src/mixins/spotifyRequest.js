var APImixin = require('./APImixin');
var postApi = APImixin.postApi;
var getApi = APImixin.getApi;
var callback = (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Success!');
    return data;
  }
};

module.exports = {

  makeNewPlaylist: (userId, accessToken, playlistName, isPlaylistPublic, callback) => {
  //Generate an empty playlist in the user's Spotify account
  //Example inputs: 
  // var accessToken = 'BQA3dhtc591rMjLqNWz0Z2yEx28r4axd55twLXEEtL6aTw5FePlgitv-Wk9nehGCizMmP78J2jXZ_-FaFMvGH-A7PZr27WvljPNqGI9h0a6I6oKibARkmWsXsQY6zGOiICB9cGomL8_WvhW_m2jEQOS2oBTxYWqk4iISWerCOU_HqSJnx7Tn7HhskieMidO_jod4WAkOeX1DdIW3u4mXvtPDKRxsMC1NIoOE8UustDsNj3GaVL0O';
  // var userId = '12160219974';
  // var playlistName = 'Test Playlist';
  // var isPlaylistPublic = false;


    var url = 'https://api.spotify.com/v1/users/' + userId + '/playlists';
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    };
    var parameters = JSON.stringify({
      name: playlistName,
      public: isPlaylistPublic
    });
    postApi(url, headers, parameters, callback);

  },

  addSongsToPlaylist: (userId, accessToken, playlistId, songUriArray, callback) => {
  //Populate the playlist with selected songs
  //Example inputs:
  // var accessToken = 'BQA3dhtc591rMjLqNWz0Z2yEx28r4axd55twLXEEtL6aTw5FePlgitv-Wk9nehGCizMmP78J2jXZ_-FaFMvGH-A7PZr27WvljPNqGI9h0a6I6oKibARkmWsXsQY6zGOiICB9cGomL8_WvhW_m2jEQOS2oBTxYWqk4iISWerCOU_HqSJnx7Tn7HhskieMidO_jod4WAkOeX1DdIW3u4mXvtPDKRxsMC1NIoOE8UustDsNj3GaVL0O';
  // var userId = '12160219974';
  // var playlistId = '7oi0w0SLbJ4YyjrOxhZbUv';
  // var songUriArray = ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]; 
    var url = 'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks';
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    };
    var parameters = JSON.stringify({
      'uris': songUriArray
    });
    postApi(url, headers, parameters, callback);
  },

  getSongsFromPlaylist: (userId, accessToken, playlistId, callback) => {
  //Retrieve all the songs from a specified playlist

  //Example inputs:
  // var accessToken = 'BQA3dhtc591rMjLqNWz0Z2yEx28r4axd55twLXEEtL6aTw5FePlgitv-Wk9nehGCizMmP78J2jXZ_-FaFMvGH-A7PZr27WvljPNqGI9h0a6I6oKibARkmWsXsQY6zGOiICB9cGomL8_WvhW_m2jEQOS2oBTxYWqk4iISWerCOU_HqSJnx7Tn7HhskieMidO_jod4WAkOeX1DdIW3u4mXvtPDKRxsMC1NIoOE8UustDsNj3GaVL0O';
  // var userId = '12160219974';
  // var playlistId = '7oi0w0SLbJ4YyjrOxhZbUv';

  //Example output:
  //
    var url = 'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks';
    var headers = {
      'Authorization': 'Bearer ' + accessToken,
    };
    getApi(url, headers, callback);
  }
};