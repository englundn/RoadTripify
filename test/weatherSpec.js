var weatherRequest = require('../src/mixins/weatherRequest.js');
var testDate = new Date();

var roundDate = new Date();
roundDate.setHours(roundDate.getHours() + Math.round(roundDate.getMinutes() / 60));
if (roundDate.getMinutes() < 30) {
  roundDate.setHours(roundDate.getHours() + 1);
}
roundDate.setMinutes(0);
roundDate.setSeconds(0);
roundDate.setMilliseconds(0);

console.log(testDate, roundDate);

describe('Weather Request', function() {
  it('Should generate the forecast for the closest time', function(done) {
    weatherRequest('37.7836966', '-122.4111551', testDate, function(results) { 
      console.log('results date', new Date(results.weather.DateTime), 'rounddate', roundDate);
      expect(new Date(results.weather.DateTime)).to.eql(roundDate);
      done();
    });
  });

  it('Should not modify the coordinate inputs', function(done) {
    weatherRequest('37.7836966', '-122.4111551', testDate, function(results) { 
      expect(results.latitude).to.equal('37.7836966');
      expect(results.longitude).to.equal('-122.4111551');
      expect(results.time).to.eql(testDate);
      done();
    });
  });

  it('Should return a weather forecast', function(done) {
    weatherRequest('37.7836966', '-122.4111551', testDate, function(results) { 
      expect(results.weather.Temperature).to.exist;
      done();
    });
  });

});