const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
const config = require('./database');


module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        User.getUserById(jwt_payload._id, (err, user9) => {
            if (err) {
                return done(err, false);
            }

            if (user9) {
                return done(null, user9);
            } else {
                return done(null, false);
            }
        });
    }));
};