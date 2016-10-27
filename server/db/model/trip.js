var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tripSchema = new Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  trip_name: String,
  playlist_uri: String,
  start_latitude: String,
  start_longitude: String,
  start_address: String,
  end_latitude: String,
  end_longitude: String,
  end_address: String
  }, { timestamps: { createdAt: 'created_at' } });

var TripModel = mongoose.model('Trip', tripSchema);

module.exports = TripModel;