# Icon 图标

storm-ui 推荐使用 [xicons](https://www.xicons.org) 作为图标库

## 基础用法

```vue preview
<template>
	<s-icon size="40">
		<AddCircleSharp />
	</s-icon>
	<s-icon size="40" color="#409EFC">
		<ArrowDownCircleSharp />
	</s-icon>
	<s-icon size="28" color="#409EFC">
		<CheckmarkCircleSharp />
	</s-icon>
</template>
<script setup>
import { AddCircleSharp, ArrowDownCircleSharp, CheckmarkCircleSharp } from "@vicons/ionicons5"
</script>
```

## 直接使用 SVG 图标

```vue preview
<template>
	<div style="font-size: 30px">
		<CloudDownload style="width: 1em; margin-right: 8px" />
		<Images style="width: 1em; margin-right: 8px" />
		<Mail style="width: 1em;" />
	</div>
</template>
<script setup>
import { CloudDownload, Images, Mail } from "@vicons/ionicons5"
</script>
```

## Icon API

### Attributes

| 属性名 | 说明             | 类型                | 默认值       |
| :----- | :--------------- | :------------------ | :----------- |
| color  | svg 的 fill 颜色 | `string`            | --           |
| size   | SVG 图标的大小   | `number` / `string` | 继承字体大小 |
