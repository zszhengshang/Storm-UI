import { withInstall } from '@storm/utils/with-install'
import _Progress from './src/progress.vue'
// 添加install方法
export const Progress = withInstall(_Progress)
export default Progress
export * from './src/progress'

// 配合volar插件 可以在模版中被解析
declare module 'vue' {
  export interface GlobalComponents {
    SProgress: typeof Progress
  }
}