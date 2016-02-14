(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
	var cors = require('cors');
    var enrouten = require('express-enrouten');

    var app = express();

    var config = require('./config/env.config.json')[process.env.NODE_ENV || 'development'];
    var db = require('./config/db.config');
    db.init(config.MONGO_URI);

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());

    app.use(cors());

	app.set('port', process.env.PORT  || config.PORT);

	app.set('views', path.join(__dirname, 'view'));
	app.engine('html', require('ejs').renderFile);

	app.set('view engine', 'html');

	app.use(express.static(path.join(__dirname, 'public')));

    global.rootRequire = function(name) {
        return require(__dirname + '/' + name);
    };

	app.use(enrouten({
		'directory': 'controller',
		'index': 'controller'
	}));

    app.use(function(error, request, response, next) {
        response.status(error.status || 400);
        response.json({
            message: error.message
        });
    });

    var server = app.listen(app.get('port'), function () {
		console.log('Running the server at', server.address().port);
    });

    module.exports = app;
}());