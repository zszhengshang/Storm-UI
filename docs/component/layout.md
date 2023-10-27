# Layout 布局

通过基础的 24 分栏，迅速简便地创建布局

## 基础布局

通过 row 和 col 组件，并通过 col 组件的 span 属性我们就可以自由地组合布局。

```vue preview
<template>
	<s-row>
		<s-col :span="24">
			<div class="grid-content ep-bg-purple-dark" />
		</s-col>
	</s-row>
	<s-row>
		<s-col :span="12">
			<div class="grid-content ep-bg-purple-dark" />
		</s-col>
		<s-col :span="12">
			<div class="grid-content ep-bg-purple-light" />
		</s-col>
	</s-row>
	<s-row>
		<s-col :span="8">
			<div class="grid-content ep-bg-purple" />
		</s-col>
		<s-col :span="8">
			<div class="grid-content ep-bg-purple-light" />
		</s-col>
		<s-col :span="8">
			<div class="grid-content ep-bg-purple" />
		</s-col>
	</s-row>
	<s-row>
		<s-col :span="6">
			<div class="grid-content ep-bg-purple" />
		</s-col>
		<s-col :span="6">
			<div class="grid-content ep-bg-purple-light" />
		</s-col>
		<s-col :span="6">
			<div class="grid-content ep-bg-purple" />
		</s-col>
		<s-col :span="6">
			<div class="grid-content ep-bg-purple-light" />
		</s-col>
	</s-row>
	<s-row>
		<s-col :span="4">
			<div class="grid-content ep-bg-purple" />
		</s-col>
		<s-col :span="4">
			<div class="grid-content ep-bg-purple-light" />
		</s-col>
		<s-col :span="4">
			<div class="grid-content ep-bg-purple" />
		</s-col>
		<s-col :span="4">
			<div class="grid-content ep-bg-purple-light" />
		</s-col>
		<s-col :span="4">
			<div class="grid-content ep-bg-purple" />
		</s-col>
		<s-col :span="4">
			<div class="grid-content ep-bg-purple-light" />
		</s-col>
	</s-row>
</template>

<style lang="scss" scoped>
.s-row {
	margin-bottom: 20px;
}
.s-row:last-child {
	margin-bottom: 0;
}
.s-col {
	border-radius: 4px;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
}
</style>
```

## 分栏间隔

行提供 `gutter` 属性来指定列之间的间距，其默认值为 0。

```vue preview
<template>
	<s-row :gutter="20">
		<s-col :span="6">
			<div class="grid-content ep-bg-purple " />
		</s-col>
		<s-col :span="6">
			<div class="grid-content ep-bg-purple " />
		</s-col>
		<s-col :span="6">
			<div class="grid-content ep-bg-purple " />
		</s-col>
		<s-col :span="6">
			<div class="grid-content ep-bg-purple " />
		</s-col>
	</s-row>
</template>

<style lang="scss" scoped>
.s-row {
	margin-bottom: 20px;
}
.s-row:last-child {
	margin-bottom: 0;
}
.s-col {
	border-radius: 4px;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
}
</style>
```

## 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

```vue preview
<template>
	<s-row :gutter="20">
		<s-col :span="16">
			<div class="grid-content ep-bg-purple " />
		</s-col>
		<s-col :span="8">
			<div class="grid-content ep-bg-purple " />
		</s-col>
	</s-row>
	<s-row :gutter="20">
		<s-col :span="8">
			<div class="grid-content ep-bg-purple " />
		</s-col>
		<s-col :span="8">
			<div class="grid-content ep-bg-purple " />
		</s-col>
		<s-col :span="4">
			<div class="grid-content ep-bg-purple " />
		</s-col>
		<s-col :span="4">
			<div class="grid-content ep-bg-purple " />
		</s-col>
	</s-row>
	<s-row :gutter="20">
		<s-col :span="4">
			<div class="grid-content ep-bg-purple " />
		</s-col>
		<s-col :span="16">
			<div class="grid-content ep-bg-purple " />
		</s-col>
		<s-col :span="4">
			<div class="grid-content ep-bg-purple " />
		</s-col>
	</s-row>
</template>

<style lang="scss" scoped>
.s-row {
	margin-bottom: 20px;
}
.s-row:last-child {
	margin-bottom: 0;
}
.s-col {
	border-radius: 4px;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
}
</style>
```

## 列偏移

通过制定 col 组件的 offset 属性可以指定分栏偏移的栏数。

```vue preview
<template>
	<s-row :gutter="20">
		<s-col :span="6">
			<div class="grid-content ep-bg-purple " />
		</s-col>
		<s-col :span="6" :offset="6">
			<div class="grid-content ep-bg-purple " />
		</s-col>
	</s-row>
	<s-row :gutter="20">
		<s-col :span="6" :offset="6">
			<div class="grid-content ep-bg-purple " />
		</s-col>
		<s-col :span="6" :offset="6">
			<div class="grid-content ep-bg-purple " />
		</s-col>
	</s-row>
	<s-row :gutter="20">
		<s-col :span="12" :offset="6">
			<div class="grid-content ep-bg-purple " />
		</s-col>
	</s-row>
</template>

<style lang="scss" scoped>
.s-row {
	margin-bottom: 20px;
}
.s-row:last-child {
	margin-bottom: 0;
}
.s-col {
	border-radius: 4px;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
}
</style>
```

## Row API

### Attributes

| 属性名 | 说明           | 类型     | 默认值 |
| :----- | :------------- | :------- | :----- |
| gutter | 栅格间隔       | `number` | 0      |
| tag    | 自定义元素标签 | `string` | div    |

### Slots

| 插槽名  | 说明           | 子标签 |
| :------ | :------------- | :----- |
| default | 自定义默认内容 | Col    |

## Col API

### Attributes

| 属性名 | 说明               | 类型     | 默认值 |
| :----- | :----------------- | :------- | :----- |
| span   | 栅格占据的列数     | `number` | 24     |
| offset | 栅格左侧的间隔格数 | `number` | 0      |
| tag    | 自定义元素标签     | `string` | div    |

### Slots

| 插槽名  | 说明           |
| :------ | :------------- |
| default | 自定义默认内容 |
