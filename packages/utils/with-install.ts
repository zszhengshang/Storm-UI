// 每个组件既可以通过app.use来使用 也可以通过import来使用
import { DefineComponent, Plugin } from "vue"

type SFCWithInstall<T> = T & Plugin
export function withInstall<T extends DefineComponent<{}, {}, any>>(comp: T) {
  (comp as SFCWithInstall<T>).install = function (app) {
    const { name } = comp as { name: string }
    app.component(name, comp)
  }
  return comp as SFCWithInstall<T>
}