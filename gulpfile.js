var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var exec = require('child_process').exec;

gulp.task('server', function(callback) {
	return exec('node ./server.js', function(err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		callback(err);
	});
});

gulp.task('build', function() {
	return browserify({entries: './app/App.js'})
		.transform('babelify', {presets: ['es2015', 'react']})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('public'))
});

gulp.task('watch', ['build'], function() {
	gulp.watch('*.js', ['build']);
});

gulp.task('default', ['server', 'watch']);