var gulp = require('gulp');
var del = require('del');

gulp.task('copy', function() {
  var folders = ['src/**/*.html', 'src/**/*.css', 'src/lib/**/*'];
  // folders.map(function(folder) {
  //  return gulp.src(folder)
  //             .pipe(gulp.dest('./dist/'));
  gulp.src(folders[0])
      .pipe(gulp.dest('./dist/view'));

  gulp.src(folders[1])
      .pipe(gulp.dest('./dist/'));

  gulp.src(folders[2])
      .pipe(gulp.dest('./dist/lib'));
  
});

gulp.task('clean', function() {
  return del.sync([
    './dist/**'
  ]);
});

gulp.task('build', ['clean', 'copy']);