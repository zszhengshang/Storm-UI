import { withInstall } from '@storm/utils'
import _Tree from './src/tree.vue'
// 添加install方法
export const Tree = withInstall(_Tree)
export default Tree
export type * from './src/tree'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    STree: typeof Tree
  }
}