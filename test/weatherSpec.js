describe('Weather Request', function() {
  it('Should generate the forecast for the closest time', function(done) {
    weatherRequest('37.7836966', '-122.4111551', new Date('10-24-2016 17:48:00'), function(results) { 
      expect(new Date(results.weather.DateTime)).to.eql(new Date('10-24-2016 18:00:00'));
      done();
    });
  });

  it('Should not modify the coordinate inputs', function(done) {
    weatherRequest('37.7836966', '-122.4111551', new Date('10-24-2016 17:48:00'), function(results) { 
      expect(results.latitude).to.equal('37.7836966');
      expect(results.longitude).to.equal('-122.4111551');
      expect(results.time).to.eql(new Date('10-24-2016 17:48:00'));
      done();
    });
  });

  it('Should return a weather forecast', function(done) {
    weatherRequest('37.7836966', '-122.4111551', new Date('10-24-2016 17:48:00'), function(results) { 
      expect(results.weather.Temperature).to.exist;
      done();
    });
  });

});