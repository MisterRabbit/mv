let uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    scriptsPATH = {
        "input": "./dev/assets/js/main.js",
        "output": "./build/assets/js/"
    },
    libs = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/svg4everybody/dist/svg4everybody.min.js',
        'node_modules/tooltipster/dist/js/tooltipster.bundle.min.js',
		'node_modules/slick-carousel/slick/slick.min.js',
		'node_modules/flatpickr/dist/flatpickr.min.js',
		'node_modules/flatpickr/dist/l10n/ru.js',
        'dev/assets/js/vendors/parallax.js',
        'dev/assets/js/vendors/smooth.scroll.js'
    ];

module.exports = function () {

    $.gulp.task('libsJS:dev', () => {
        return $.gulp.src(libs)
            .pipe(concat('libs.min.js'))
            .pipe(uglify()) // delete this
            .pipe($.gulp.dest(scriptsPATH.output));
    });

    $.gulp.task('libsJS:build', () => {
        return $.gulp.src(libs)
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe($.gulp.dest(scriptsPATH.output));
    });

    $.gulp.task('scripts:dev', function() {
        return $.gulp.src(scriptsPATH.input)
            .pipe($.gulp.dest(scriptsPATH.output))
            .pipe($.browserSync.reload({
                stream: true
            }));
            
    });

    $.gulp.task('scripts:build', function() {
        return $.gulp.src(scriptsPATH.input)
            .pipe(uglify())
            .pipe($.gulp.dest(scriptsPATH.output))
    });

    $.gulp.task('scripts:prod', function() {
        return $.gulp.src(scriptsPATH.input)
            .pipe(uglify())
            .pipe(rename('main.min.js'))
            .pipe($.gulp.dest(scriptsPATH.output))
    });
}