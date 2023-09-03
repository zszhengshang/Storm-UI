import { createApp } from 'vue'
import App from './App.vue'
import Icon from '@storm/components/icon'
import Button from '@storm/components/button'
import Radio from '@storm/components/radio'
import Checkbox from '@storm/components/checkbox'
import Input from '@storm/components/input'
import Switch from '@storm/components/switch'
import InputNumber from '@storm/components/input-number'
import '@storm/theme-chalk/src/index.scss'

const plugins = [
  Icon,
  Button,
  Radio,
  Checkbox,
  Input,
  Switch,
  InputNumber
]
const app = createApp(App)
plugins.forEach(plugin => app.use(plugin))

app.mount('#app')
