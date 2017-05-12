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

// gulp.task('css', function() {
//   return gulp.src(
//     [
//       './src/components/**.scss',
//       './src/components/*/**.scss'
//     ]
//   )
  // .pipe(minifyCSS())
  // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
  // .pipe(concat('style.min.css'))
  // .pipe(gulp.dest('./public/build/css/'))
//   .pipe(gulp.dest('./public/build/es5'))
// })

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
  'watch',
  // 'css'
], function(){});
