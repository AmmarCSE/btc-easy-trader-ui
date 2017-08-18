const gulp = require('gulp');
const webpack = require('webpack-stream');
const protractor = require("gulp-protractor").protractor;

gulp.task('test', function() {
  return gulp.src(['src/**/*.spec.js'])
    .pipe(protractor({
        configFile: "conf.js"
    }));
});
