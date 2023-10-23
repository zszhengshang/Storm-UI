# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`round` 来定义按钮的样式。

```vue preview
<template>
	<s-row class="mb-4">
		<s-button>default</s-button>
		<s-button type="primary">primary</s-button>
		<s-button type="success">success</s-button>
		<s-button type="info">info</s-button>
		<s-button type="warning">warning</s-button>
		<s-button type="danger">danger</s-button>
	</s-row>
	<s-row class="mb-4">
		<s-button round>default</s-button>
		<s-button type="primary" round>primary</s-button>
		<s-button type="success" round>success</s-button>
		<s-button type="info" round>info</s-button>
		<s-button type="warning" round>warning</s-button>
		<s-button type="danger" round>danger</s-button>
	</s-row>
	<s-row>
		<s-button type="primary" :icon="CheckmarkOutline"></s-button>
		<s-button type="success" :icon="CheckmarkOutline"></s-button>
		<s-button type="info" :icon="CheckmarkOutline"></s-button>
		<s-button type="warning" :icon="CheckmarkOutline"></s-button>
		<s-button type="danger" :icon="CheckmarkOutline"></s-button>
	</s-row>
</template>
<script lang="ts" setup>
import { CheckmarkOutline } from "@vicons/ionicons5"
</script>
```

## 禁用状态

你可以使用 disabled 属性来定义按钮是否被禁用。

使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 Boolean 类型的值。

```vue preview
<template>
	<s-row class="mb-4">
		<s-button disabled>default</s-button>
		<s-button type="primary" disabled>primary</s-button>
		<s-button type="success" disabled>success</s-button>
		<s-button type="info" disabled>info</s-button>
		<s-button type="warning" disabled>warning</s-button>
		<s-button type="danger" disabled>danger</s-button>
	</s-row>
	<s-row class="mb-4">
		<s-button round disabled>default</s-button>
		<s-button type="primary" round disabled>primary</s-button>
		<s-button type="success" round disabled>success</s-button>
		<s-button type="info" round disabled>info</s-button>
		<s-button type="warning" round disabled>warning</s-button>
		<s-button type="danger" round disabled>danger</s-button>
	</s-row>
</template>
```

## 图标按钮

使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。

使用 `icon` 属性来为按钮添加图标。你也可以使用自定义图标。

```vue preview
<template>
	<s-button type="primary" :icon="CloseCircle"></s-button>
	<s-button type="primary" :icon="CreateSharp"></s-button>
	<s-button type="primary" :icon="CheckmarkCircleSharp"></s-button>
	<s-button type="primary" :icon="CloudDownload">CloudDownload</s-button>
	<s-button type="primary">
		Bluetooth
		<s-icon>
			<BluetoothOutline />
		</s-icon>
	</s-button>
</template>

<script lang="ts" setup>
import { CloseCircle, CreateSharp, CheckmarkCircleSharp, BluetoothOutline, CloudDownload } from "@vicons/ionicons5"
</script>
```

## 加载状态按钮

点击按钮来加载数据，并向用户反馈加载状态。

通过设置 `loading` 属性为 true 来显示加载中状态

> Tip \
> 您可以使用 `loading`插槽自定义您的 loading 图标

```vue preview
<template>
	<s-button type="primary" loading>Loading</s-button>
	<s-button type="primary" loading>
		<template #loading>
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
				<path
					d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z"
					fill="currentColor"
				></path>
			</svg>
		</template>
		Loading
	</s-button>
</template>
```

## 调整尺寸

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

使用 `size` 属性额外配置尺寸，可使用 large 和 small 两种值。

```vue preview
<template>
	<s-button type="primary" size="small">small</s-button>
	<s-button type="primary">default</s-button>
	<s-button type="primary" size="large">large</s-button>
</template>
```

## Button API

### Button Attributes

| 属性名      | 说明               | 类型                | 可选值                                     | 默认值  |
| :---------- | :----------------- | :------------------ | :----------------------------------------- | :------ |
| size        | 尺寸               | `string`            | large / default / small                    | default |
| type        | 类型               | `string`            | primary / success / warning/ danger / info | --      |
| round       | 是否为圆角按钮     | `boolean`           | --                                         | false   |
| loading     | 是否为加载中状态   | `boolean`           | --                                         | false   |
| disabled    | 按钮是否为禁用状态 | `boolean`           | --                                         | false   |
| icon        | 图标组件           | `string/ Component` | --                                         | --      |
| native-type | 原生 type 属性     | `string`            | button / submit / reset                    | button  |
