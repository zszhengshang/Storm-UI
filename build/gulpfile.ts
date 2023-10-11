import { series, parallel } from 'gulp'
import { run, withTaskName } from './utils'

export default series(
  // 删除dist目录
  withTaskName('clean', () => run('rm -rf dist')),
  parallel(
    withTaskName('buildModules',() => run('pnpm run build buildModules')),
    // 执行packages/theme-chalk目录下的build命令打包样式
    // withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme-chalk build'))
  )
)

export * from './tasks'