import { withInstall } from '@storm/utils/with-install'
import _Checkbox from './src/checkbox.vue'
// 添加install方法
const Checkbox = withInstall(_Checkbox)

export default Checkbox
export type { CheckboxProps, CheckboxEmits } from './src/checkbox'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    SCheckbox: typeof Checkbox
  }
}