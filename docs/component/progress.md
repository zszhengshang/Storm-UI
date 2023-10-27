# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 基础用法

Progress 组件设置 `percentage` 属性即可，表示进度条对应的百分比。 该属性必填，并且必须在 `0-100` 的范围内。

```vue preview
<template>
	<s-progress :percentage="50" />
	<s-progress :percentage="100" status="success" />
	<s-progress :percentage="100" status="warning" />
	<s-progress :percentage="50" status="fail" />
</template>
```

## 进度条内显示百分比标识

Progress 组件可通过 `height` 属性更改进度条的高度，并可通过 `text-inside` 属性来改变进度条内部的文字。

```vue preview
<template>
	<s-progress text-inside :height="26" :percentage="70" />
	<s-progress text-inside :height="24" :percentage="100" status="success" />
	<s-progress text-inside :height="22" :percentage="80" status="warning" />
	<s-progress text-inside :height="20" :percentage="50" status="fail" />
</template>
```

## 自定义进度条的颜色

可以通过 color 属性来设置进度条的颜色。

```vue preview
<template>
	<s-progress :percentage="percentage" color="#e6a23c" />
	<s-progress :percentage="percentage" color="#6f7ad3" />
	<s-button @click="decrease">-</s-button>
	<s-button @click="increase">+</s-button>
</template>

<script setup>
import { ref } from "vue"

const percentage = ref(20)
const increase = () => {
	percentage.value += 10
	if (percentage.value > 100) {
		percentage.value = 100
	}
}
const decrease = () => {
	percentage.value -= 10
	if (percentage.value < 0) {
		percentage.value = 0
	}
}
</script>
```

## 动画进度条

使用 `intermediate` 属性来设置不确定的进度， `duration` 来控制动画持续时间。

```vue preview
<template>
	<s-progress :percentage="50" indeterminate />
	<s-progress :percentage="50" indeterminate :duration="5" status="success" />
</template>
```

## Progress API

### Attributes

| 属性名     | 说明                         | 类型      | 可选值 | 默认值 |
| :--------- | :--------------------------- | :-------- | :----- | ------ |
| percentage | 百分比，必填                 | `number`  | 0-100  | 0      |
| height     | 进度条的高度                 | `number`  | --     | 6      |
| disabled   | 是否禁用单选框               | `boolean` | false  |        |
| name       | 等价于原生 input `name` 属性 | `string`  | --     |        |

### Slots

| 属性名  | 说明       |
| :------ | :--------- |
| default | 自定义内容 |
