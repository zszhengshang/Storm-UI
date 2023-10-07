import path from 'path'
// 根路径
export const projectRoot = path.resolve(__dirname, '../../')
export const stormRoot = path.resolve(projectRoot, 'packages/storm-ui')
export const buildOutput = path.resolve(projectRoot, 'dist')
export const compRoot = path.resolve(projectRoot, 'packages/components')