let gulp = require('gulp');

let browserSync = require('browser-sync').create();

let sass = require('gulp-sass');

let cleanCSS = require('gulp-clean-css');

gulp.task('hello', function() {
  console.log('Hi!!');
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('minify-css', () => {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    }))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['browserSync', 'sass', 'minify-css'], function (){
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/css/*.css', browserSync.reload);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
});
