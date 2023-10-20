import { resolve } from 'path'
import { suOutput } from './utils/paths'
import { PKG_NAME } from '@storm/constants'

import type { ModuleFormat } from 'rollup'

const modules = ['esm', 'cjs'] as const
type Module = typeof modules[number]
export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    name: string
    path: string
  }
  bundle: {
    path: string
  }
}
const buildConfig: Record<Module, BuildInfo> = {
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

export const buildConfigEntries = Object.entries(buildConfig)
export const target = 'es2018'