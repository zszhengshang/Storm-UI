import { withInstall } from '@storm/utils/with-install'
import _Input from './src/input.vue'
// 添加install方法
export const Input = withInstall(_Input)
export default Input
export * from './src/input'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    SInput: typeof Input
  }
}