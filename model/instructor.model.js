(function() {
    'use strict';

    var mongoose = require('mongoose');
    var config = require('../config/env.config')[process.env.NODE_ENV || 'development'];

    var schema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        status: { //indica se o professor esta ativo
          type: Boolean,
          default: false
        },
        cpf: {
            type: Number,
            required: true,
            unique: true
        },
        rg: {
            type: Number,
            required: true,
            unique: true
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        cep: {
            type: Number
        },
        dateOfBirth: {
            type: Date
        },
        email: {
            type: String
        },
        cnhType: {
            type: String
        },
        address: {
            type: String
        }
    });

    module.exports = mongoose.model('Instructor', schema);
}());