const browserSync = require("browser-sync");
const gulp = require("gulp");
//const sass = require("gulp-sass");
const fileInclude = require("gulp-file-include");

const browser = require("browser-sync").create();

function css(cb) {
  const postcss = require("gulp-postcss");
  gulp
    .src("./src/**/*.css")
    .pipe(postcss([require("tailwindcss"), require("autoprefixer")]))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
  cb();
}

function html(cb) {
  gulp
    .src("./src/**/*.html", "!./src/include/**/*.html")
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("dist/"));
  cb();
}
function jpg(cb) {
  gulp.src("./src/**/*.jpg").pipe(gulp.dest("dist/"));
  cb();
}
function js(cb) {
  gulp.src("./src/**/*.js").pipe(gulp.dest("dist/"));
  cb();
}

function watch(cb) {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch("./src/**/*.css", gulp.series("css"));
  gulp
    .watch("./src/**/*.html", gulp.series("html"))
    .on("change", browserSync.reload);
  gulp
    .watch("./src/**/*.jpg", gulp.series("jpg"))
    .on("change", browserSync.reload);
  gulp
    .watch("./src/**/*.js", gulp.series("js"))
    .on("change", browserSync.reload);
  cb();
}

/// Gulp task names

gulp.task("css", css);
gulp.task("html", html);
gulp.task("jpg", html);
gulp.task("js", html);
gulp.task("watch", watch);

exports.build = gulp.parallel(css, html, jpg, js);
exports.default = gulp.parallel(css, html, jpg, js, watch);
