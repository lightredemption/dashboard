'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

gulp.task(`scss`, () => {
  return gulp.src(`src/scss/*.scss`)
  .pipe(sass.sync().on(`error`, sass.logError))
  .pipe(gulp.dest(`public/css/`));
});

gulp.task(`js`, () => {
  return gulp.src([`src/app.js`, `src/components/*.js`, `src/controllers/*.js`])
  .pipe(babel({
    presets: [`es2015`]
  }))
  .pipe(gulp.dest(`public/js`));
});

gulp.task(`watch`, () => {
  gulp.watch(`src/app.js`, `src/components/*.js`, `src/controllers/*.js`, [`js`]);
  gulp.watch(`src/scss/*.scss`, [`scss`]);
})

gulp.task('default', [`scss`, `js`]);
