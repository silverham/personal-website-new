/**
 * @file
 * The Gulp file.
 */

'use strict';

// Including plugins.
var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var path = require('path');
var del = require('del');

// Config.
const destination = '../build/web/themes/josh_theme/assets';

// A. --------------------------------------------------------.
// Helper tasks.
// A. --------------------------------------------------------.
// SASS/CSS.
gulp.task('compile-sass', function (done) {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(destination + '/css'));
  done();
});

// JS.
gulp.task('compile-js', function (done) {
  gulp.src('./src/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(destination + '/js'));
  done();
});

// Watch.
gulp.task('watch', function (done) {
  console.log('Started watching...');
  gulp.watch(['./src/scss/**/*.scss'], gulp.series('compile-sass'));
  gulp.watch(['./src/js/*.js'], gulp.series('compile-js'));
  done();
});

// Clean.
gulp.task('clean', (done) => {
  del.sync(
    [path.join(destination)],
    {'force':true}
  );
  done();
});

// A. --------------------------------------------------------.
// Top level tasks.
// A. --------------------------------------------------------.
// Default task.
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel(
    'compile-sass',
    'compile-js'
  ),
  'watch'
));

// Build - no watch.
gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'compile-sass',
    'compile-js'
  ),
));
