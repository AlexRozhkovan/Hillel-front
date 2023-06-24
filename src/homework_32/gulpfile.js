import gulp from "gulp";
import * as sass from "sass";
import gulpSass from "gulp-sass";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import imagemin from "gulp-imagemin";
import cleanCSS from "gulp-clean-css";
import babel from "gulp-babel";
import autoPrefixer from "gulp-autoprefixer";

const sassCompiler = gulpSass(sass);

const BUILD_FOLDER = "./dist";
const BUILD_JS_FOLDER = BUILD_FOLDER + "/js";
const BUILD_CSS_FOLDER = BUILD_FOLDER + "/css";
const BUILD_IMAGES_FOLDER = BUILD_FOLDER + "/images";

const SRC_FOLDER = "./src";
const JS_FILES_PATH = SRC_FOLDER + "/js/**/*.js";
const SCSS_FOLDER = SRC_FOLDER + "/scss/**/*.scss";
const IMAGE_FOLDER = SRC_FOLDER + "/numberImages/*";

gulp.task("compileJS", function () {
  return gulp
    .src(JS_FILES_PATH)
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(concat("result.js"))
    .pipe(gulp.dest(BUILD_JS_FOLDER));
});

gulp.task("compileCSS", function () {
  return gulp
    .src(SCSS_FOLDER)
    .pipe(sassCompiler())
    .pipe(autoPrefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest(BUILD_CSS_FOLDER));
});

gulp.task("minimizeImages", function () {
  return gulp
    .src(IMAGE_FOLDER)
    .pipe(imagemin())
    .pipe(gulp.dest(BUILD_IMAGES_FOLDER));
});

gulp.task("watcherJS", function () {
  return gulp.watch(JS_FILES_PATH, gulp.series("compileJS"));
});

gulp.task("watcherCSS", function () {
  return gulp.watch(SCSS_FOLDER, gulp.series("compileCSS"));
});

gulp.task(
  "default",
  gulp.parallel("compileJS", "compileCSS", "minimizeImages")
);

gulp.task("dev", gulp.parallel("watcherJS", "watcherCSS"));
