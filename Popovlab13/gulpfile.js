const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); 
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');

// Шляхи до файлів
const paths = {
    styles: { src: 'src/scss/**/*.scss', dest: 'dist/css/' },
    scripts: { src: 'src/js/**/*.js', dest: 'dist/js/' },
    images: { src: 'src/images/*', dest: 'dist/images/' }
};

// Очищення папки dist
async function clean() {
    await del.deleteAsync(['dist']);
}
// Компіляція SCSS -> CSS, об'єднання, мінімізація, перейменування
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.styles.dest));
}

// Об'єднання та мінімізація JS
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.scripts.dest));
}

// Оптимізація зображень
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Автоматичний перегляд змін
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
}

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = watch;

// Запуск всього разом при команді "gulp"
exports.default = gulp.series(clean, gulp.parallel(styles, scripts, images), watch);