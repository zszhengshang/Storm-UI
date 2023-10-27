<template>
  <component
    :is="tag"
    :class="[
      bem.b(),
      bem.is('guttered', !!gutter),
      bem.b(`${span}`),
      { [bem.b(`offset-${offset}`)]: offset > 0 }
    ]"
    :style="style"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { inject, computed, CSSProperties } from 'vue';
import { colProps } from './col';
import { createNamespace } from '@storm/utils';
import { rowContextKey } from '@storm/components/row/src/row'
defineProps(colProps)
defineOptions({ name: 'SCol' })

const bem = createNamespace('col')
const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })

const style = computed(() => {
  const styles: CSSProperties = {}
  if (gutter.value) {
    styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`
  }
  return styles
})
</script>