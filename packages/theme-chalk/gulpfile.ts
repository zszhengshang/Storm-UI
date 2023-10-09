import { resolve } from 'path'
import { dest, parallel, series, src } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import { suOutput } from '../../build/utils/paths'
import consola from 'consola'
import chalk from 'chalk'

const distFolder = resolve(__dirname, 'dist')
const distBundle = resolve(suOutput, 'theme-chalk')

// 把theme-chalk的scss文件都拷贝到 /dist/storm-ui/theme-chalk目录下
const copyThemeChalkSource = () => {
  return src(resolve(__dirname, 'src/**')).pipe(
    dest(resolve(distBundle, 'src'))
  )
}

const buildThemeChalk = () => {
  const sass = gulpSass(dartSass)
  return src(resolve(__dirname, 'src/*.scss'))
    .pipe(sass.sync()) // 编译sass文件
    .pipe(autoprefixer()) // 添加前缀
    .pipe(cleanCSS({}, (details) => { // 压缩css
      consola.success(
        `${chalk.cyan(details.name)}: ${chalk.yellow(
          details.stats.originalSize / 1000
        )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
      )
    }))
    .pipe(dest(distFolder)) // 输出到指定目录
}

const copyThemeChalkBundle = () => {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

export default parallel(
  copyThemeChalkSource,
  series(
    buildThemeChalk,
    copyThemeChalkBundle
  )
)