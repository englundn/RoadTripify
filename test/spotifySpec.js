var spotifyRequest = require('../src/mixins/spotifyRequest.js');

var accessToken = require('../src/config/apiKeys').spotifyAccessToken;
var userId = '12160219974';
var playlistName = 'Test Playlist';
var isPlaylistPublic = false;

describe('Spotify Request', function() {
  it('Should create a new playlist', function(done) {
    spotifyRequest.makeNewPlaylist(userId, accessToken, playlistName, isPlaylistPublic, function(error, results) { 
      expect(results.type).to.eql('playlist');
      done();
    });
  });

  xit('Should add songs to a playlist', function(done) {
    spotifyRequest('37.7836966', '-122.4111551', new Date('10-24-2016 17:48:00'), function(results) { 
      expect(results.latitude).to.equal('37.7836966');
      expect(results.longitude).to.equal('-122.4111551');
      expect(results.time).to.eql(new Date('10-24-2016 17:48:00'));
      done();
    });
  });

  xit('Should return the songs inside a playlist', function(done) {
    spotifyRequest('37.7836966', '-122.4111551', new Date('10-24-2016 17:48:00'), function(results) { 
      expect(results.weather.Temperature).to.exist;
      done();
    });
  });

});