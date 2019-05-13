var gulp = require("gulp");
var shell = require('gulp-shell');

// This compiles new binary with source change
gulp.task("install-binary", shell.task([
  'go install github.com/restful-web-services/roman-numeral/romanserver'
]));


// Second argument tells install-binary is a deapendency for restart-supervisor
gulp.task("restart-supervisor",  shell.task([
  'supervisorctl restart romanserver'
]));
gulp.task(gulp.series(gulp.parallel("restart-supervisor", "install-binary")),  shell.task([
  'supervisorctl restart romanserver'
]))

gulp.task('watch', function() {
  // Watch the source code for all changes
  gulp.watch("*", gulp.series(gulp.parallel('install-binary', 'restart-supervisor')));

});

gulp.task('default', gulp.series(gulp.parallel('watch')));
