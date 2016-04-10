(function() {
    'use strict';

    var mongoose = require('mongoose');

    module.exports = mongoose.model('Clazz', new mongoose.Schema({
        'data': {
            type: Date,
            required: true
        },
        'type': {
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