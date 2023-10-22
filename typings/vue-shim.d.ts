import { INSTALLED_KEY } from '@storm/constants'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  export interface App {
    [INSTALLED_KEY]?: boolean
  }
}