import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@storm/components/icon'
import Button from '@storm/components/button'
import Radio from '@storm/components/radio'
import '@storm/theme-chalk/src/index.scss'

const plugins = [
  Icon,
  Button,
  Radio
]
const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
