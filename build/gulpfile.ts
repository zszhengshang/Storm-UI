import { series } from 'gulp'
import { run, withTaskName } from './utils'

export default series(
  withTaskName('clean', () => run('rm -rf dist'))
)