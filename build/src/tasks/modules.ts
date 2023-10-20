import glob from 'fast-glob'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import { excludeFiles, pkgRoot, suRoot, writeBundles } from '../utils'
import { target, buildConfigEntries } from '../build-info'

import type { OutputOptions } from 'rollup'

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot, // 执行目录
      absolute: true, // 返回绝对路径
      onlyFiles: true,
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      vue(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        loaders: {
          '.vue': 'ts',
          '.js': 'jsx'
        }
      })
    ],
    treeshake: false,
    external: (id) => /^(@v|vue)/.test(id)
  })
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true, // 生成的模块按照原目录结构生成
        preserveModulesRoot: suRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}` // 生成单独的chunk文件
      }
    })
  )
}