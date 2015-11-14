"use strict";
var gulp = require('gulp'),
    gulpConcat = require('gulp-concat'),
    gulpUglify = require('gulp-uglify'),
    gulpRename = require('gulp-rename');

gulp.task('default', function () {
    gulp.start('bundle');
    gulp.watch('core/*.js', ['bundle']);
});

gulp.task('bundle', function () {
    gulp.src(['bower_components/jquery/dist/jquery.js', 'core/*.js'])
        .pipe(gulpConcat('bundle.js'))
        .pipe(gulp.dest('app/'))
        .pipe(gulpUglify())
        .pipe(gulpRename('bundle.min.js'))
        .pipe(gulp.dest('app/'))
});