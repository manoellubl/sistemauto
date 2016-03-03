(function() {
    'use strict';

    var mongoose = require('mongoose');
    var config = require('../config/env.config')[process.env.NODE_ENV || 'development'];

    var schema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        arquivado: {
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
        dataNascimento: {
            type: Date
        },
        email: {
            type: String
        },
        tipoHabilitacao: {
            type: String
        },
        situacao: {
            type: String
        },
        endereco: {
            type: String
        },
        valor: {
            type: Number
        }
    });

    module.exports = mongoose.model('Student', schema);
}());