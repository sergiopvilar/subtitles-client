var gulp = require( 'gulp' );
var browserify = require( 'browserify' );
var babelify = require("babelify");
var reactify = require( 'reactify' );
var source = require( 'vinyl-source-stream' );

var reactifyES6 = function(file) {
  return reactify(file, {stripTypes: true, 'es6': true});
};

gulp.task( 'browserify', function () {
	var bundler = browserify( {
		entries: [ './component/app.js' ],
		transform: [ babelify ]
	} );
	return bundler.bundle()
		.pipe( source( 'app.js' ) )
		.pipe( gulp.dest( './compile' ) );
} );
