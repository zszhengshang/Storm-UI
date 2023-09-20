<template>
  <component
    :tag="tag"
    :class="[
      bem.b()
    ]"
    :style="style"
  ></component>
</template>

<script setup lang="ts">
import { inject, computed, CSSProperties } from 'vue';
import { colProps } from './col';
import { createNamespace } from '@storm/utils/create';
import { rowContextKey } from '@storm/components/row/src/row'
defineProps(colProps)
defineOptions({ name: 'SCol' })

const bem = createNamespace('col')
const row = inject(rowContextKey, undefined)
const gutter = row?.gutter

const style = computed(() => {
  const styles: CSSProperties = {}
  if (gutter?.value) {
    styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`
  }
  return styles
})
</script>