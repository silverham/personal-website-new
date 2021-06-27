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

var babelify = require('babelify');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

// Check if local config exists.
var fs = require('fs');
if (!fs.existsSync('./config-local.json')) {
  console.log('\x1b[33m', 'You need to rename default.config-local.json to' +
      ' config-local.json and update its content if necessary.', '\x1b[0m');
  process.exit();
}
// Include local config.
var configLocal = require('./config-local.json');

// Config.
const destination = '../build/web/themes/custom/josh_front/assets';

// A. --------------------------------------------------------.
// Helper tasks.
// A. --------------------------------------------------------.
// SASS/CSS.
gulp.task('compile-sass', function (done) {
  gulp.src('./src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destination + '/css'))
    .pipe(browserSync.reload({ stream: true, match: '**/*.css' }));
  done();
});

// JS.
gulp.task('compile-js', function (done) {
	// @codingStandardsIgnoreStart
	// No extra module requiring code - just es6 code.
  //gulp.src('./src/js/**/*.js')
  //  .pipe(babel())
  //  .pipe(gulp.dest(destination + '/js'));
  // @codingStandardsIgnoreEnd
  return browserify(
    "./src/js/main.js",
    {
      debug:true
    }
  )
  .transform(babelify, {
    // Presents are merged from `.babelrc`.
    sourceMaps: true
  })
  .bundle()
  .pipe(source("main.js"))
  // Create source map.
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('.'))
  // Create source map - END.
  .pipe(gulp.dest(destination + '/js'))
  .pipe(browserSync.reload({ stream: true, match: '**/*.js' }))
  .pipe(notify({message: 'Rebuild all custom scripts. Please refresh your browser', onLast: true}));

  done();
});

// Watch.
gulp.task('watch', function (done) {
  console.log('Started watching...');
  gulp.watch(['./src/scss/**/*.scss'], gulp.series('compile-sass'));
  gulp.watch(['./src/js/**/*.js'], gulp.series('compile-js'));
  done();
});

// Clean.
gulp.task('clean', (done) => {
  del.sync(
    [
    path.join(destination, '**'),
    '!' + path.join(destination),
    '!' + path.join(destination, 'bootstrap'),
    '!' + path.join(destination, 'ckeditor'),
    '!' + path.join(destination, 'images')
    ],
    {'force':true}
  );
  done();
});

// BrowserSync settings.
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: configLocal.browserSyncProxy,
    port: configLocal.browserSyncPort,
    listen: configLocal.browserSyncHost,
  });
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
  gulp.parallel(
    'watch',
    'browserSync'
  )
));

// Build - no watch.
gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'compile-sass',
    'compile-js'
  ),
));
