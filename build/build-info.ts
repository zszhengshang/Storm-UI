import { resolve } from 'path'
import { suOutput } from './utils/paths'

const PKG_NAME = 'storm-ui'
export const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: resolve(suOutput, 'es')
    },
    bundle: {
      path: `${PKG_NAME}/es`,
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: resolve(suOutput, 'lib'),
    },
    bundle: {
      path: `${PKG_NAME}/lib`,
    }
  }
}