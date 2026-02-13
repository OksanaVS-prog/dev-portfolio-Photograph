const { src, dest, watch, series, parallel } = require('gulp');
const fileInclude = require('gulp-file-include');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();
const del = require('del');

// -----------------
// 1. Чистка dist
// -----------------
function clean() {
  return del(['dist']);
}

// -----------------
// 2. Сборка HTML с @@include
// -----------------
function html() {
  return src('src/html/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// -----------------
// 3. CSS (минификация)
// -----------------
function css() {
  return src('src/css/*.css')
    .pipe(cleanCSS())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

// -----------------
// 4. JS (минификация)
// -----------------
function js() {
  return src('src/js/*.js')
    .pipe(terser())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// -----------------
// 5. Копирование изображений
// -----------------
function images() {
  return src('src/img/**/*', { encoding: false })
    .pipe(dest('dist/img'))
    .pipe(browserSync.stream());
}

// -----------------
// 6. Сервер с live reload
// -----------------
function serve() {
  browserSync.init({
    server: { baseDir: 'dist' },
    port: 3000,      // явный порт
    open: true,      // автоматически откроет браузер
    notify: false    // отключаем уведомления
  });

  watch('src/html/*.html', html);
  watch('src/pages/*.html', html);   // partials
  watch('src/css/*.css', css);
  watch('src/js/*.js', js);
  watch('src/img/**/*', images);
}

// -----------------
// 7. Экспорт default
// -----------------
exports.default = series(
  clean,
  parallel(html, css, js, images),
  serve
);
