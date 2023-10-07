import path from 'path'
import { buildOutput } from './utils/paths'

export const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    output: {
      name: 'es',
      path: path.resolve(buildOutput, 'es'),
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
      path: path.resolve(buildOutput, 'lib'),
    },
    bundle: {
      path: `storm-ui/lib`,
    }
  },
}