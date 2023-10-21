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
      onlyFiles: true, // 只查找文件
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      vue(), // 把Vue SFC编译为js代码
      nodeResolve({
        extensions: ['.js', '.ts'] // 解析node_modules
      }),
      commonjs(),// 用于将CommonJS模块转换为 ES6
      esbuild({ // 把ts转换为js
        sourceMap: true,
        target,
        loaders: {
          '.vue': 'ts' // vue文件被插件解析为js代码后 文件还是.vue结尾，把它看作ts文件
        }
      })
    ],
    treeshake: false,
    external: (id) => /^(@v|vue)/.test(id) // 将依赖排除在构建产物之外
  })
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true, // 构建产物将保持与源码一样的文件结构
        preserveModulesRoot: suRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}` // 生成单独的chunk文件
      }
    })
  )
}