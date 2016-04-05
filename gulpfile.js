var gulp = require("gulp");
var connect = require("gulp-connect");
var sass = require("gulp-sass");
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer')

gulp.task("connect", function(){
  connect.server({
    //root:"",
    port:4000
  })
});

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify('source/app/main.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('bundle.js')) // gives streaming vinyl file object
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        .pipe(uglify())
        // saves it the public/js/ directory
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('source/app/**/*.js', ['browserify']);
    // Watches for changes in style.sass and runs the sass task
    gulp.watch('./sass/**/*.sass', ['sass']);
});


gulp.task('default', ['connect', 'watch']);