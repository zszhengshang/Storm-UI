import { withInstall } from '@storm/utils'
import _InputNumber from './src/input-number.vue'
// 添加install方法
export const InputNumber = withInstall(_InputNumber)
export default InputNumber
export * from './src/input-number'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    SInputNumber: typeof InputNumber
  }
}