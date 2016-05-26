var gulp = require('gulp');
var jshint = require('gulp-jshint');
var minify = require('gulp-minify');

gulp.task('compress', function () {
    gulp.src('lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist'))
});
