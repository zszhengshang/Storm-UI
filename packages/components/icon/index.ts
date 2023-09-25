import { withInstall } from '@storm/utils/with-install'
import _Icon from './src/icon.vue'
// 添加install方法
export const Icon = withInstall(_Icon)
export default Icon
export * from './src/icon'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    SIcon: typeof Icon
  }
}