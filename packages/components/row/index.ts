import { withInstall } from '@storm/utils'
import _Row from './src/row.vue'
// 添加install方法
const Row = withInstall(_Row)

export default Row
export type { RowProps } from './src/row'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    SRow: typeof Row
  }
}