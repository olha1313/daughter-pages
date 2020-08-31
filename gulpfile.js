const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('autoprefixer')
const browserSync = require('browser-sync')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss');

gulp.task('sass', () => {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(postcss([autoprefixer(['last 3 versions'])]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch',  () => {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'))
});

gulp.task('js', () => {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.stream())
})

gulp.task('default', gulp.parallel('watch', () => {
    gulp.watch('app/*.html').on('change', browserSync.reload);
    gulp.watch("app/js/*.js", gulp.series('js'))
}));
