var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var rimraf = require('rimraf');

var sassPaths = [
  './public/bower_components/foundation-sites/scss',
  './public/bower_components/motion-ui/src'
];

var config = {
  paths: {
    sass: './src/sass/**/*.scss',
    js: './src/js/**/*.js'
  }
};

gulp.task('clean-js', function(callback){
  rimraf('./public/js', callback);
});

gulp.task('sass', function() {
  return gulp.src(config.paths.sass)
    .pipe($.sass({
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js', ['clean-js'], function(){
  return gulp.src(config.paths.js)
    .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['sass', 'js'], function() {
  gulp.watch(config.paths.sass, ['sass']);
  gulp.watch(config.paths.js, ['js']);
});
