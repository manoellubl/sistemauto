(function () {
    'use strict';

    var gulp = require('gulp'),
        nodemon = require('gulp-nodemon'),
        watch = require('gulp-watch'),
        jshint = require('gulp-jshint'),
        livereload = require('gulp-livereload'),
        _paths = ['controller/**/*.js', 'model/**/*.js', 'config/**/*.js', 'test/**/*.js'];

    //register nodemon task
    gulp.task('nodemon', function () {
        nodemon({
            script: 'app.js',
            env: {
                'NODE_ENV': 'development'
            }
        })
            .on('restart');
    });

    // Rerun the task when a file changes
    gulp.task('watch', function () {
        livereload.listen();
        gulp.src(_paths, {
            read: false
        })
            .pipe(watch({
                emit: 'all'
            }))
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
        watch(_paths, livereload.changed);
    });

    //lint js files
    gulp.task('lint', function () {
        gulp.src(_paths)
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });

    gulp.paths = {
        src: 'src',
        dist: 'dist',
        tmp: '.tmp',
        e2e: 'e2e'
    };

    require('require-dir')('./gulp');

    gulp.task('client', ['clean'], function () {
        gulp.start('build');
    });

    // The default task (called when you run `gulp` from cli)
    gulp.task('default', ['lint', 'nodemon', 'watch']);
}());