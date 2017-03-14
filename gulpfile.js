var gulp = require('gulp');
var to5 = require('gulp-6to5');

var less = require('gulp-less')
var concat = require('gulp-concat')
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')

/*
For server-side rendering of React and Redux
*/

// Convert ES6 to ES5
gulp.task('es6-es5', function() {
  return gulp.src([
    './src/serverapp.js',
    './src/*/**.js',
    './src/*/*/**.js'
  ])
  .pipe(to5())
  .pipe(gulp.dest('./public/build/es5')) // React code for server
});

// Re-run when a file is updated
gulp.task('watch', function() {
  gulp.watch([
    './src/serverapp.js',
    './src/*/**.js',
    './src/*/*/**.js'
  ], [
    'es6-es5'
  ])
});

// Default task
gulp.task('default', [
  'es6-es5',
  'watch'
], function(){});
