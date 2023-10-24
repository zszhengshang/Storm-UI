# Checkbox 多选框

在一组备选项中进行多选。

## 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

`checkbox-group` 元素能把多个 checkbox 管理为一组，只需要在 Group 中使用 `v-model` 绑定 `Array` 类型的变量即可。 只有一个选项时的默认值类型为 Boolean，当选中时值为 `true`。 `s-checkbox` 标签中的内容将成为复选框按钮之后的描述。

```vue preview
<template>
	<div>
		<s-checkbox v-model="checked1" label="Option 1" />
		<s-checkbox v-model="checked2" label="Option 2" />
	</div>
</template>
<script setup>
import { ref } from "vue"

const checked1 = ref(true)
const checked2 = ref(false)
</script>
```

## 禁用状态

多选框不可用状态。

设置 `disabled` 属性即可。

```vue preview
<template>
	<div>
		<s-checkbox v-model="checked1" disabled>Disabled</s-checkbox>
		<s-checkbox v-model="checked2">Not disabled</s-checkbox>
	</div>
</template>
<script setup>
import { ref } from "vue"

const checked1 = ref(false)
const checked2 = ref(true)
</script>
```

## 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

```vue preview
<template>
	<s-checkbox-group v-model="checkList">
		<s-checkbox label="Option A" />
		<s-checkbox label="Option B" />
		<s-checkbox label="Option C" />
		<s-checkbox label="disabled" disabled />
		<s-checkbox label="selected and disabled" disabled />
	</s-checkbox-group>
</template>
<script setup>
import { ref } from "vue"

const checkList = ref(["selected and disabled", "Option A"])
</script>
```

## 中间状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

```vue preview
<template>
	<s-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">Check all</s-checkbox>
	<s-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
		<s-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</s-checkbox>
	</s-checkbox-group>
</template>
<script setup>
import { ref } from "vue"

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(["Shanghai", "Beijing"])
const cities = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"]

const handleCheckAllChange = val => {
	checkedCities.value = val ? cities : []
	isIndeterminate.value = false
}
const handleCheckedCitiesChange = value => {
	const checkedCount = value.length
	checkAll.value = checkedCount === cities.length
	isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
</script>
```

## Checkbox API

### Attributes

| 属性名                | 说明                                                                      | 类型                            | 默认值 |
| :-------------------- | :------------------------------------------------------------------------ | :------------------------------ | :----- |
| model-value / v-model | 选中项绑定值                                                              | `string` / `number` / `boolean` | --     |
| label                 | 选中状态的值（只有在 `checkbox-group` 或者绑定对象类型为 `array` 时有效） | `string`/`number`/`boolean`     | --     |
| disabled              | 是否禁用                                                                  | `boolean`                       | false  |
| name                  | 原生 name 属性                                                            | `string`                        | --     |
| checked               | 当前是否勾选                                                              | `boolean`                       | false  |
| indeterminate         | 设置不确定状态，仅负责样式控制                                            | `boolean`                       | false  |

### Events

| 属性名 | 说明                     | 类型                                           |
| :----- | :----------------------- | :--------------------------------------------- |
| change | 当绑定值变化时触发的事件 | `(value: string \| number \| boolean) => void` |

### Slots

| 属性名  | 说明           |
| :------ | :------------- |
| default | 自定义默认内容 |

## CheckboxGroup API

### Attributes

| 属性名                | 说明     | 类型                   | 默认值 |
| :-------------------- | :------- | :--------------------- | :----- |
| model-value / v-model | 绑定值   | `string[] \| number[]` | --     |
| disabled              | 是否禁用 | `boolean`              | false  |

### Events

| 属性名 | 说明                     | 类型                                    |
| :----- | :----------------------- | :-------------------------------------- |
| change | 当绑定值变化时触发的事件 | `(value: string[] \| number[]) => void` |

### Slots

| 属性名  | 说明           | 子标签   |
| :------ | :------------- | :------- |
| default | 自定义默认内容 | Checkbox |
