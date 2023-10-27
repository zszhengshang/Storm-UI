# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

```vue preview
<template>
	<s-switch v-model="value" />
</template>
<script setup>
import { ref } from "vue"

const value = ref(true)
</script>
```

## 禁用状态

设置 `disabled` 属性，接受一个 Boolean

```vue preview
<template>
	<s-switch v-model="value1" disabled />
	<s-switch v-model="value2" style="margin-left: 10px" />
</template>
<script setup>
import { ref } from "vue"

const value1 = ref(true)
const value2 = ref(true)
</script>
```

## 加载状态

设置 `disabled` 属性，接受一个 Boolean

```vue preview
<template>
	<s-switch v-model="value1" loading />
	<s-switch v-model="value2" loading style="margin-left: 10px" />
</template>
<script setup>
import { ref } from "vue"

const value1 = ref(true)
const value2 = ref(false)
</script>
```

## Switch API

### Attributes

| 属性名                | 说明                    | 类型      | 默认值 |
| :-------------------- | :---------------------- | :-------- | :----- |
| model-value / v-model | 选中项绑定值            | `boolean` | false  |
| disabled              | 是否禁用                | `boolean` | false  |
| loading               | 是否显示加载中          | `boolean` | false  |
| name                  | switch 对应的 name 属性 | `string`  | --     |

### Events

| 属性名 | 说明                            | 类型                                           |
| :----- | :------------------------------ | :--------------------------------------------- |
| change | switch 状态发生变化时的回调函数 | `(value: string \| number \| boolean) => void` |
