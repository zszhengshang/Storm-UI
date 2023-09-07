<template>
  <div :class="[
    bem.b('dragger'),
  ]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create';
import { uploadDraggerEmits, uploadDraggerProps } from './upload-dragger';
defineOptions({ name: 'SUploadDragger' })
defineProps(uploadDraggerProps)
defineEmits(uploadDraggerEmits)

const bem = createNamespace('upload')
</script>