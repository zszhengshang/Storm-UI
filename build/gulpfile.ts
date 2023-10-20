import { series, parallel } from 'gulp'
import { run, runTask, suOutput, withTaskName } from './src'
import { mkdir } from 'fs/promises'

export default series(
  // 删除打包目录
  withTaskName('clean', () => run('pnpm run clean')),
  // 递归创建目录
  withTaskName('createOutput', () => mkdir(suOutput, { recursive: true })),
  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle')
  )
)

export * from './src'