(function() {
   'use strict';

    var mongoose = require('mongoose');

    var user = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        }
    });

    module.exports = mongoose.model('User', user);
}());