'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

gulp.task(`scss`, () => {
  return gulp.src(`src/scss/*.scss`)
  .pipe(sass.sync().on(`error`, sass.logError))
  .pipe(gulp.dest(`public/css/`));
});

gulp.task('default', function() {

});
