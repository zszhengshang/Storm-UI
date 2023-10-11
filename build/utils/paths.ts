import { resolve } from 'path'
// 根路径
export const projectRoot = resolve(__dirname, '..', '..')
export const pkgRoot = resolve(projectRoot, 'packages')
// dist
export const buildOutput = resolve(projectRoot, 'dist')
// /dist/storm-ui
export const suOutput = resolve(buildOutput, 'storm-ui')