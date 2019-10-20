const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrpypt = require('bcryptjs');
const User = require('../../models/User');

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({username}, (err, user) => {
            if (err) {
                return done(err, null, 'Something went wrong');
            }

            if (!user) {
                return done(null, false, 'User Not Found');
            }

            bcrpypt.compare(password, user.password, (err, res) => {
                if (res) {
                    // req.user
                    return done(null, user, 'Successfully Logged In');
                }

                return done(null, false, 'Incorrect Password');
            });
        })
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });