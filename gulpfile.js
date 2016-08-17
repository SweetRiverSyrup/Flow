/**
 * Created by ifabricatore on 8/3/2016.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sh = require('shelljs');
var chalk = require('chalk');
var argv = require('yargs');
//Yargs example
//var isProduction = (argv.production === undefined) ? false : true;
var jsDir = (argv.jdir === undefined) ? false : true;

var what;

var jsFiles = 'public/javascript/**/*.js',
    jsDest = 'dist/javascript';

gulp.task('minime', function () {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('errupt', function () {
    console.log(chalk.bgYellow.red.bold("Vulcanizing HTML..."));
    //sh.exec("vulcanize -o dist/vulcanized.form.ejs views/form.ejs");
    sh.exec("vulcanize -o dist/vulcanized.head.html dist/head.inc.html");
    if (what == "polymer") {
        //Some cool scripts
    }
});
gulp.task('polymer', function () {
    what = "Polymer";
});

gulp.task('default', function () {
    console.log(chalk.blue("Gulp testing"));
});