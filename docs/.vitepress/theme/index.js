import DefaultTheme from 'vitepress/theme'
import SIcon from '@storm/components/icon'
import '@storm/theme-chalk/src/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 在vitepress中注册全局组件
    app.use(SIcon)
  }
}