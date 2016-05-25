var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('compress', function () {
    gulp.src('lib/*.js')
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
