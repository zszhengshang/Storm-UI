import { withInstall } from '@storm/utils'
import _Upload from './src/upload.vue'
// 添加install方法
const Upload = withInstall(_Upload)

export default Upload
export type * from './src/upload'
export * from './src/upload-content'
export * from './src/upload-list'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    SUpload: typeof Upload
  }
}