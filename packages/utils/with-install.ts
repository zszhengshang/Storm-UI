// 每个组件既可以通过app.use来使用 也可以通过import来使用
import { DefineComponent, Plugin } from "vue"

type SFCWithInstall<T> = T & Plugin
export const withInstall = <T, E extends Record<string, any>>(
  main: T, extra?: E
) => {
  (main as SFCWithInstall<T>).install = (app): void => {
    const comps = [main, ...Object.values(extra ?? {})]
    for (const comp of comps) {
      app.component(comp.name, comp)
    }
  }
  return main as SFCWithInstall<T> & E
}