import glob from 'fast-glob'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import ts from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import { pkgRoot } from '../utils/paths'
import { excludeFiles } from '../utils'

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{ts,vue}', {
      cwd: pkgRoot,
      absolute: true, // 返回绝对路径
      onlyFiles: true,
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      nodeResolve(),
      vue(),
      ts(),
      commonjs(),
    ],
    treeshake: false,
    external: ['vue']
  })
}