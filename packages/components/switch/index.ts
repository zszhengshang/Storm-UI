import { withInstall } from '@storm/utils'
import _Switch from './src/switch.vue'
// 添加install方法
export const Switch = withInstall(_Switch)
export default Switch
export type { SwitchProps, SwitchEmits } from './src/switch'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    SSwitch: typeof Switch
  }
}