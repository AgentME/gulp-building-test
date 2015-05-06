'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var sourcemaps = require('gulp-sourcemaps');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

var shouldMinify = false;

gulp.task('bad', function() {
  var destname = 'bad.js';

  return browserify({
    entries: ['./src/entry.js'],
    debug: true
  })
    .bundle()
    .pipe(source(destname))
    .pipe(addsrc.prepend(['src/header.js']))
    .pipe(streamify(
      sourcemaps.init({loadMaps: true})
        .pipe(concat(destname, {newLine: ';\n'}))
        .pipe(gulpif(shouldMinify, uglify({
          compress: false,
          preserveComments: 'some'
        })))
        .pipe(sourcemaps.write(null))
    ))
    .pipe(gulp.dest('out/'));
});

gulp.task('good', function() {
  var destname = 'good.js';

  return browserify({
    entries: ['./src/entry.js'],
    debug: true
  })
    .bundle()
    .pipe(source(destname))
    .pipe(addsrc.prepend(['src/header.js']))
    .pipe(streamify(
      sourcemaps.init({loadMaps: true})
        .pipe(concat(destname, {newLine: ';\n'}))
      ))
    .pipe(streamify(
      gulpif(shouldMinify, uglify({
        compress: false,
        preserveComments: 'some'
      }))
        .pipe(sourcemaps.write(null))
    ))
    .pipe(gulp.dest('out/'));
});
