var spotifyRequest = require('../src/mixins/spotifyRequest.js');

var accessToken = require('../src/config/apiKeys').spotifyAccessToken;
var userId = '12160219974';
var playlistName = 'Test Playlist';
var isPlaylistPublic = false;
var playlistId;
var songUriArray = ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh', 'spotify:track:1301WleyT98MSxVHPZCA6M'];


describe('Spotify Request', function() {
  it('Should create a new playlist', function(done) {
    spotifyRequest.makeNewPlaylist(userId, accessToken, playlistName, isPlaylistPublic, function(error, results) { 
      expect(error).to.eql(null);
      expect(results.type).to.eql('playlist');
      playlistId = results.id;
      done();
    });
  });

  it('Should add songs to a playlist', function(done) {
    spotifyRequest.addSongsToPlaylist(userId, accessToken, playlistId, songUriArray, function(error, results) { 
      expect(error).to.eql(null);
      expect(results.snapshot_id).to.exist;
      done();
    });
  });

  it('Should return the songs inside a playlist', function(done) {
    spotifyRequest.getSongsFromPlaylist(userId, accessToken, playlistId, function(error, results) { 
      expect(error).to.eql(null);
      expect(results.total).to.eql(2);
      expect(results.items[0].track.name).to.eql('Prelude for Piano No. 11 in F-Sharp Minor');
      expect(results.items[1].track.name).to.eql('Sonata No. 2, Op. 35, in B-Flat Minor: Grave; Doppio movimento');
      done();
    });
  });

  it('Should delete a playlist', function(done) {
    spotifyRequest.deletePlaylist(userId, accessToken, playlistId, function(error, results) { 
      expect(error).to.eql(null);
      done();
    });
  });
});