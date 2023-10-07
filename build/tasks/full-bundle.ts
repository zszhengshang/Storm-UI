import { nodeResolve } from '@rollup/plugin-node-resolve' // 解析第三方模块
import commonjs from '@rollup/plugin-commonjs' // 解析commonjs
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import { parallel } from 'gulp'
import path from 'path'
import { buildOutput, stormRoot } from '../utils/paths'
import { rollup, OutputOptions } from 'rollup'

const buildFull = async () => {
  // rollup打包到配置
  const config = {
    input: path.resolve(stormRoot, 'index.ts'),
    plugins: [nodeResolve(), typescript(), vue(), commonjs()],
    external: (id: string) => /^vue/.test(id) // 表示不打包vue库
  }
  const buildConfig = [
    {
      format: 'umd',
      file: path.resolve(buildOutput, 'index.js'),
      name: 'storm-ui', // 全局引入的名字
      globals: {
        vue: 'Vue' // 表示使用的vue是全局的
      }
    },
    {
      format: 'esm',
      file: path.resolve(buildOutput, 'index.esm.js')
    }
  ]
  const bundle = await rollup(config)
  console.log(bundle, 111)
  return Promise.all(buildConfig.map(config => bundle.write(config as OutputOptions)))
}

export const buildFullBundle = parallel(
  buildFull
)