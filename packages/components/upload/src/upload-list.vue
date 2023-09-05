<template>
  <transition-group
    tag="ul"
    :class="[
      bem.b('list'),
      bem.is('disabled', disabled)
    ]"
  >
    <li
      v-for="file in files"
      :key="file.uid || file.name"
      :class="bem.be('list', 'item')"
    ></li>
  </transition-group>
</template>

<script setup lang="ts">
import { createNamespace } from '@storm/utils/create';
import { uploadListEmits, uploadListProps } from './upload-list';
defineOptions({ name: 'SUploadList' })
const props = defineProps(uploadListProps)
defineEmits(uploadListEmits)

const bem = createNamespace('upload')
</script>