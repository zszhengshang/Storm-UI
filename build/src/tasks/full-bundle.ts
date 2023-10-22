import { parallel } from 'gulp'
import { formatBundleFilename, suOutput, suRoot, withTaskName, writeBundles } from '../utils'
import vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { target } from '../build-info'
import { rollup } from 'rollup'
import path from 'path'

import type { Plugin } from 'rollup'
import { PKG_CAMELCASE_NAME } from '@storm/constants'

const buildFull = async (minify: boolean) => {
  const plugins: Plugin[] = [
    vue(),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts'],
    }),
    commonjs(),
    esbuild({
      sourceMap: minify,
      target,
      treeShaking: true,
      loaders: {
        '.vue': 'ts',
        '.js': 'jsx'
      }
    })
  ]
  if (minify) {
    plugins.push(
      minifyPlugin({
        target,
        sourceMap: true
      })
    )
  }
  const bundle = await rollup({
    input: path.resolve(suRoot, 'index.ts'),
    plugins,
    treeshake: true,
    external: ['vue']
  })
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(
        suOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'js')
      ),
      exports: 'named',
      name: PKG_CAMELCASE_NAME,
      globals: {
        vue: 'Vue'
      },
      sourcemap: minify
    },
    {
      format: 'esm',
      file: path.resolve(
        suOutput,
        'dist',
        formatBundleFilename('index.full', minify, 'mjs')
      ),
      sourcemap: minify
    }
  ])
}

export const buildFullBundle = parallel(
  withTaskName('buildFullMinified', () => buildFull(true)),
  withTaskName('buildFull', () => buildFull(false)),
)