import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@storm/components/icon'
import Button from '@storm/components/button'
import '@storm/theme-chalk/src/index.scss'

const plugins = [
  Icon,
  Button
]
const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
