# Input 输入框

## 基础用法

```vue preview
<template>
	<s-input v-model="input" placeholder="Please input" />
</template>
<script setup>
import { ref } from "vue"
const input = ref("")
</script>
```

## 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件

```vue preview
<template>
	<s-input v-model="input" disabled placeholder="Please input" />
</template>
<script setup>
import { ref } from "vue"
const input = ref("")
</script>
```

## 一键清空

通过 `clearable` 属性即可得到一个可一键清空的输入框

```vue preview
<template>
	<s-input v-model="input" clearable placeholder="Please input" />
</template>
<script setup>
import { ref } from "vue"
const input = ref("")
</script>
```

## 带图标的输入框

带有图标标记输入类型

要在输入框中添加图标，你可以简单地使用 prefix-icon 和 suffix-icon 属性。 另外， prefix 和 suffix 命名的插槽也能正常工作。

```vue preview
<template>
	<s-row :gutter="20" style="margin-bottom: 1rem;">
		<s-col :span="6">attributes</s-col>
		<s-col :span="6">
			<s-input v-model="input1" placeholder="Pick input" :suffix-icon="CloudDownload" />
		</s-col>
		<s-col :span="6">
			<s-input v-model="input2" placeholder="Pick input" :prefix-icon="CloudDownload" />
		</s-col>
	</s-row>
	<s-row :gutter="20">
		<s-col :span="6">slots</s-col>
		<s-col :span="6">
			<s-input v-model="input1" placeholder="Pick input">
				<template #suffix>
					<s-icon class="el-input__icon">
						<Images />
					</s-icon>
				</template>
			</s-input>
		</s-col>
		<s-col :span="6">
			<s-input v-model="input1" placeholder="Pick input">
				<template #prefix>
					<s-icon class="el-input__icon">
						<Images />
					</s-icon>
				</template>
			</s-input>
		</s-col>
	</s-row>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { CloudDownload, Images } from "@vicons/ionicons5"
const input1 = ref("")
const input2 = ref("")
const input3 = ref("")
const input4 = ref("")
</script>
```

## 文本域

用于输入多行文本信息可缩放的输入框。 添加 `type="textarea"` 属性来将 `input` 元素转换为原生的 `textarea` 元素。

```vue preview
<template>
	<s-input v-model="textarea" type="textarea" placeholder="Please input" />
</template>
<script setup>
import { ref } from "vue"
const textarea = ref("")
</script>
```

## 输入长度限制

使用 `maxlength` 属性, 来控制输入内容的最大字数。 "字符数"使用 JavaScript 字符串长度来衡量。 为文本或文本输入类型设置 `maxlength` 可以限制输入值的长度。

```vue preview
<template>
	<s-input v-model="text" placeholder="Please input" maxlength="10" />
</template>
<script setup>
import { ref } from "vue"
const text = ref("")
</script>
```

## Input API

### Attributes

| 属性名                | 说明                                               | 类型                       | 默认值 |
| :-------------------- | :------------------------------------------------- | :------------------------- | :----- |
| type                  | 类型                                               | `string` 等原生 input 类型 | text   |
| model-value / v-model | 选中项绑定值                                       | `string` / `number`        | --     |
| maxlength             | 最大输入长度                                       | `string`/`number`          | --     |
| placeholder           | 输入框占位文本                                     | `string`                   | --     |
| clearable             | 是否显示清除按钮，只有当 type 不是 textarea 时生效 | `boolean`                  | false  |
| disabled              | 是否禁用                                           | `boolean`                  | false  |
| prefix-icon           | 自定义前缀图标                                     | `string` / `Component`     | --     |
| suffix-icon           | 自定义前缀图标                                     | `string` / `Component`     | --     |
| name                  | 等价于原生 input `name` 属性                       | `string`                   | --     |
| readonly              | 原生 `readonly` 属性，是否只读                     | `boolean`                  | false  |

### Events

| 属性名 | 说明                                          | 类型                                |
| :----- | :-------------------------------------------- | :---------------------------------- |
| blur   | 当选择器的输入框失去焦点时触发                | `(event: FocusEvent) => void`       |
| focus  | 当选择器的输入框获得焦点时触发                | `(event: FocusEvent) => void`       |
| change | modelValue 改变时触发                         | `(value: string \| number) => void` |
| input  | 在 Input 值改变时触发                         | `(value: string \| number) => void` |
| clear  | 在点击由 `clearable` 属性生成的清空按钮时触发 | `() => void`                        |

### Slots

| 属性名 | 说明                                          |
| :----- | :-------------------------------------------- |
| prefix | 输入框头部内容，只对非 `type="textarea"` 有效 |
| suffix | 输入框尾部内容，只对非 `type="textarea"` 有效 |

### Exposes

| 属性名 | 说明              |
| :----- | :---------------- |
| blur   | 使 input 失去焦点 |
| clear  | 清除 input 值     |
| focus  | 使 input 获取焦点 |
