# Icon 图标

storm-ui 推荐使用 xicons 作为图标库

```
$ pnpm install @vicons/ionicons5
```

## 使用图标

- 如果你想像用例一样直接使用，你需要全局注册组件，才能够直接在项目中使用。

<script setup lang="ts">
import { CashOutline } from '@vicons/ionicons5'
</script>

<s-icon color="red" size="40">
  <CashOutline />
</s-icon>
<s-icon color="green" size="40">
  <CashOutline />
</s-icon>
<s-icon color="blue" size="40">
  <CashOutline />
</s-icon>

<s-icon color="red" size="60">
  <CashOutline />
</s-icon>
<s-icon color="green" size="60">
  <CashOutline />
</s-icon>
<s-icon color="blue" size="60">
  <CashOutline />
</s-icon>

```vue
<script setup lang="ts">
import { CashOutline } from '@vicons/ionicons5'
</script>

<template>
<s-icon color="red" size="40">
  <CashOutline />
</s-icon>
</template>
```

## API

### Icon Props

| 名称   | 类型            | 默认值    | 说明    |
| ------ | --------------  | -------- | ------- |
| color  | string          | undefind | 图标颜色 |
| size   | number \| string | undefind | 图标大小 |