import { withInstall } from '@storm/utils'
import _Button from './src/button.vue'
// 添加install方法
export const Button = withInstall(_Button)
export default Button
export * from './src/button'

declare module 'vue' {
  export interface GlobalComponents {
    SButton: typeof Button
  }
}
