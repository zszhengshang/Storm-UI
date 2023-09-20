<template>
  <component
    :is="tag"
    :class="bem.b()"
    :style="style"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { CSSProperties, computed, provide } from 'vue';
import { rowContextKey, rowProps } from './row';
import { createNamespace } from '@storm/utils/create';
const props = defineProps(rowProps)
defineOptions({ name: 'SRow' })

const bem = createNamespace('row')
const gutter = computed(() => props.gutter)
const style = computed(() => {
  const styles: CSSProperties = {}
  if (!props.gutter) {
    return styles
  }
  styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`
  return styles
})

provide(rowContextKey, {
  gutter
})
</script>