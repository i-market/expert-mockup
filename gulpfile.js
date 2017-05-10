var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-ruby-sass');
var server = require('gulp-server-livereload');
var prettify = require('gulp-html-prettify');
var uglifycss = require('gulp-uglifycss');
var tinypng = require('gulp-tinypng-compress');
var flatten = require('gulp-flatten');
var uglify = require('gulp-uglify');

//livereload
gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});
// css
gulp.task('css', function () {
  gulp.src('./css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css'))
});
// sass
gulp.task('sass', function () {
  sass('./css/*.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('./css'))
});
// dist main css
gulp.task('distCss', function () {
  gulp.src('./css/**/*.css')
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(uglifycss())
    .pipe(gulp.dest('./dist/css'))
  gulp.src('./dist/css/*.css')
});
// dist HTML
gulp.task('distHtml', function () {
  gulp.src('./*.html')
    .pipe(prettify({
      indent_char: ' ',
      indent_size: 4
    }))
    .pipe(gulp.dest('./dist'))
});
// dist js
gulp.task('js', function () {
  gulp.src('./js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});
// move
gulp.task('move', function () {
  gulp.src('./fonts/**/*.*')
    .pipe(flatten())
    .pipe(gulp.dest('./dist/fonts'))
  gulp.src('./images/**/*.*')
    .pipe(flatten())
    .pipe(gulp.dest('./dist/images'))
});
//img
gulp.task('tinypng', function () {
  gulp.src('./images/**/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: ''
    }))
    .pipe(gulp.dest('./dist/images'));
});

// watch
gulp.task('watch', function () {
  gulp.watch('./css/*.css', ['css'])
  gulp.watch('./css/*.scss', ['sass'])
});

// dist
gulp.task('dist', ['distCss', 'distHtml', 'js', 'move'])
//img
gulp.task('img', ['tinypng'])
// default
gulp.task('default', ['webserver', 'watch'])
