import { withInstall } from '@storm/utils/with-install'
import _Radio from './src/radio.vue'
import _RadioGroup from './src/radio-group.vue'
// 添加install方法
export const Radio = withInstall(_Radio, { _RadioGroup })
export default Radio
export * from './src/radio'
export * from './src/radio-group'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    SRadio: typeof Radio
  }
}