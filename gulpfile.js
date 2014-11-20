var gulp = require('gulp');
var sass = require('gulp-sass') ;
var notify = require("gulp-notify") ;
var bower = require('gulp-bower');

var config = {
  sassPath: './scss',
  bowerDir: './bower_components'
};

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(config.bowerDir));
});

gulp.task('icons', function() {
  return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
    .pipe(gulp.dest('./fonts'));
});

gulp.task('sass', function() {
  return gulp.src('./scss/app.scss')
    .pipe(sass({errLogToConsole:true}))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
  gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
});

gulp.task('default', ['bower', 'icons', 'sass']);
