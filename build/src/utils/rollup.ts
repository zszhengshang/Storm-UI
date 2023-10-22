import type { RollupBuild, OutputOptions } from 'rollup'

export const writeBundles = (bundle: RollupBuild, options: OutputOptions[]) => {
  return Promise.all(options.map(option => bundle.write(option)))
}

export const formatBundleFilename = (name: string, minify: boolean, ext: string) => {
  return `${name}${minify ? '.min' : ''}.${ext}`
}