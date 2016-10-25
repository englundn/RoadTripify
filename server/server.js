var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var db = require('./dbConfig');
var app = express();

//=============================================
//Passport for spotify

var appKey = '85ae76edc4bc4a28b1338939c31bf2a4';
var appSecret = '26e3cd2de61f4c17a2c8c07658885f40';

passport.serializeUser(function(user, done) {
  console.log('====', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SpotifyStrategy({
  clientID: appKey,
  clientSecret: appSecret,
  callbackURL: 'http://localhost:8888/callback'
},
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's spotify profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the spotify account with a user record in your database,
      // and return that user instead.
      console.log(accessToken);
      return done(null, profile);
    });
  }));

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


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/login', function(req, res) {
  res.render('login');
});


// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this application at /auth/spotify/callback
app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'playlist-modify', 'playlist-modify-private'], showDialog: true}),
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


