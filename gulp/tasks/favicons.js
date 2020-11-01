module.exports = function () {
    $.gulp.task('favicons', () => {
        return $.gulp.src('./dev/assets/img/favicons/**/*.*')
            .pipe($.gulp.dest('./build/assets/img/favicons/'));
    });
};