<template>
  <div :class="[
    bem.b(),
    bem.m(type),
    bem.is(status)
  ]"></div>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create';
import { progressProps } from './progress';
defineOptions({ name: 'SProgress' })
defineProps(progressProps)

const bem = createNamespace('progress')
</script>