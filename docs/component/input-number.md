# Input Number 数字输入框

仅允许输入标准的数字值，可定义范围

## 基础用法

```vue preview
<template>
	<s-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
</template>
<script setup>
import { ref } from "vue"

const num = ref(1)
const handleChange = value => {
	console.log(value)
}
</script>
```

## 禁用状态

disabled 属性接受一个 `Boolean`，设置为 `true` 即可禁用整个组件。 如果你只需要控制数值在某一范围内，可以设置 `min` 属性和 `max` 属性， 默认最小值为 `0`。

```vue preview
<template>
	<s-input-number v-model="num" disabled />
</template>
<script setup>
import { ref } from "vue"

const num = ref(1)
</script>
```

## 步进

允许定义递增递减的步进控制

设置 `step` 属性可以控制步长。

```vue preview
<template>
	<s-input-number v-model="num" :step="2" />
</template>
<script setup>
import { ref } from "vue"

const num = ref(5)
</script>
```

## 精度

设置 `precision` 属性可以控制数值精度，接收一个 `Number`。

```vue preview
<template>
	<s-input-number v-model="num" :precision="2" :step="0.1" :max="10" />
</template>
<script setup>
import { ref } from "vue"

const num = ref(1)
</script>
```

## InputNumber API

### Attributes

| 属性名                | 说明                                               | 类型      | 默认值    |
| :-------------------- | :------------------------------------------------- | :-------- | :-------- |
| model-value / v-model | 选中项绑定值                                       | `number`  | --        |
| min                   | 设置计数器允许的最小值                             | `number`  | -Infinity |
| max                   | 设置计数器允许的最大值                             | `number`  | Infinity  |
| step                  | 计数器步长                                         | `number`  | 1         |
| precision             | 数值精度                                           | `number`  | --        |
| readonly              | 原生 `readonly` 属性，是否只读                     | `boolean` | false     |
| disabled              | 是否禁用                                           | `boolean` | false     |
| controls              | 是否使用控制按钮                                   | `boolean` | true      |
| name                  | 等价于原生 input `name` 属性                       | `string`  | --        |
| placeholder           | 等价于原生 input `placeholder` 属性                | `string`  | --        |
| clearable             | 是否显示清除按钮，只有当 type 不是 textarea 时生效 | `boolean` | false     |

### Events

| 属性名 | 说明                           | 类型                          |
| :----- | :----------------------------- | :---------------------------- |
| change | modelValue 改变时触发          | `(value:  number) => void`    |
| blur   | 当选择器的输入框失去焦点时触发 | `(event: FocusEvent) => void` |
| focus  | 当选择器的输入框获得焦点时触发 | `(event: FocusEvent) => void` |

### Exposes

| 属性名 | 说明              |
| :----- | :---------------- |
| focus  | 使 input 获取焦点 |
| blur   | 使 input 失去焦点 |
