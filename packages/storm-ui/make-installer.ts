import { INSTALLED_KEY } from '@storm/constants'
import { App, Plugin } from 'vue'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true
    components.forEach(c => app.use(c))
  }

  return install
}