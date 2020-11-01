// let imagemin = require('gulp-imagemin'),
//    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
let cache = require('gulp-cache'),
    imgPATH = {
        "input": [
            './dev/assets/img/**/*.{png,jpg,jpeg,gif,svg}',
            '!./dev/assets/img/svg/*',
            '!./dev/assets/img/favicons/*'
            ],
        "ouput": "./build/assets/img/"
    };

module.exports = function () {
    $.gulp.task('img:dev', () => {
        return $.gulp.src(imgPATH.input)
            .pipe($.gulp.dest(imgPATH.ouput));
    });

    $.gulp.task('img:build', () => {
        return $.gulp.src(imgPATH.input)


            // Use https://squoosh.app/ instead this plugins


            // .pipe(cache(imagemin([
            //     imagemin.gifsicle({interlaced: true}),
            //     imagemin.jpegtran({progressive: true}),
            //     imageminJpegRecompress({
            //         loops: 5,
            //         min: 70,
            //         max: 75,
            //         quality: 'medium'
            //     }),
            //     imagemin.svgo(),
            //     imagemin.optipng({optimizationLevel: 3})
            // ], {
            //     verbose: true
            // })))
            .pipe($.gulp.dest(imgPATH.ouput));
    });
};