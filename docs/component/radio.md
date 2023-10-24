# Radio 单选框

在一组备选项中进行单选

## 基础用法

```vue preview
<template>
	<s-radio-group v-model="radio1">
		<s-radio label="1" size="large">Option 1</s-radio>
		<s-radio label="2" size="large">Option 2</s-radio>
	</s-radio-group>
	<s-radio-group v-model="radio2" disabled>
		<s-radio label="1" size="large">Option 1</s-radio>
		<s-radio label="2" size="large">Option 2</s-radio>
	</s-radio-group>
</template>
<script setup>
import { ref } from "vue"

const radio1 = ref("1")
const radio2 = ref("1")
</script>
```

## 禁用状态

`disabled` 属性可以用来控制单选框的禁用状态。

```vue preview
<template>
	<s-radio v-model="radio" disabled label="disabled">Option A</s-radio>
	<s-radio v-model="radio" disabled label="selected and disabled">Option B</s-radio>
</template>
<script setup>
import { ref } from "vue"

const radio = ref("selected and disabled")
</script>
```

## 单选框组

适用于在多个互斥的选项中选择的场景

```vue preview
<template>
	<s-radio-group v-model="radio">
		<s-radio label="1" size="large">Option 1</s-radio>
		<s-radio label="2" size="large">Option 2</s-radio>
		<s-radio label="3" size="large">Option 2</s-radio>
	</s-radio-group>
</template>
<script setup>
import { ref } from "vue"

const radio = ref("1")
</script>
```

## Radio API

### Attributes

| 属性名                | 说明                         | 类型                            | 默认值 |
| :-------------------- | :--------------------------- | :------------------------------ | :----- |
| model-value / v-model | 选中项绑定值                 | `string` / `number` / `boolean` | --     |
| label                 | 单选框的值                   | `string` / `number` / `boolean` | --     |
| disabled              | 是否禁用单选框               | `boolean`                       | false  |
| name                  | 等价于原生 input `name` 属性 | `string`                        | --     |

### Events

| 属性名 | 说明                   | 类型                                           |
| :----- | :--------------------- | :--------------------------------------------- |
| change | 绑定值变化时触发的事件 | `(value: string \| number \| boolean) => void` |

### Slots

| 属性名  | 说明           |
| :------ | :------------- |
| default | 自定义默认内容 |

## RadioGroup API

### Attributes

| 属性名                | 说明             | 类型                            | 默认值 |
| :-------------------- | :--------------- | :------------------------------ | :----- |
| model-value / v-model | 绑定值           | `string` / `number` / `boolean` | --     |
| disabled              | 是否禁用         | `boolean`                       | false  |
| name                  | 原生 `name` 属性 | `string`                        | --     |

### Events

| 属性名 | 说明                   | 类型                                           |
| :----- | :--------------------- | :--------------------------------------------- |
| change | 绑定值变化时触发的事件 | `(value: string \| number \| boolean) => void` |

### Slots

| 属性名  | 说明           | 子标签 |
| :------ | :------------- | :----- |
| default | 自定义默认内容 | Radio  |
