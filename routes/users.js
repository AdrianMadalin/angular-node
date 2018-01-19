const app = require('express');
const router = app.Router();
const User = require('./../models/user');
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

router.get('/authenticate', (req, res) => {
    res.send('authenticate')
});

router.get('/profile', (req, res) => {
    res.send('profile')
});

router.get('/validate', (req, res) => {
    res.send('validate')
});

module.exports = router;