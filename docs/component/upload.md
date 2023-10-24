# Upload 上传

通过点击或者拖拽上传文件。

通过 `slot` 你可以传入自定义的上传按钮类型和文字提示。 可通过设置 `limit` 和 `on-exceed` 来限制上传文件的个数和定义超出限制时的行为。 可通过设置 `before-remove` 来阻止文件移除操作。

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
