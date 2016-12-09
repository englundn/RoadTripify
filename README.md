[![Stories in Ready](https://badge.waffle.io/IndecipherableSuggestions/IndecipherableSuggestions.png?label=ready&title=Ready)](https://waffle.io/IndecipherableSuggestions/IndecipherableSuggestions)
# RoadTripify

## Team

  - __Product Owner__: Nick
  - __Scrum Master__: Andrew
  - __Development Team Members__: Steve, Charlotte

## Table of Contents

1. [Screenshots](#Screenshots)
1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Screenshots

![Alt text](/src/img/search.png?raw=true)
![Alt text](/src/img/history.png?raw=true)

## Usage

- Log in directly with your Spotify account
- Type in a starting location or 'Use My Location' and a destination
- Click 'Preview Trip' to display driving directions and generate a Spotify playlist
- If you don't like the playlist, click 'New Playlist' to make a new one for the same route
- Once you like the playlist, type in a name for the trip and click 'Save Trip'
- To view your saved trips, go to the 'History' page
- Click on a trip to view its playlist and the option of deleting it

## Software Stack

- MongoDB
- Express.js
- React.js
- Node.js

## Dependencies
- Passport
- Mongoose

## Development Dependencies

- Babel
- Chai
- Gulb
- Mocha
- Nodemon
- Webpack

## Development

### Installing Dependencies

From within the root directory:
```sh
npm install
```
### Building dist files with webpack and starting mongoDB and node server

Front end:
```sh
npm run dev
```
Back end:
```sh
npm run build
npm start
```
Make a copy of apiKeys.example.js, name it apiKeys.js, and add Google Maps and AccuWeather API keys.

To populate mongoDB with archived playlists:
```sh
mongod
```
Visit website at localhost:8888
Log in with Spotify
A Spotify access token will be logged to the console window where the server is running
Copy it and paste it into src/config/apiKeys.js
```sh
node server/db/populateMoodDB.js
```

### Roadmap

View the project roadmap [here](https://github.com/IndecipherableSuggestions/RoadTripify/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
