module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./dev/pug/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./dev/data/**/*.json', $.gulp.series('pug'));
        $.gulp.watch('./dev/assets/scss/**/*.scss', $.gulp.series('scss:dev'));
        $.gulp.watch(['./dev/assets/img/common/**/*.{png,jpg,jpeg,gif,svg}',
            './dev/assets/img/content/**/*.{png,jpg,jpeg,gif,svg}'], $.gulp.series('img:dev'));
        $.gulp.watch('./dev/assets/img/svg/*.svg', $.gulp.series('svg'));
        $.gulp.watch('./dev/assets/js/*.js', $.gulp.series('scripts:dev'));
        $.gulp.watch('./dev/assets/js/vendors/*.js', $.gulp.series('libsJS:dev'));
    });
};