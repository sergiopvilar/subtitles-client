var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("compile-js", function () {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});
