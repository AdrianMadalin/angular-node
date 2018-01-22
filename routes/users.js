const app = require('express');
const router = app.Router();
const configDb = require('../config/database');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/users', (req, res) => {
    res.render('index');
});

router.post('/users/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            console.log(`Eroare`, err);
            res.json({
                success: false,
                message: 'Fail to register',
                error: err
            });
        } else {
            console.log(user);
            res.json({
                success: true,
                message: 'User registered',
                user: user
            });
        }
    });

});

router.post('/users/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            console.log(`Eroare`, err);
            return res.json({
                success: false,
                message: 'Fail to find user',
                error: err
            });
        } else if (!user) {
            return res.json({
                success: false,
                message: 'No user found',
            });
        } else {
            User.comparePassword(password, user.password, (err, isMatched) => {
                if (err) {
                    throw Error(`Error comparing the password`);
                }
                if (isMatched) {
                    const token = jwt.sign(user.toJSON(), configDb.secret, {expiresIn: 60000});
                    return res.json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    });
                } else {
                    return res.json({
                        success: false,
                        message: 'Fail to find user',
                    });
                }
            });
        }
    });
});

router.get('/users/profile', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.send({user: req.user});
});

router.get('/users/validate', (req, res) => {
    res.send('validate')
});

module.exports = router;