import { withInstall } from '@storm/utils/with-install'
import _InputNumber from './src/input-number.vue'
// 添加install方法
const InputNumber = withInstall(_InputNumber)

export default InputNumber
export type { InputNumberProps, InputNumberEmits } from './src/input-number'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    SInputNumber: typeof InputNumber
  }
}