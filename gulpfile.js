const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");

function style() {
  return gulp
    .src("app/styles/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("app"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
  });
  style();
  gulp.watch("app/styles/*.scss", style);
}

exports.watch = watch;
