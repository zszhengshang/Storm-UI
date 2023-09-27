import type { Plugin, App } from "vue";

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    components.forEach(component => {
      app.use(component)
    })
  }

  return {
    install
  }
}