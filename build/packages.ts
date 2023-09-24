// 专门打包util 指令 hook
import path from 'path'
import { series, parallel, src, dest } from 'gulp'
import { buildConfig } from './build-info'
import { outDir, projectRoot } from './utils/paths'
import ts from 'gulp-typescript'
import { withTaskName } from './utils'

export const buildPackages = (dirname: string, name: string) => {
  const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(dirname, config.output.name)

    return series(
      withTaskName(`build:${dirname}`, () => {
        // ts配置文件的路径
        const tsConfig = path.resolve(projectRoot, 'tsconfig.json')
        // 打包所有ts文件 不包含gulpfile和node_modules
        const inputs = ['**/*.ts', '!gulpfile.ts', '!node_modules']
        // 打包的时候走一下ts配置文件并且生成生命文件
        return src(inputs)
          .pipe(ts.createProject(tsConfig, {
            declaration: true, // 生成声明文件
            strict: false,
            module: config.module
          })())
          .pipe(dest(output))
      }),
      withTaskName(`copy:${dirname}`, () => {
        // 放到es的utils下 和 lib的utils下
        return src(`${output}/**`)
          .pipe(dest(path.resolve(outDir, config.output.name, dirname)))
      })
    )
  })

  return parallel(...tasks)
}