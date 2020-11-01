let svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    svgPATH = {
        "input": "./dev/assets/img/svg/*.svg",
        "output": "./build/assets/img/svg/"
    };

module.exports = function () {
    $.gulp.task('svg', () => {
        return $.gulp.src(svgPATH.input)
            .pipe(svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe(cheerio({
                run: function ($) {
                    // $('[fill]').removeAttr('fill');
                    // $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: {xmlMode: true}
            }))
            .pipe(replace('&gt;', '>'))
            .pipe(svgSprite({
                mode: {
                    symbol: {
                        sprite: "sprite.svg"
                    }
                }
            }))
            .pipe($.gulp.dest(svgPATH.output));
    });
};