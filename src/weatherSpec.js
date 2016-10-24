var expect = chai.expect;

describe('Weather Request', function() {
  weatherRequest('37.7836966', '-122.4111551', new Date('10-24-2016 17:48:00'), function(results) { 
    console.log('results!!!!!!', results);
    it('Should generate the forecast for the closest time', function() {
      expect(results.time).to.eql(new Date('10-24-2016 18:00:00'));
    });
    it('Should not modify the coordinate inputs', function() {
      expect(results.latitude).to.equal('37.7836966');
      expect(results.longitude).to.equal('-122.4111551');
    });
    // it('Should return a weather forecast', function() {
    //   expect(results.latitude).to.equal('37.7836966');
    //   expect(results.longitude).to.equal('-122.4111551');
    // });
  });
});