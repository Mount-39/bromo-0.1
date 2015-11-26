"use strict";
var gulp = require('gulp'),
    gulpConcat = require('gulp-concat'),
    gulpUglify = require('gulp-uglify'),
    gulpMinify = require('gulp-minify-css'),
    gulpRename = require('gulp-rename');

var src = {
    css: {
        bromo: {
            main: './design/bromo/main.css',
            sign: './design/bromo/sign.css'
        }
    },
    js: {
        jquery: './bower_components/jquery/dist/jquery/dist/jquery.min.js',
        main: './core/main.js'
    }
};

var dest = {
    css: './app/style',
    js: './app/js'
};

gulp.task('default', function () {
    gulp.start([
        'js',
        'css'
    ]);

    gulp.watch(src.js.main, 'js');
    gulp.watch([
        src.css.bromo.main,
        src.css.bromo.sign
    ] , 'css');
});

gulp.task('js', function () {
    gulp.src([
        src.js.jquery,
        src.js.main
    ])
        .pipe(gulpConcat('bundle.min.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest(dest.js));
});

gulp.task('css', function () {
    gulp.start([
        'css-main',
        'css-sign'
    ])
});

gulp.task('css-main', function () {
    gulp.src(src.css.bromo.main)
        .pipe(gulpMinify())
        .pipe(gulpRename('main.min.css'))
        .pipe(gulp.dest(dest.css));
});

gulp.task('css-sign', function () {
    gulp.src(src.css.bromo.sign)
        .pipe(gulpMinify())
        .pipe(gulpRename('sign.min.css'))
        .pipe(gulp.dest(dest.css));
});