var gulp = require('gulp'),
    concatCSS = require("gulp-concat-css"),
    rename = require("gulp-rename"),
    minifyCSS = require("gulp-minify-css"),
    fileinclude = require('gulp-file-include'),
    prettify = require('gulp-html-prettify'),
    sass = require('gulp-sass');
    


gulp.task('sass', function(){
	gulp.src('sass/**/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concatCSS("home_page.css"))
		.pipe(gulp.dest('build/'))
		.pipe(minifyCSS())
		.pipe(rename("home_page.min.css"))
		.pipe(gulp.dest('build/'));

});

gulp.task('fileinclude', function() {
    gulp.src(['pages/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(prettify({indent_char: "\t", indent_size: 1}))
        .pipe(gulp.dest('./build/'));
});

gulp.task('watch', ["sass","fileinclude"], function(){
	gulp.watch("sass/*" , ['sass']);
    gulp.watch("sass/**" , ['sass']);
    gulp.watch("pages/*", ["fileinclude"]);
    gulp.watch("pages/**", ["fileinclude"]);
});

gulp.task('default', ["sass","fileinclude"]);