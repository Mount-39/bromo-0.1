"use strict";
var gulp = require('gulp'),
    gulpConcat = require('gulp-concat'),
    gulpUglify = require('gulp-uglify'),
    gulpMinify = require('gulp-minify-css'),
    gulpRename = require('gulp-rename');

var jsDir      = 'app/js',
    cssDir     = 'app/style';

gulp.task('default', function () {
    gulp.start(['bundle', 'cssBromo', 'cssAtom']);

    gulp.watch('core/*.js', ['bundle']);
    gulp.watch('design/bromo/*.css', ['cssBromo']);
    gulp.watch('design/atom/*.css', ['cssAtom']);
});

gulp.task('bundle', function () {
    gulp.src(['bower_components/jquery/dist/jquery.js', 'core/*.js'])
        .pipe(gulpConcat('bundle.js'))
        .pipe(gulp.dest(jsDir))
        .pipe(gulpUglify())
        .pipe(gulpRename('bundle.min.js'))
        .pipe(gulp.dest(jsDir));
});

gulp.task('cssBromo', function () {
    gulp.src('design/bromo/*.css')
        .pipe(gulpConcat('bundle.css'))
        .pipe(gulp.dest(cssDir))
        .pipe(gulpMinify())
        .pipe(gulpRename('bundle.min.css'))
        .pipe(gulp.dest(cssDir));
});

gulp.task('cssAtom', function () {
    gulp.src('design/atom/*.css')
        .pipe(gulpConcat('atom.css'))
        .pipe(gulp.dest(cssDir))
        .pipe(gulpMinify())
        .pipe(gulpRename('atom.min.css'))
        .pipe(gulp.dest(cssDir));
});