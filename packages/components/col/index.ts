import { withInstall } from '@storm/utils/with-install'
import _Col from './src/col.vue'
// 添加install方法
export const Col = withInstall(_Col)
export default Col
export * from './src/col'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    SCol: typeof Col
  }
}