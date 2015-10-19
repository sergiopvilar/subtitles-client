var gulp = require( 'gulp' );

gulp.task( 'compile', [
	'browserify',
	// 'through',
	'less',
	'style',
	'font',
	'data',
	'src',
	'install'
] );
