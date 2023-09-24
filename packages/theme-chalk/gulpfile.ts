import { series, src, dest } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoPrefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import path from 'path'

// 编译scss
function compiler() {
  const sass = gulpSass(dartSass)
  return src(path.resolve(__dirname, './src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoPrefixer())
    .pipe(cleanCss())
    .pipe(dest('./dist/css'))
}
// 字体压缩
function copyfont() {
  return src(path.resolve(__dirname, './src/fonts/**'))
    .pipe(cleanCss())
    .pipe(dest('./dist/fonts'))
}
// 把处理完的字体和样式拷贝到dist的theme-chalk目录
function copyfullStyle() {
  return src(path.resolve(__dirname, './dist/**'))
    .pipe(dest(path.resolve(__dirname, '../../dist/theme-chalk')))
}

export default series(
  compiler,
  copyfont,
  copyfullStyle
)