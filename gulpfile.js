"use strict"

global.$ = {
    path: {
        task: require('./gulp/path/tasks.js')
    },
    gulp: require('gulp'),
    browserSync: require('browser-sync').create(),
    del: require('del'),
    fs: require('fs')
};

$.path.task.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'fonts',
        'scss:dev',
        'libsJS:dev',
        'scripts:dev',
        'favicons',
        'img:dev',
        'svg'

    )
));

$.gulp.task('build', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'fonts',
        'scss:build',
        'libsJS:build',
        'scripts:build',
        'favicons',
        'img:build',
        'svg'
    )
));

$.gulp.task('prod', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'pug',
        'fonts',
        'scss:prod',
        'libsJS:build',
        'scripts:prod',
        'favicons',
        'img:build',
        'svg'
    )
));

$.gulp.task('default', $.gulp.series(
    'dev',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));