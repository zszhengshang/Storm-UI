<template>
  <i
    :class="bem.b()"
    :style="style"
  >
    <slot />
  </i>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create'
import { iconProps } from './icon'
import { computed } from 'vue'
defineOptions({ name: 'SIcon' })
const props = defineProps(iconProps)

const bem = createNamespace('icon')
const style = computed(() => {
  if (!props.size && !props.color) return {}
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { 'color': props.color } : {})
  }
})
</script>