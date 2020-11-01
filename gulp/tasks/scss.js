let plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    scss = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('autoprefixer'),
    // csscomb = require('gulp-csscomb'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    sortCSSmq = require('sort-css-media-queries'), // custom queries for css-mqpacker
    focus = require('postcss-focus'), // add :focus to element with :hover
    mqpacker = require('css-mqpacker'),
    postcssPlugins = [
        // mqpacker(), // Mobile first media queries
        mqpacker({sort: sortCSSmq.desktopFirst}), // Desktop first media queries
        focus(),
        autoprefixer({browsers: ['last 50 versions']})
    ],
    filesPATH = {
        "input": "./dev/assets/scss/main.scss",
        "output": "./build/assets/css/"
    };

module.exports = function () {

    $.gulp.task('scss:dev', () => {
        return $.gulp.src(filesPATH.input)
            .pipe(plumber({
                errorHandler: notify.onError(function(err){
                    return {
                        title: 'Styles',
                        message: err.message
                    }
                })
            }))
            .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(postcss(postcssPlugins))
            .pipe(sourcemaps.write('.'))
            .pipe($.gulp.dest(filesPATH.output))
            .pipe($.browserSync.stream());
    });

    $.gulp.task('scss:build', () => {
        return $.gulp.src(filesPATH.input)
            .pipe(plumber({
                errorHandler: notify.onError(function(err){
                    return {
                        title: 'Styles',
                        message: err.message
                    }
                })
            }))
            .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(postcss(postcssPlugins))
            .pipe(cssnano())
            .pipe(sourcemaps.write('.'))
            .pipe($.gulp.dest(filesPATH.output))
            .pipe($.browserSync.stream());
    });

    $.gulp.task('scss:prod', () => {
        return $.gulp.src(filesPATH.input)
            .pipe(scss())
            .pipe(postcss(postcssPlugins))
            .pipe(cssnano())
            .pipe(rename('main.min.css'))
            .pipe($.gulp.dest(filesPATH.output));
    });
}