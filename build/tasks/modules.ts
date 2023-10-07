import { series } from 'gulp'
import { sync } from 'fast-glob'
import { compRoot } from '../utils/paths'

const buildEachComponent = async () => {
  const files = sync('*', {
    cwd: compRoot,
    onlyDirectories: true,
  })
  console.log(files)
}

export const buildModules = series(buildEachComponent)