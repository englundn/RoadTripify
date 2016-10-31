//Replace 'INSERT API KEY' with your own API keys.
//spotifyAccessToken is only necessary for testing.
//the accuWeather API has a limited number of API calls per day
//To avoid hitting the limit, we made multiple API keys and use them at random

module.exports = {
  googleMapsApiKey: 'INSERT API KEY',
  accuWeatherApiKey: [
    'INSERT API KEY',
    'INSERT API KEY',
    'INSERT API KEY',
    'INSERT API KEY',
  ][ Math.floor(Math.random() * 4) ],
  spotifyAccessToken: 'INSERT ACCESS TOKEN'
};