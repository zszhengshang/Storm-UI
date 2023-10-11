import glob from 'fast-glob'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
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
  const bundle = await rollup({
    input,
    plugins: [
      vue(),
      nodeResolve(),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    treeshake: false
  })
}