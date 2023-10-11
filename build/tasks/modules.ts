import glob from 'fast-glob'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import { pkgRoot } from '../utils/paths'
import { excludeFiles } from '../utils'

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true, // 返回绝对路径
      onlyFiles: true,
    })
  )
  console.log(input)
}