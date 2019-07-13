'use strict';

var ArquivosSass = './src/sass/*.scss';

var DestinoProdCss = './src/css';

var DestinoDevCss = './dev/css';



var gulp = require('gulp');
var sass = require('gulp-css-scss');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var wait = require('gulp-wait');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['sassDev', 'sassProd','watch'], function () {

	browserSync.init({
		proxy: "http://localhost/site/Agro",
		notify: false
	});

});
gulp.task('sassProd', () => {
  return gulp.src(ArquivosSass)
    	.pipe(sass())
		.pipe(browserSync.stream())
		.pipe(rename('style.css'))
		.pipe(wait(500))
		.pipe(gulp.dest(DestinoDevCss));
});


gulp.task('sassDev', function () {
	return gulp.src(ArquivosSass)
		.pipe(sass())
	    .pipe(cleanCSS())
		.pipe(browserSync.stream())
		.pipe(rename('style.css'))
		.pipe(wait(500))
		.pipe(gulp.dest(DestinoProdCss));
});

gulp.task('mimiffy', () => {
  return gulp.src('dev/css/style.css')
    	 .pipe(cleanCSS({debug: true}, (details) => {
	      console.log(`${details.name}: ${details.stats.originalSize}`);
	      console.log(`${details.name}: ${details.stats.minifiedSize}`);
	    }))
    	 .pipe(rename('style.css'))
    	 .pipe(wait(500))
		 .pipe(gulp.dest(DestinoProdCss));
});

gulp.task('watch', function () {
	gulp.watch('./src/sass/**/*.scss', ['sassDev', 'sassProd']);
	gulp.watch("./src/sass/**/*.scss").on('change', browserSync.reload);
	gulp.watch("./**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['sassDev', 'sassProd'	,'serve', 'mimiffy', 'watch'], function () {});
