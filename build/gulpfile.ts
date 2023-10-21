import { series, parallel } from 'gulp'
import { run, runTask, suOutput, withTaskName } from './src'
import { mkdir, copyFile } from 'fs/promises'
import path from 'path'

const copyFullStyle = async () => {
  await mkdir(path.resolve(suOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(suOutput, 'theme-chalk/index.css'),
    path.resolve(suOutput, 'dist/index.css')
  )
}

export default series(
  // 删除打包目录
  withTaskName('clean', () => run('pnpm run clean')),
  // 递归创建dist/storm-ui目录
  withTaskName('createOutput', () => mkdir(suOutput, { recursive: true })),
  parallel(
    // 打包各个组件、工具方法和常量
    runTask('buildModules'),
    // 打包完整包并且提供压缩版本
    runTask('buildFullBundle'),
    // 拷贝scss文件和把scss处理成css
    series(
      withTaskName('buildThemeChalk', () =>
        run('pnpm run -C packages/theme-chalk build')
      ),
      copyFullStyle
    )
  )
)

export * from './src'