"use strict";
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    rename = require('gulp-rename');

var source = {
    css: {
        bundle: './core/styles/bundle.css'
    },
    js: {
        view: {
            chat: './core/frontend/views/chat.js',
            sign: './core/frontend/views/sign.js'
        },
        main: './core/frontend/main.js',
        jquery: './bower_components/jquery/dist/jquery/dist/jquery.min.js'
    }
};

var destination = {
    css: './app/style',
    js: './app/js'
};

gulp.task('default', function () {
    gulp.start([
        'wcss',
        'wjs'
    ]);
});

// CSS
gulp.task('css', function () {
    gulp.src([
        source.css.bundle
    ])
        //.pipe(concat())
        .pipe(minify())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(destination.css));
});
gulp.task('wcss', function () {
    gulp.start([
        'css'
    ]);

    gulp.watch([
        source.css.bundle
    ], ['css']);
});
///////////////////////////////////////////

// MAIN JS
gulp.task('js', function () {
    gulp.src([
        source.js.jquery,
        source.js.main
    ])
        .pipe(concat("script.min.js"))
        .pipe(uglify())
        .pipe(rename())
        .pipe(gulp.dest(destination.js));
});
gulp.task("wjs", function () {
    gulp.start([
        'js'
    ]);

    gulp.watch([
        source.js.main
    ], ["js"]);
});
///////////////////////////////////////////
