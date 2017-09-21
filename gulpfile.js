'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');

var config = {
	"src": "./src",
	"public": "./public",
	"development": false
}

gulp.task('default', function (cb) {
	var t = gulp.src(config.src+'/**/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
	if(!config.development)
		t = t.pipe(cleanCSS());
	t.pipe(gulp.dest(config.public+'/assets'));

	var t = [gulp.src(config.src+'/**/*.js')];
	if(!config.development) {
		t.push(uglify());
	}
	t.push(concat('build.min.js'));
	t.push(gulp.dest(config.public+'/assets/scripts'));
	pump(t, cb);
});