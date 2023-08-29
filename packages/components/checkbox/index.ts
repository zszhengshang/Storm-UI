import { withInstall } from '@storm/utils/with-install'
import _Checkbox from './src/checkbox.vue'
import _CheckboxGroup from './src/checkbox-group.vue'
// 添加install方法
const Checkbox = withInstall(_Checkbox, { _CheckboxGroup })

export default Checkbox
export type { CheckboxProps, CheckboxEmits } from './src/checkbox'
export type { CheckboxGroupProps, CheckboxGroupEmits } from './src/checkbox-group'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    SCheckbox: typeof Checkbox
  }
}