var gulp = require('gulp');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var pleeease = require('gulp-pleeease');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var exec = require('child_process').exec;

// Build OCaml programs
gulp.task('ocaml', function (cb) {
  exec('omake', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

// Convert .pug into .html
gulp.task('pug', () => {
  return gulp
    .src('src/pug/index.pug')
    .pipe(pug())
    .pipe(htmlmin())
    .pipe(gulp.dest('dist'));
});

// Convert .sass into .css
gulp.task('sass', function () {
  return gulp
    .src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(pleeease()) // autoprefixing
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

// Create a bundle of CSS files
gulp.task('bundle-css', ['sass'], function () {
  return gulp
    .src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      'node_modules/c3/c3.min.css',
      'dist/css/**/*.css'
    ])
    .pipe(concat('bundle.min.css'))
    .pipe(cleancss()) // minifying
    .pipe(gulp.dest('dist'));
});

// Create a bundle of JavaScript files
gulp.task('bundle-js', ['ocaml'], function () {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/d3/d3.min.js',
      'node_modules/c3/c3.min.js',
      'src/ocaml/boilerplate.js'
    ])
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['pug', 'bundle-css', 'bundle-js']);

gulp.task('watch', function () {
  gulp.watch('src/pug/**/*.pug', ['pug']);
  gulp.watch('src/sass/**/*.scss', ['bundle-css']);
  gulp.watch('src/ocaml/**/*.ml', ['bundle-js']);
});
