const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

// clientID and clientSecret are provided by facebook when you register your app with them
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:5173/users/auth/facebook/callback",  //this is the route that facebook will redirect to after authentication, !!this route is currently a placeholder and does not work!!
  profileFields: ['id', 'displayName', 'photos', 'email']
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));