var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var db = require('./db/dbConfig');
var Trip = require('./db/controller/trip');
var User = require('./db/controller/user');
var SavedPlaylist = require('./db/controller/savedPlaylist');
var app = express();

//=============================================
//Express Session

app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));

//=============================================

//=============================================
//Passport for spotify

var appKey = '85ae76edc4bc4a28b1338939c31bf2a4';
var appSecret = '26e3cd2de61f4c17a2c8c07658885f40';
var spotifyAccessToken = '';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: process.env.CALLBACK || 'http://localhost:8888/callback'
},
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's spotify profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the spotify account with a user record in your database,
      // and return that user instead.
      console.log(accessToken);
      spotifyAccessToken = accessToken;
      return done(null, profile);
    });
  }));

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};

app.use(passport.initialize());
app.use(passport.session());

//=============================================

app.use(express.static(path.join(__dirname, '../dist')));
app.set('views', path.join(__dirname, '../dist/view'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', 
  ensureAuthenticated, 
  function(req, res) {
    res.render('index');
  }
);

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/search', 
  ensureAuthenticated,
  function(req, res) {
    res.render('search');
  }
);

app.get('/history', 
  ensureAuthenticated,
  function(req, res) {
    res.render('history');
  }
);

app.get('/api/user', function(req, res) {
  if (req.session.passport && req.session.passport.user) {
    res.send({result: {
      username: req.session.passport.user.username,
      accessToken: spotifyAccessToken
    }});
  } else {
    res.send({result: 'error'});
  }
});

app.get('/api/history', function(req, res) {
  Trip.findAll(function(err, data) {

  });
});

app.post('/api/trip', function(req, res) {
  var trip = {
    user_id: req.session.passport.user_id,
    trip_name: req.body.tripname,
    playlist_uri: 'test',
    start_latitude: req.body.start_latitude,
    start_longitude: req.body.start_longitude,
    start_addresss: req.body.start_addresss,
    end_latitude: req.body.end_latitude,
    end_longitude: req.body.end_longitude,
    end_address: req.body.end_address
  };

  Trip.insertOne(trip, function(err, data) {
    console.log(data);
  });
  res.send({result: 'success'});
});

app.post('/api/savedplaylists', function(req, res) {
  console.log(req.body);
  SavedPlaylist.findOne(req.body.name, function(err, data) {
    if (err) {
      console.log(err);
    }
    //console.log(JSON.stringify(JSON.parse(data.uri_array)));
    res.send(JSON.stringify(JSON.parse(data.uri_array)));
  });
});

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private'], showDialog: true}),
  function(req, res) {
// The request will be redirected to spotify for authentication, so this
// function will not be called.
  });

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    User.findOne({ username: req.session.passport.user.username }, function(err, data) {
      if (!data) {
        User.insertOne({ username: req.session.passport.user.username }, function(err, data2) {
          req.session.progress.user_id = data2._id;
          req.session.save();
        });
      } else {
        req.session.passport.user_id = data._id;
        req.session.save();
      }
    });

    res.redirect('/');
  });

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});




var port = process.env.PORT || 8888;

app.listen(port, function() {
  console.log('Server listening on port ' + port);
});


