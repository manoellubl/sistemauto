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
            type: String,
            required: true
        },
        neighborhood: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        cep: {
            type: Number,
            required: true
        },
        birthDate: {
            type: Date,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        cnhType: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    });

    module.exports = mongoose.model('Instructor', schema);
}());