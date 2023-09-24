import path from 'path'
import { outDir } from './utils/paths'

export const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    output: {
      name: 'es',
      path: path.resolve(outDir, 'es'),
    },
    bundle: {
      path: `storm-ui/es`,
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    output: {
      name: 'lib',
      path: path.resolve(outDir, 'lib'),
    },
    bundle: {
      path: `storm-ui/lib`,
    }
  },
}