(function() {
   'use strict';

    var mongoose = require('mongoose');
	var encrypt = require('mongoose-encryption');
	var config = require('../config/env.config')[process.env.NODE_ENV || 'development'];

    var schema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: {
                unique: true
            }
        },
        password: {
            type: String,
            required: true,
			select: false
        },
        cnpj: {
            type: String,
            required: true,
            unique: true,
            index: {
                unique: true
            }
        },
        company: {
            type: String,
            required: true,
        },
        about: {
            type: String
        },
        address: {
            type: String
        },
        neighborhood: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        cep: {
            type: String
        },
        confirmado: {
            type: Boolean,
            default: true
        }
    }, {
		password: false
	});
	
	// schema.plugin(encrypt, { key: config.secret, fields: ['password'] });
	
    module.exports = mongoose.model('User', schema);
}());