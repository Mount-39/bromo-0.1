"use strict";
var gulp            = require('gulp');
var rename          = require('gulp-rename');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var minify          = require('gulp-minify-css');

var source = {
    css: {
        bundle: './css/bundle.css'
    },
    js: {
        view: {
            chat: './app/views/chatView.js',
            sign: './app/views/signView.js'
        },
        core: './app/app.js',
        jquery: './bower_components/jquery/dist/jquery.js'
    }
};

var destination = {
    css: './public/css',
    js: './public/js'
};

gulp.task('default', function () {
    gulp.start([
        'wcss',
        'wjs',
        'wview'
    ]);
});

// CSS
gulp.task('css', function () {
    gulp.src([
        source.css.bundle
    ])
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(destination.css))
        .pipe(rename("styles.min.css"))
        .pipe(minify())
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
        source.js.core
    ])
        .pipe(concat("script.js"))
        .pipe(gulp.dest(destination.js))
        .pipe(rename("script.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(destination.js));
});
gulp.task("wjs", function () {
    gulp.start([
        'js'
    ]);

    gulp.watch([
        source.js.core
    ], ["js"]);
});
///////////////////////////////////////////

// VIEW JS
gulp.task('view', function () {
    gulp.src([
        source.js.view.sign,
        source.js.view.chat
    ])
        .pipe(concat('view.js'))
        .pipe(gulp.dest(destination.js))
        .pipe(rename('view.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destination.js));
});
gulp.task('wview', function () {
    gulp.start([
        'view'
    ]);
    gulp.watch([
        source.js.view.sign,
        source.js.view.chat
    ], [ 'view' ]);
});
///////////////////////////////////////////