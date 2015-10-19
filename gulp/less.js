var gulp = require( 'gulp' );
var less = require( 'gulp-less' );
var copy = require( 'gulp-copy' );
var babel = require('gulp-babel');

gulp.task( 'less', function () {
	return gulp.src( './style/**/*.less' )
		.pipe( less() )
		.pipe( gulp.dest( './compile/style' ) )
} );

gulp.task ('style', function() {
	return gulp.src('./style/**/*.css')
	  .pipe(gulp.dest( './compile/style'))
});

gulp.task ('font', function() {
	return gulp.src('./fonts/*')
	  .pipe(gulp.dest( './compile/fonts'))
});

gulp.task('src', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./compile/src'));
});

gulp.task ('data', function() {
	return gulp.src('./data.json')
	  .pipe(gulp.dest( './compile'))
});
