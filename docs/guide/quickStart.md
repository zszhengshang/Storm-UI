# 快速开始

### 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```typescript
// main.ts
import { createApp } from "vue"
import StormUI from "storm-ui"
import "storm-ui/theme-chalk/src/index.css"
import App from "./App.vue"

const app = createApp(App)

app.use(StormUI)
app.mount("#app")
```

### 按需导入

您需要使用额外的插件来导入要使用的组件。
