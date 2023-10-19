import { resolve } from 'path'
// 根路径
export const projectRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projectRoot, 'packages')
export const buildRoot = resolve(projectRoot, 'build')
export const suRoot = resolve(pkgRoot, 'storm-ui')
// dist
export const buildOutput = resolve(projectRoot, 'dist')
// dist/storm-ui
export const suOutput = resolve(buildOutput, 'storm-ui')