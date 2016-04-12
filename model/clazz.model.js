(function() {
    'use strict';

    var mongoose = require('mongoose');

    module.exports = mongoose.model('Clazz', new mongoose.Schema({
        'start': {
            type: Date,
            required: true
        },
        'end': {
            type: Date,
            required: true
        },
        'title': {
            type: String,
            required: true
        }, 'type': {
            type: String,
            required: true
        },
        'student': {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        'user': {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        'ativo': {
            type: Boolean,
            default: false
        }
    }));
}());