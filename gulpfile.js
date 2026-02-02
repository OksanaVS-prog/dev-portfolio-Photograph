const { src, dest, watch, series, parallel } = require('gulp')
const htmlmin = require('gulp-htmlmin')
const cleanCSS = require('gulp-clean-css')
const terser = require('gulp-terser')
const browserSync = require('browser-sync').create()
const del = require('del')

function clean() {
  return del(['dist'])
}

function html() {
  return src('src/html/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

function css() {
  return src('src/css/*.css')
    .pipe(cleanCSS())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}

function js() {
  return src('src/js/*.js')
    .pipe(terser())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

function serve() {
  browserSync.init({
    server: { baseDir: 'dist' }
  })

  watch('src/html/*.html', html)
  watch('src/css/*.css', css)
  watch('src/js/*.js', js)
}

exports.default = series(
  clean,
  parallel(html, css, js),
  serve
)