"use strict";
var gulp = require('gulp'),
    gulpConcat = require('gulp-concat'),
    gulpUglify = require('gulp-uglify'),
    gulpMinify = require('gulp-minify-css'),
    gulpRename = require('gulp-rename');

gulp.task('default', function () {
    gulp.start(['bundle', 'css']);
    gulp.watch('core/*.js', ['bundle']);
    gulp.watch('core/*.css', ['css']);
});

gulp.task('bundle', function () {
    gulp.src(['bower_components/jquery/dist/jquery.js', 'core/*.js'])
        .pipe(gulpConcat('bundle.js'))
        .pipe(gulp.dest('app/'))
        .pipe(gulpUglify())
        .pipe(gulpRename('bundle.min.js'))
        .pipe(gulp.dest('app/'));
});

gulp.task('css', function () {
    gulp.src('core/*.css')
        .pipe(gulpConcat('bundle.css'))
        .pipe(gulp.dest('app/'))
        .pipe(gulpMinify())
        .pipe(gulpRename('bundle.min.css'))
        .pipe(gulp.dest('app/'))
});