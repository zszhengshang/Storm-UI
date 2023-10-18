import glob from 'fast-glob'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import { pkgRoot } from '../utils/paths'
import { excludeFiles } from '../utils'

export const buildModules = async () => {
  const input = excludeFiles(
    await glob('components/button/src/button.vue', {
      cwd: pkgRoot,
      absolute: true, // 返回绝对路径
      onlyFiles: true,
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue({
            isProduction: false,
          }),
          vueJsx: vueJsx(),
        },
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'ts',
        },
      }),
    ],
    treeshake: false,
    external: ['vue']
  })
  console.log(bundle, 111)
}