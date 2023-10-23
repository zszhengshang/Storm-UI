# 快速开始

本节将介绍如何在项目中使用 Storm UI。

### 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```ts
// main.ts
import { createApp } from "vue"
import StormUI from "storm-ui"
import "storm-ui/dist/index.css"
import App from "./App.vue"

const app = createApp(App)

app.use(StormUI)
app.mount("#app")
```

### 手动导入

Storm UI 提供了基于 ES Module 的开箱即用的 `Tree Shaking` 功能。

但是你需要安装 unplugin-storm-ui 来导入样式。

```vue
<template>
	<s-button>我是 SButton</s-button>
</template>
<script>
import { SButton } from "storm-ui"
export default {
	components: { SButton }
}
</script>
```

```js
// vite.config.js
import { defineConfig } from "vite"
import StormUI from "unplugin-storm-ui/vite"

export default defineConfig({
	// ...
	plugins: [StormUI()]
})
```

```js
// webpack.config.js
module.exports = {
	/* ... */
	plugins: [
		require("unplugin-storm-ui/webpack")({
			// options
		})
	]
}
```
