import DefaultTheme from 'vitepress/theme'
import StormUI from 'storm-ui'
import '@storm/theme-chalk/src/index.scss'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 在vitepress中注册全局组件
    app.use(StormUI)
  }
}