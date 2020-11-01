let plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    pug = require('gulp-pug')

module.exports = function () {
    $.gulp.task('pug', function () {
        return $.gulp.src('dev/pug/*.pug')
            .pipe(plumber({
                errorHandler: notify.onError(function(err){
                    return {
                        message: err.message
                    }
                })
            }))
            .pipe(pug({
                locals: {
                    content: JSON.parse($.fs.readFileSync('./dev/data/content.json', 'utf8'))
                },
                pretty: true
            }))
            .pipe($.gulp.dest('build'))
            .on('end', $.browserSync.reload);
    });
}