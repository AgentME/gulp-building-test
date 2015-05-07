'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('bad', function() {
  var destname = 'bad.js';

  return browserify({
    entries: ['./src/entry.js'],
    debug: true
  })
    .bundle()
    .pipe(source(destname))
    .pipe(streamify(
      sourcemaps.init({loadMaps: true})
        .pipe(uglify({compress: true}))
        .pipe(sourcemaps.write('.'))
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
    .pipe(streamify(sourcemaps.init({loadMaps: true})))
    .pipe(streamify(uglify({compress: true})))
    .pipe(streamify(sourcemaps.write('.')))
    .pipe(gulp.dest('out/'));
});
