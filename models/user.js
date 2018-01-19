const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

let userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

module.exports.getUserByUsername = (userName, callback) => {
    User.findOne({username: userName}, callback);
};

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log(`Eroare`, err);
                // throw new Error(`Eroare adaugare user`);
            }
            newUser.password = hash;
            newUser.save(callback)
        })
    });
};